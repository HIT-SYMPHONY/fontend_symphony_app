import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'react-router-dom'
import NotificationsSwiper from 'components/StartHomePage/NotificationsSwiper'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyNotifications } from 'apis/notification.api'
import { getMyClasses } from 'apis/user.api'
import { Table, Tooltip } from 'antd'
import { getMyCompetitions } from 'apis/user.api'
import { formatDate } from 'utils/formatters'
import { Client } from '@stomp/stompjs'
import { LocalStorage } from 'constants/localStorage.constant'

function MyNotificationsPage() {
  const [searchParams] = useSearchParams()
  const globalSearch = searchParams.get('q') || ''

  // Swiper Data (Latest)
  const { data: notificationsSwiper, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications', 'swiper'],
    queryFn: async () => {
      try {
        // Fetch latest notifications for swiper
        const response = await getMyNotifications({ pageNum: 1, pageSize: 10 })
        return response.data?.items || []
      } catch (error) {
        console.error('Error fetching notifications:', error)
        return []
      }
    },
  })

  // Table Data (All with pagination & filter)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [classRoomId, setClassRoomId] = useState(null)
  const [competitionId, setCompetitionId] = useState(null)

  const { data: notificationsTable, isLoading: isLoadingTable } = useQuery({
    queryKey: ['notifications', 'table', page, pageSize, classRoomId, competitionId],
    queryFn: async () => {
      const response = await getMyNotifications({
        pageNum: page,
        pageSize: pageSize,
        classRoomId: classRoomId || undefined,
        competitionId: competitionId || undefined,
      })
      return response.data
    },
    placeholderData: (prev) => prev,
  })

  // Classrooms for Filter
  const { data: classrooms } = useQuery({
    queryKey: ['my-classes', ''],
    queryFn: () => getMyClasses(),
    select: (data) => data.data || [],
  })

  // Competitions for Filter
  const { data: competitions } = useQuery({
    queryKey: ['my-competitions'],
    queryFn: () => getMyCompetitions({}),
    select: (data) => data.data || [],
  })

  const sourceFilters = [
    ...(classrooms?.map((cls) => ({
      text: <Tooltip title={cls.name}>Lớp: {cls.name}</Tooltip>,
      value: `class_${cls.id}`,
    })) || []),
    ...(competitions?.map((comp) => ({
      text: <Tooltip title={comp.name}>Cuộc thi: {comp.name}</Tooltip>,
      value: `competition_${comp.id}`,
    })) || []),
  ]

  const handleTableChange = (pagination, filters) => {
    const newFilterValue = filters.classRoomName ? filters.classRoomName[0] : null

    let newClassRoomId = null
    let newCompetitionId = null

    if (newFilterValue) {
      const [type, id] = newFilterValue.split('_')
      if (type === 'class') {
        newClassRoomId = id
      } else if (type === 'competition') {
        newCompetitionId = id
      }
    }

    // If the filter has changed, we should go back to the first page.
    if (classRoomId !== newClassRoomId || competitionId !== newCompetitionId) {
      setPage(1)
    } else {
      setPage(pagination.current)
    }

    setPageSize(pagination.pageSize)
    setClassRoomId(newClassRoomId)
    setCompetitionId(newCompetitionId)
  }

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 70,
      align: 'center',
      render: (_, __, index) => (
        <span className='font-medium'>{(page - 1) * pageSize + index + 1}</span>
      ),
    },
    {
      title: 'Nguồn',
      dataIndex: 'classRoomName',
      key: 'classRoomName',
      filters: sourceFilters,
      filterMultiple: false,
      filteredValue: classRoomId
        ? [`class_${classRoomId}`]
        : competitionId
        ? [`competition_${competitionId}`]
        : null,
      render: (text, record) => (
        <span className='font-medium'>{text || record.competitionName || 'N/A'}</span>
      ),
    },
    {
      title: 'Tên thông báo',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text) => <div className='font-bold whitespace-normal break-words'>{text}</div>,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span className='font-medium'>{formatDate(date)}</span>,
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdByName',
      key: 'createdByName',
      render: (text) => <span className='font-medium'>{text}</span>,
    },
    Table.EXPAND_COLUMN,
  ]

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!classrooms || !competitions) {
      return
    }

    const authData = JSON.parse(localStorage.getItem(LocalStorage.auth))
    const accessToken = authData?.accessToken

    if (!accessToken) {
      return
    }

    const handleMessage = (message) => {
      const notification = JSON.parse(message.body)
      // Update swiper cache
      queryClient.setQueryData(['notifications', 'swiper'], (oldData) => {
        const data = oldData || []
        const newData = [notification, ...data]
        return newData.slice(0, 10)
      })
      // Invalidate and refetch table data
      queryClient.invalidateQueries({ queryKey: ['notifications', 'table'] })
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        classrooms.forEach((classroom) => {
          client.subscribe(`/topic/classrooms/${classroom.id}/notifications`, handleMessage)
        })
        competitions.forEach((competition) => {
          client.subscribe(`/topic/competitions/${competition.id}/notifications`, handleMessage)
        })
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      },
    })

    client.activate()

    return () => {
      client.deactivate()
    }
  }, [queryClient, classrooms, competitions])

  return (
    <div>
      <div className='flex items-center gap-2.5 mb-2'>
        <Icon icon='mingcute:notification-newdot-line' width='36' height='36' color='#f27b36' />
        <span className='font-semibold text-2xl'>Thông báo mới nhất</span>
      </div>
      <NotificationsSwiper
        notifications={notificationsSwiper}
        isLoading={isLoadingNotifications}></NotificationsSwiper>
      <div className='mt-4'>
        <div className='flex items-center gap-2.5 mb-2'>
          <Icon icon='mingcute:notification-newdot-line' width='36' height='36' color='#f27b36' />
          <span className='font-semibold text-2xl'>Tất cả thông báo</span>
        </div>
        <Table
          columns={columns}
          dataSource={notificationsTable?.items || []}
          loading={isLoadingTable}
          rowKey='id'
          onChange={handleTableChange}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: notificationsTable?.meta?.totalElements || 0,
            showSizeChanger: true,
          }}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) =>
              record.content ? (
                <Icon
                  icon='mingcute:down-line'
                  className={`text-primary-medium cursor-pointer transition-transform duration-300 ${
                    expanded ? 'rotate-[-180deg]' : ''
                  }`}
                  width='24'
                  height='24'
                  onClick={(e) => onExpand(record, e)}
                />
              ) : null,
            expandedRowRender: (record) => (
              <div className='p-4 bg-orange-50 rounded-lg'>
                <p className='font-semibold mb-2'>Nội dung chi tiết:</p>
                <p className='max-w-[70vw]'>{record.content}</p>
              </div>
            ),
            rowExpandable: (record) => !!record.content,
          }}
        />
      </div>
    </div>
  )
}

export default MyNotificationsPage
