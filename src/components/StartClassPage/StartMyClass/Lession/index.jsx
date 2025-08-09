import React, { useEffect ,useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.scss'
import TextMessage from '../../../TextMessage'
import toast from 'react-hot-toast'
import { getLessonById } from '../../../../apis/lesson.api'

const Lesson = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [lesson,setLesson] = useState()
  useEffect(() => {
    const fetchLessonData = async () => {
      console.log(lessonId)
      if (!lessonId) {
        toast.error('Không tìm thấy ID bài học.')
        return
      }
      try {
        setPageLoading(true)
        const response = await getLessonById(lessonId)
        setLesson(response.data)
      } catch (error) {
        toast.error('Không thể tải thông tin bài học.')
      } finally {
        setPageLoading(false)
      }
    }
    fetchLessonData()
  }, [lessonId])

  if (pageLoading) {
    return <TextMessage text='Đang tải bài học...'></TextMessage>
  }

  return (
    <div className='viewlession'>
      <div className='viewlession-title'>
        <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
        <h2>{lesson.classRoomName}</h2>
      </div>

      <div className='viewlession__one'>
        <strong className='viewlession__one__than'>1 </strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>{lesson.title}</strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Đề cương bài học</strong>
      </div>
      <div className='viewlession__two'>
        <strong>Nội dung: {lesson.content} </strong>
      </div>
    </div>
  )
}

export default Lesson
