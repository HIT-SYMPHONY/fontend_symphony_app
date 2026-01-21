import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPostsByClassroomId, deletePost } from '../../../apis/post.api'
import { formatDateTime } from '../../../utils/formatters'
import TextMessage from '../../TextMessage'
import '../ManageLesson/style.scss'

const ManageTest = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const queryClient = useQueryClient()

  const [expandedItems, setExpandedItems] = useState({})
  const {
    data: tests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tests', classId],
    queryFn: async () => {
      if (!classId) return []
      const response = await getPostsByClassroomId(classId)
      return response.data.items || []
    },
    enabled: !!classId,
    onError: () => {
      toast.error('Không thể tải danh sách bài kiểm tra.')
    },
  })
  const deleteTestMutation = useMutation({
    mutationFn: deletePost,
    onMutate: () => {
      const toastId = toast.loading('Đang xóa bài kiểm tra...')
      return toastId
    },
    onSuccess: (data, variables, context) => {
      toast.success('Xóa bài kiểm tra thành công!', { id: context })
      queryClient.invalidateQueries({ queryKey: ['tests', classId] })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi xóa bài kiểm tra.'
      toast.error(message, { id: context })
    },
  })

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleDelete = (testId, event) => {
    event.stopPropagation()
    if (window.confirm('Bạn có chắc chắn muốn xóa bài kiểm tra này không?')) {
      deleteTestMutation.mutate(testId)
    }
  }

  const handleEdit = (testId, event) => {
    event.stopPropagation()
    navigate(`/manage/classes/${classId}/tests/${testId}/edit`)
  }

  const renderContent = () => {
    if (isLoading) {
      return <TextMessage text='Đang tải...' />
    }
    if (isError) {
      return <TextMessage text='Lỗi khi tải dữ liệu. Vui lòng thử lại.' />
    }
    if (tests.length === 0) {
      return <TextMessage text='Chưa có bài kiểm tra nào trong lớp này.' />
    }
    return tests.map((item, index) => (
      <React.Fragment key={item.id}>
        <div className='managelesson__grid-row' onClick={() => toggleExpand(item.id)}>
          <h5 className='managelesson__grid-row__number'>{index + 1}</h5>
          <h5 className='managelesson__grid-row__name'>{item.title}</h5>
          <h5 className='managelesson__grid-row__date'>{formatDateTime(item.createdAt)}</h5>
          <div className='managelesson__grid-row-actions'>
            <i className='fa-solid fa-pen-to-square' onClick={(e) => handleEdit(item.id, e)}></i>
            <i className='fa-solid fa-trash' onClick={(e) => handleDelete(item.id, e)}></i>
          </div>
          <i
            className={
              expandedItems[item.id] ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
            }
          />
        </div>
        {expandedItems[item.id] && (
          <div className='managelesson__grid-details-row'>
            <span>Nội dung chi tiết</span>
            <span>{formatDateTime(item.createdAt)}</span>
          </div>
        )}
      </React.Fragment>
    ))
  }

  return (
    <div className='lesson-container'>
      <h3>Tất cả bài kiểm tra ({isLoading ? '...' : tests.length})</h3>
      <div className='managelesson'>
        <div className='managelesson__grid'>
          <div className='managelesson__grid-header'>
            <h4>Tên bài kiểm tra</h4>
            <h4>Ngày tạo</h4>
          </div>
          <div className='managelesson__grid-body'>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default ManageTest
