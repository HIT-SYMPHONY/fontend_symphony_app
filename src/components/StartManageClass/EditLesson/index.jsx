import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { lessonUpdateSchema } from '../../../utils/lessonValidate.js'
import { getLessonById, updateLesson } from '../../../apis/lesson.api'
import '../ManageLesson/style.scss'

const EditLesson = () => {
  const navigate = useNavigate()
  const { classID, lessonId } = useParams()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(lessonUpdateSchema),
  })

  useEffect(() => {
    const fetchLessonData = async () => {
      if (!lessonId) {
        toast.error('Không tìm thấy ID bài học.')
        return
      }
      try {
        setPageLoading(true)
        const response = await getLessonById(lessonId)
        reset(response.data)
      } catch (error) {
        toast.error('Không thể tải thông tin bài học.')
      } finally {
        setPageLoading(false)
      }
    }
    fetchLessonData()
  }, [lessonId, reset])

  const onSubmit = async (data) => {
    setLoading(true)
    const updateToast = toast.loading('Đang cập nhật bài học...')
    const payload = data

    try {
      console.log(lessonId)
      await updateLesson(lessonId, payload)
      toast.success('Cập nhật bài học thành công!', { id: updateToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: updateToast,
      })
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return <div>Đang tải bài học...</div>
  }

  return (
    <div className='createlesson'>
      <div className='createlesson__start'>
        <Icon
          icon='material-symbols:book-2-rounded'
          width='30'
          height='30'
          className='createlesson__start__icon'
        />
        <h3>Chỉnh sửa bài học</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='createlesson__context'>
          <div className='createlesson__title'>
            <div className='createlesson__wrapper'>
              <label htmlFor='title'>Tên bài học</label>
              <input
                type='text'
                placeholder='Nhập tên bài học... '
                className='createlesson__context__input'
                id='title'
                {...register('title')}
              />
              {errors.title && <span className='error-message'>{errors.title.message}</span>}
            </div>
            <div className='createlesson__wrapper'>
              <label htmlFor='location'>Địa điểm</label>
              <input
                placeholder='Nhập địa điểm...'
                type='text'
                id='location'
                className='createlesson__context__input'
                {...register('location')}
              />
              {errors.location && <span className='error-message'>{errors.location.message}</span>}
            </div>
          </div>

          <div className='createlesson__time'>
            <div className='createlesson__time-wrap'>
              <label htmlFor='startTime'>Thời gian bắt đầu</label>
              <input type='time' id='startTime' {...register('startTime')} />
              {errors.startTime && (
                <span className='error-message'>{errors.startTime.message}</span>
              )}
            </div>
            <div className='createlesson__time-wrap'>
              <label htmlFor='endTime'>Thời gian kết thúc</label>
              <input type='time' id='endTime' {...register('endTime')} />
              {errors.endTime && <span className='error-message'>{errors.endTime.message}</span>}
            </div>
            <div className='createlesson__time-wrap'>
              <label htmlFor='dayOfWeek'>Ngày học</label>
              <select id='dayOfWeek' {...register('dayOfWeek')}>
                <option value='MONDAY'>Thứ 2</option>
                <option value='TUESDAY'>Thứ 3</option>
                <option value='WEDNESDAY'>Thứ 4</option>
                <option value='THURSDAY'>Thứ 5</option>
                <option value='FRIDAY'>Thứ 6</option>
                <option value='SATURDAY'>Thứ 7</option>
                <option value='SUNDAY'>Chủ nhật</option>
              </select>
              {errors.dayOfWeek && (
                <span className='error-message'>{errors.dayOfWeek.message}</span>
              )}
            </div>
          </div>
          <label htmlFor='content'>Nội dung</label>
          <textarea
            id='content'
            placeholder='Nhập nội dung...'
            className='createlesson__context__textarea'
            {...register('content')}></textarea>
          {errors.content && <span className='error-message'>{errors.content.message}</span>}
        </div>

        <div className='createlesson__end'>
          <button type='submit' className='createlesson__end__submit' disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditLesson
