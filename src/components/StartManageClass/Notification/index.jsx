import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Table, Button, Modal, Tooltip } from 'antd'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { deleteNotification } from '../../../apis/notification.api'
import { getNotificationsOfClassroom } from 'apis/classroom.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'

const Notification = () => {
  const { classId } = useParams()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [expandedId, setExpandedId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const {
    data: notificationData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['notifications', classId, pageNum, pageSize, keyword],
    queryFn: async () => {
      if (!classId) return { items: [], meta: { totalElements: 0 } }
      const response = await getNotificationsOfClassroom(classId, { pageNum, pageSize, keyword })
      return response.data
    },
    placeholderData: keepPreviousData,
  })

  const notifications = notificationData?.items || []
  const totalElements = notificationData?.meta?.totalElements || 0

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteNotification(id),
    onMutate: () => toast.loading('Đang xóa...'),
    onSuccess: (_, __, toastId) => {
      toast.success('Xóa thông báo thành công!', { id: toastId })
      if (notifications.length === 1 && pageNum > 1) {
        setPageNum((prev) => prev - 1)
      }
      queryClient.invalidateQueries({ queryKey: ['notifications', classId] })
    },
    onError: (error, _, toastId) => {
      toast.error(error.response?.data?.message || 'Xóa thất bại.', { id: toastId })
    },
  })

  const handleDelete = () => {
    if (!deleteId) return
    setIsModalOpen(false)
    deleteMutation.mutate(deleteId)
  }

  const openDeleteModal = (id) => {
    setDeleteId(id)
    setIsModalOpen(true)
  }

  const handleTableChange = (paginationConfig) => {
    setPageNum(paginationConfig.current)
    setPageSize(paginationConfig.pageSize)
  }

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: '5%',
      align: 'center',
      render: (_, __, index) => (pageNum - 1) * pageSize + index + 1,
    },
    {
      title: 'Lớp',
      dataIndex: 'classRoomName',
      key: 'classRoomName',
      width: '15%',
    },
    {
      title: 'Tên thông báo',
      dataIndex: 'title',
      key: 'title',
      ellipsis: {
        showTitle: false,
      },
      render: (title) => (
        <Tooltip placement='topLeft' title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      align: 'center',
      render: (text) => formatDate(text),
    },
    {
      title: 'Người tạo',
      dataIndex: 'createdByName',
      key: 'createdByName',
      width: '15%',
      ellipsis: true,
    },
    {
      title: '',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <div className='notification__actions'>
          <Button
            type='text'
            icon={
              <Icon
                color='#F27B36'
                icon={expandedId === record.id ? 'fa-solid:chevron-up' : 'fa-solid:chevron-down'}
              />
            }
            onClick={() => setExpandedId(expandedId === record.id ? null : record.id)}
            disabled={!record.content}
          />
          <Button
            type='text'
            danger
            icon={<Icon icon='fa-solid:trash' />}
            onClick={() => openDeleteModal(record.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <div className='notification'>
      <h3>Tất cả thông báo</h3>
      <div className='notification__sum'>
        <Table
          columns={columns}
          scroll={{ y: 400 }}
          dataSource={notifications}
          rowKey='id'
          loading={isLoading || isFetching}
          pagination={{
            current: pageNum,
            pageSize: pageSize,
            total: totalElements,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
          }}
          onChange={handleTableChange}
          expandable={{
            expandedRowRender: (record) => <p>{record.content}</p>,
            rowExpandable: (record) => !!record.content,
            expandedRowKeys: expandedId ? [expandedId] : [],
            showExpandColumn: false,
          }}
          locale={{
            emptyText: 'Không có thông báo nào.',
          }}
        />
      </div>
      <Modal
        title='Xóa thông báo?'
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        okText='Xóa'
        cancelText='Hủy'
        okButtonProps={{ danger: true }}
        centered={true}>
        <p>Bạn có chắc chắn muốn xóa thông báo này không?</p>
      </Modal>
    </div>
  )
}

export default Notification
