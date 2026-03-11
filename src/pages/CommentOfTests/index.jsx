import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Table, Tag } from 'antd'
import { Icon } from '@iconify/react'

import { getPostById } from 'apis/post.api'
import { getAllCommentsOfPost } from 'apis/commentPost.api'
import { formatDate } from 'utils/formatters'

const CommentOfTests = () => {
  const navigate = useNavigate()
  const { classId, testId, commentId } = useParams()

  // Pagination state
  const [pagination, setPagination] = useState({
    pageNum: 1,
    pageSize: 10,
  })

  // 1. Fetch Post Data (Test info)
  const { data: postData, isLoading: loadingPost } = useQuery({
    queryKey: ['post', testId],
    queryFn: () => getPostById(testId),
    enabled: !!testId,
    select: (response) => response?.data || response,
  })

  // 2. Fetch Comments (Submissions)
  const { data: commentsData, isLoading: loadingComments } = useQuery({
    queryKey: ['comments', testId, pagination.pageNum, pagination.pageSize],
    queryFn: () =>
      getAllCommentsOfPost(testId, {
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
      }),
    enabled: !!testId,
    select: (response) => response?.data || response, // Returns { meta: {...}, items: [...] }
  })

  // Define Table Columns
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (_, __, index) => (pagination.pageNum - 1) * pagination.pageSize + index + 1,
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
        // Change color based on score (e.g., < 5 is red, >= 8 is green)
        const color = score >= 8 ? 'success' : score >= 5 ? 'processing' : 'error'
        return (
          <Tag color={color} className='font-bold text-sm m-0'>
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
          className='hover:text-primary transition-colors'
          onClick={() =>
            navigate(`/manage/classes/${classId}/tests/${testId}/comments/${record.id}/grade`)
          }>
          Chấm điểm
        </div>
      ),
    },
  ]

  // Handle Table Pagination Change
  const handleTableChange = (newPagination) => {
    setPagination({
      pageNum: newPagination.current,
      pageSize: newPagination.pageSize,
    })
  }

  const items = commentsData?.items || []
  const totalElements = commentsData?.meta?.totalElements || 0

  if (loadingPost) return <div className='p-6'>Đang tải dữ liệu bài kiểm tra...</div>

  return (
    <div>
      <div className='flex items-center gap-4 mb-6'>
        <h1 className='text-2xl font-bold m-0 text-gray-800'>
          {postData?.title || 'Đang tải tên bài kiểm tra...'}
        </h1>
      </div>

      {/* Info Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        <div className=' p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4'>
          <div className='bg-blue-100 p-3 rounded-full text-blue-600'>
            <Icon icon='solar:calendar-add-bold-duotone' width='24' height='24' />
          </div>
          <div>
            <p className='text-gray-500 m-0'>Ngày giao</p>
            <p className='font-semibold text-gray-800 m-0'>{formatDate(postData?.createdAt)}</p>
          </div>
        </div>

        <div className='p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4'>
          <div className='bg-red-100 p-3 rounded-full text-red-600'>
            <Icon icon='solar:alarm-turn-off-bold-duotone' width='24' height='24' />
          </div>
          <div>
            <p className='text-gray-500 m-0'>Hạn nộp bài (Deadline)</p>
            <p className='font-semibold text-gray-800 m-0'>{formatDate(postData?.deadline)}</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className=' rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
        <div className='p-4 border-b border-gray-100 bg-gray-50'>
          <h2 className='text-lg font-semibold text-gray-700 m-0'>Danh sách bài nộp</h2>
        </div>

        <Table
          columns={columns}
          dataSource={items}
          rowKey='id'
          loading={loadingComments}
          onChange={handleTableChange}
          pagination={{
            current: pagination.pageNum,
            pageSize: pagination.pageSize,
            total: totalElements,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} bài nộp`,
            pageSizeOptions: ['10', '20', '50'],
          }}
          className='custom-table'
        />
      </div>
    </div>
  )
}

export default CommentOfTests
