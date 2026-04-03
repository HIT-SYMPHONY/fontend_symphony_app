import { getAllCommentsOfCompetition } from 'apis/commentCompetition.api'
import { getCompetitionById } from 'apis/competition.api'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Table, Tag, Skeleton } from 'antd'
import { Icon } from '@iconify/react'

import { formatDate } from 'utils/formatters'
import ApiErrorDisplay from 'components/ApiErrorDisplay'

function LeaderCompetitionAnswersPage() {
  const { competitionId } = useParams()
  const navigate = useNavigate()

  // Pagination state
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
  })

  // Fetch Competition Data
  const {
    data: competitionData,
    isLoading: isLoadingCompetition,
    isError: isErrorCompetition,
    refetch: refetchCompetition,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId),
    enabled: !!competitionId,
    select: (response) => response?.data || response,
  })

  // Fetch Submissions (Comments)
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    refetch: refetchCommnets,
  } = useQuery({
    queryKey: [
      'competition-comments',
      competitionId,
      pagination.pageNum,
      pagination.pageSize,
    ],
    queryFn: () =>
      getAllCommentsOfCompetition(competitionId, {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      }),
    enabled: !!competitionId,
    select: (response) => response?.data || response,
  })

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) =>
        (pagination.pageNum - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'Mã Sinh Viên',
      dataIndex: 'studentCode',
      key: 'studentCode',
      render: (text) => <span className='font-semibold'>{text || 'N/A'}</span>,
    },
    {
      title: 'Tên người nộp',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Thời gian nộp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => formatDate(text),
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: (score) => {
        if (score === null || score === undefined) {
          return <Tag color='default'>Chưa chấm</Tag>
        }
        const color =
          score >= 8 ? 'success' : score >= 5 ? 'processing' : 'error'
        return (
          <Tag color={color} className='m-0 text-sm font-bold'>
            {score}
          </Tag>
        )
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <div
          className='cursor-pointer font-semibold transition-colors hover:text-primary'
          onClick={() =>
            navigate(
              `/manage/competitions/${competitionId}/tests/${record.id}/grade`,
            )
          }>
          Chấm điểm
        </div>
      ),
    },
  ]
  const handleTableChange = (newPagination) => {
    setPagination({
      pageNum: newPagination.current,
      pageSize: newPagination.pageSize,
    })
  }
  const items = commentsData?.items || []
  const totalElements = commentsData?.meta?.totalElements || 0

  // --- 1. ERROR STATE ---
  if (isErrorCompetition || isErrorComments) {
    return (
      <ApiErrorDisplay
        title='Không thể tải dữ liệu'
        subTitle='Đã có lỗi xảy ra khi tải danh sách bài nộp của cuộc thi.'
        refetchQueries={[refetchCommnets, refetchCompetition]}
        backUrl={-1}
      />
    )
  }

  if (isLoadingCompetition) {
    return (
      <div>
        <div className='mb-6 flex items-center gap-4'>
          <Skeleton.Input active size='large' style={{ width: 300 }} />
        </div>

        <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {[1, 2].map((key) => (
            <div
              key={key}
              className='flex items-center gap-4 rounded-lg border border-gray-100 p-4 shadow-sm'>
              <Skeleton.Avatar active size='large' shape='circle' />
              <div className='flex flex-col gap-2'>
                <Skeleton.Input
                  active
                  size='small'
                  style={{ width: 100, height: 16 }}
                />
                <Skeleton.Input
                  active
                  size='small'
                  style={{ width: 150, height: 20 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='overflow-hidden rounded-lg border border-gray-100 shadow-sm'>
          <div className='border-b border-gray-100 bg-gray-50 p-4'>
            <Skeleton.Input active size='small' style={{ width: 200 }} />
          </div>
          <div className='p-6'>
            <Skeleton active title={false} paragraph={{ rows: 5 }} />
          </div>
        </div>
      </div>
    )
  }

  // --- 3. MAIN RENDER ---
  return (
    <div>
      <div className='mb-6 flex items-center gap-4'>
        <h1 className='m-0 text-2xl font-bold text-gray-800'>
          {competitionData?.name || 'Đang tải tên bài cuộc thi...'}
        </h1>
      </div>

      {/* Info Cards Section */}
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='flex items-center gap-4 rounded-lg border border-gray-100 p-4 shadow-sm'>
          <div className='rounded-full bg-blue-100 p-3 text-blue-600'>
            <Icon
              icon='solar:calendar-add-bold-duotone'
              width='24'
              height='24'
            />
          </div>
          <div>
            <p className='m-0 text-gray-500'>Thời gian bắt đầu</p>
            <p className='m-0 font-semibold text-gray-800'>
              {formatDate(competitionData?.startTime)}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-4 rounded-lg border border-gray-100 p-4 shadow-sm'>
          <div className='rounded-full bg-red-100 p-3 text-red-600'>
            <Icon
              icon='solar:alarm-turn-off-bold-duotone'
              width='24'
              height='24'
            />
          </div>
          <div>
            <p className='m-0 text-gray-500'>Thời gian kết thúc</p>
            <p className='m-0 font-semibold text-gray-800'>
              {formatDate(competitionData?.endTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='overflow-hidden rounded-lg border border-gray-100 shadow-sm'>
        <div className='border-b border-gray-100 bg-gray-50 p-4'>
          <h2 className='m-0 text-lg font-semibold text-gray-700'>
            Danh sách nộp bài
          </h2>
        </div>

        <Table
          columns={columns}
          dataSource={items}
          rowKey='id'
          loading={isLoadingComments}
          onChange={handleTableChange}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: totalElements,
            showSizeChanger: true,
            showTotal: (total) => `Số lượng nộp ${total}`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          className='custom-table'
        />
      </div>
    </div>
  )
}

export default LeaderCompetitionAnswersPage
