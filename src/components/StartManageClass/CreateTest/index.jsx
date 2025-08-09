import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postCreationSchema } from '../../../utils/postValidate'
import { createPost } from '../../../apis/post.api'
import './style.scss'

const CreateTest = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const [loading, setLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postCreationSchema),
    defaultValues: {
      classRoomId: classId,
    },
  })

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('vi-VN')
    setCurrentDate(formattedDate)
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const creationToast = toast.loading('Đang tạo bài tập...')
    const payload = {
      ...data,
      deadline: new Date(data.deadline).toISOString(),
    }

    try {
      await createPost(payload)
      toast.success('Tạo bài tập thành công!', { id: creationToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo bài tập.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='createtest'>
      <div className='createtest__start'>
        <Icon
          icon='material-symbols:book-2-rounded'
          width='30'
          height='30'
          className='createtest__start__icon'
        />
        <h3>Kiểm tra / Bài tập</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='createtest__context'>
          <h4>Tiêu đề</h4>
          <input
            type='text'
            placeholder='Nhập tiêu đề bài tập...'
            className='createtest__context__input'
            {...register('title')}
          />
          {errors.title && <span className='error-message'>{errors.title.message}</span>}

          <div className='createtest__context__time'>
            <div className='createtest__context__time__box'>
              <h4>Ngày giao</h4>
              <span>{currentDate}</span>
            </div>
            <div className='createtest__context__time__box'>
              <h4>Deadline</h4>
              <input type='datetime-local' {...register('deadline')} />
              {errors.deadline && <span className='error-message'>{errors.deadline.message}</span>}
            </div>
          </div>
          <h4>Nội dung</h4>
          <textarea
            placeholder='Nhập nội dung...'
            className='createtest__context__textarea'
            {...register('content')}></textarea>
          {errors.content && <span className='error-message'>{errors.content.message}</span>}

          <input type='hidden' {...register('classRoomId')} />
        </div>

        <div className='createtest__end'>
          <button type='submit' className='createtest__end__submit' disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTest
