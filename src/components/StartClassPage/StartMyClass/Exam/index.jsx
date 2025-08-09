import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getPostById } from '../../../../apis/post.api'
import { createCommentPost } from '../../../../apis/commentPost.api'
import { commentPostSchema } from '../../../../utils/commentPostValidate.js'
import Comment from '../Comment'
import './style.scss'

const Exam = () => {
  const navigate = useNavigate()
  const { examId } = useParams()

  const [postData, setPostData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submit, setSubmit] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const intervalRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentPostSchema),
  })
  useEffect(() => {
    const fetchPost = async () => {
      if (!examId) return
      try {
        setLoading(true)
        const response = await getPostById(examId)
        const post = response.data
        setPostData(post)

        // Calculate time remaining in seconds
        const deadline = new Date(post.deadline)
        const now = new Date()
        const remainingSeconds = Math.max(0, Math.floor((deadline - now) / 1000))
        setTimeLeft(remainingSeconds)
      } catch (error) {
        toast.error('Không thể tải thông tin bài kiểm tra.')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [examId])

  // Countdown timer logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          toast.error('Hết giờ làm bài!')
          // You might want to auto-submit or navigate away here
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  const onSubmit = async (data) => {
    const submissionToast = toast.loading('Đang nộp bài...')
    try {
      const payload = {
        content: data.content,
        examId: examId,
      }
      await createCommentPost(payload)
      toast.success('Nộp bài thành công!', { id: submissionToast })
      setSubmit(true)
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi nộp bài.'
      toast.error(message, { id: submissionToast })
    }
  }

  if (loading) return <div>Đang tải bài kiểm tra...</div>
  if (!postData) return <div>Không tìm thấy bài kiểm tra.</div>

  return (
    <>
      {submit ? (
        <Comment setSubmit={setSubmit} postData={postData} />
      ) : (
        <div className='exam'>
          <div className='exam-title'>
            <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
            <h2>{postData.classRoomName || 'Tên lớp học'}</h2>
          </div>
          <div className='exam__one'>
            <div className='exam__one__tap'>
              <strong className='exam__one__tap__than'>1</strong>
              <strong className='tapthan'>
                <i className='fa-solid fa-angles-right'></i>
              </strong>
              <strong>{postData.title}</strong>
            </div>
            <strong
              className='exam__one__time'
              style={{ color: timeLeft <= 300 ? '#ff0000' : '#000000' }}>
              {timeLeft > 0 ? formatTime(timeLeft) : '00:00:00'}
            </strong>
          </div>
          <div className='exam__two'>
            <strong>Nội dung: </strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{postData.content}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='exam__nop'>
              <label className='exam__label'>Trả lời:</label>
              <div className='exam__input-wrapper'>
                <textarea className='exam__textarea' {...register('content')} />
                <button type='submit' className='exam__submit-button'>
                  <Icon
                    icon='streamline-flex:mail-send-email-message-circle-solid'
                    color='white'
                    width='30'
                    height='30'
                    className='exam__submit'
                  />
                </button>
              </div>
              {errors.content && <p className='error-message'>{errors.content.message}</p>}
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Exam
