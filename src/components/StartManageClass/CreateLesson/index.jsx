import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { lessonCreationSchema } from '../../../utils/lessonValidate.js'
import { createLesson } from '../../../apis/lesson.api'
import './style.scss'

const CreateLessonID = () => {
  const navigate = useNavigate()
  const { classID} = useParams()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(lessonCreationSchema),
    defaultValues: {
      classRoomId: classID
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const creationToast = toast.loading('Đang tạo bài học...')
    const payload = {
      ...data,
      startTime: data.startTime,
      endTime: data.endTime,
    }

    try {
      await createLesson(payload)
      toast.success('Tạo bài học thành công!', { id: creationToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo bài học.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
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
        <h3>Bài học</h3>
      </div>

      {/* --- THE FIX IS HERE: The <form> tag now wraps everything --- */}
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
              {/* Corrected id and name to match API */}
              <input type='time' id='startTime' {...register('startTime')} />
              {errors.startTime && (
                <span className='error-message'>{errors.startTime.message}</span>
              )}
            </div>
            <div className='createlesson__time-wrap'>
              <label htmlFor='endTime'>Thời gian kết thúc</label>
              {/* Corrected id and name to match API */}
              <input type='time' id='endTime' {...register('endTime')} />
              {errors.endTime && <span className='error-message'>{errors.endTime.message}</span>}
            </div>
            <div className='createlesson__time-wrap'>
              <label htmlFor='dayOfWeek'>Ngày học</label>
              {/* Corrected id and name to match API */}
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

        {/* The submit button is now INSIDE the form */}
        <div className='createlesson__end'>
          <button type='submit' className='createlesson__end__submit' disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLessonID
