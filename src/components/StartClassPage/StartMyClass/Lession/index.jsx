import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import TextMessage from '../../../TextMessage'
import toast from 'react-hot-toast'
import { getLessonById } from '../../../../apis/lesson.api'

const Lesson = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const [pageLoading, setPageLoading] = useState(true)
  const [lesson, setLesson] = useState(null)
  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId) {
        toast.error('Không tìm thấy ID bài học.')
        return
      }
      try {
        setPageLoading(true)
        const response = await getLessonById(lessonId)
        setLesson(response.data)
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Không thể tải thông tin bài học.')
        }
        navigate('/home')
      } finally {
        setPageLoading(false)
      }
    }
    fetchLessonData()
  }, [lessonId])

  if (pageLoading) {
    return <TextMessage text='Đang tải bài học...'></TextMessage>
  }

  if (!lesson) {
    return <TextMessage text='Không thể hiển thị bài học.' />
  }

  return (
    <div className='viewlession'>
      <div className='viewlession-title'>
        <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
        <h2>{lesson.classRoomName || 'N/A'}</h2>
      </div>

      <div className='viewlession__one'>
        <strong>{lesson.title || 'N/A'}</strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Đề cương bài học</strong>
      </div>
      <div className='viewlession__two'>
        <strong>Nội dung</strong>
        <p>{lesson.content || ''} </p>
      </div>
    </div>
  )
}

export default Lesson
