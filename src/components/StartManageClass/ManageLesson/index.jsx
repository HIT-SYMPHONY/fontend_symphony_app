import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLessonsByClassId, deleteLesson } from '../../../apis/lesson.api'
import { formatDateTime } from '../../../utils/formatters'
import TextMessage from '../../TextMessage'
import './style.scss'

const ManageLesson = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const queryClient = useQueryClient()
  const [expandedItems, setExpandedItems] = useState({})
  const {
    data: lessons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['lessons', classId, keyword],
    queryFn: async () => {
      if (!classId) return []
      const params = {
        keyword: keyword || null,
      }
      const filteredParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null))
      console.log(filteredParams)
      const response = await getLessonsByClassId(classId, filteredParams)
      return response.data || []
    },
    enabled: !!classId,
    onError: () => {
      toast.error('Không thể tải danh sách bài học.')
    },
  })
  const deleteLessonMutation = useMutation({
    mutationFn: deleteLesson,
    onMutate: () => {
      const toastId = toast.loading('Đang xóa bài học...')
      return toastId
    },
    onSuccess: (data, variables, context) => {
      toast.success('Xóa bài học thành công!', { id: context })
      queryClient.invalidateQueries({ queryKey: ['lessons', classId] })
    },
    onError: (error, variables, context) => {
      const message = error.response?.data?.message || 'Lỗi khi xóa bài học.'
      toast.error(message, { id: context })
    },
  })

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleDelete = (lessonId, event) => {
    event.stopPropagation()
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này không?')) {
      deleteLessonMutation.mutate(lessonId)
    }
  }

  const handleEdit = (lessonId, event) => {
    event.stopPropagation()
    navigate(`/manage/classes/${classId}/lessons/${lessonId}/edit`)
  }

  const renderContent = () => {
    if (isLoading) {
      return <TextMessage text='Đang tải...' />
    }
    if (isError) {
      return <TextMessage text='Lỗi khi tải dữ liệu. Vui lòng thử lại.' />
    }
    if (lessons.length === 0) {
      return <TextMessage text='Chưa có bài học nào trong lớp này.' />
    }
    return lessons.map((item, index) => (
      <React.Fragment key={item.id}>
        <div className='managelesson__grid-row' onClick={() => toggleExpand(item.id)}>
          <h5 className='managelesson__grid-row__number'>{index + 1}</h5>
          <h5 className='managelesson__grid-row__name'>{item.title || item.content}</h5>
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
            <span className='cursor-pointer' onClick={() => navigate(`/manage/classes/${classId}/lessons/${item.id}/edit`)}>Tài liệu tham khảo</span>
            <span>{formatDateTime(item.createdAt)}</span>
          </div>
        )}
      </React.Fragment>
    ))
  }

  return (
    <div className='lesson-container'>
      <h3>Tất cả bài học ({isLoading ? '...' : lessons.length})</h3>
      <div className='managelesson'>
        <div className='managelesson__grid'>
          <div className='managelesson__grid-header'>
            <h4>Tên bài học</h4>
            <h4>Ngày tạo</h4>
          </div>
          <div className='managelesson__grid-body'>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default ManageLesson
