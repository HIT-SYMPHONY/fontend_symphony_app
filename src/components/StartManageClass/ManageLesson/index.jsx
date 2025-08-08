import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getLessonsByClassId, deleteLesson } from '../../../apis/lesson.api'
import { formatDateTime } from '../../../utils/formatters'
import './style.scss'
import TextMessage from '../../TextMessage'

const ManageLesson = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState({})

  const fetchLessons = useCallback(async () => {
    if (!classId) return
    try {
      setLoading(true)
      const response = await getLessonsByClassId(classId)
      setLessons(response.data || [])
    } catch (error) {
      toast.error('Không thể tải danh sách bài học.')
    } finally {
      setLoading(false)
    }
  }, [classId])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleDelete = async (lessonId, event) => {
    event.stopPropagation()
    if (window.confirm('Bạn có chắc chắn muốn xóa bài học này không?')) {
      const deleteToast = toast.loading('Đang xóa...')
      try {
        await deleteLesson(lessonId)
        toast.success('Xóa bài học thành công!', { id: deleteToast })
        fetchLessons()
      } catch (error) {
        const message = error.response?.data?.message || 'Lỗi khi xóa bài học.'
        toast.error(message, { id: deleteToast })
      }
    }
  }

  const handleEdit = (lessonId, event) => {
    event.stopPropagation()
    navigate(`/manage/classes/${classId}/lessons/${lessonId}/edit`)
  }

  return (
    <div className='lesson-container'>
      <h3>Tất cả bài học ({loading ? '...' : lessons.length})</h3>
      <div className='managelesson'>
        <div className='managelesson__grid'>
          <div className='managelesson__grid-header'>
            <h4>Tên bài học</h4>
            <h4>Ngày tạo</h4>
          </div>

          <div className='managelesson__grid-body'>
            {loading ? (
              <TextMessage text='Đang tải...'></TextMessage>
            ) : lessons.length > 0 ? (
              lessons.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div className='managelesson__grid-row' onClick={() => toggleExpand(item.id)}>
                    <h5 className='managelesson__grid-row__number'>{index + 1}</h5>
                    <h5 className='managelesson__grid-row__name'>{item.title || item.content}</h5>
                    <h5 className='managelesson__grid-row__date'>
                      {formatDateTime(item.createdAt)}
                    </h5>
                    <div className='managelesson__grid-row-actions'>
                      <i
                        className='fa-solid fa-pen-to-square'
                        onClick={(e) => handleEdit(item.id, e)}></i>
                      <i
                        className='fa-solid fa-trash'
                        onClick={(e) => handleDelete(item.id, e)}></i>
                    </div>
                    <i
                      className={
                        expandedItems[item.id]
                          ? 'fa-solid fa-chevron-up'
                          : 'fa-solid fa-chevron-down'
                      }
                    />
                  </div>
                  {expandedItems[item.id] && (
                    <div className='managelesson__grid-details-row'>
                      <span>Tài liệu tham khảo</span>
                      <span>{formatDateTime(item.createdAt)}</span>
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TextMessage>Chưa có bài học nào trong lớp này.</TextMessage>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageLesson
