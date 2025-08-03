import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userCreationSchema } from '../../../../utils/userValidate.js'
import { createUser } from '../../../../apis/user.api'
import './style.scss'

const CreateOfMain = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userCreationSchema),
  })

  // This function only runs if validation is successful
  const onSubmit = async (data) => {
    setLoading(true)
    const creationToast = toast.loading('Đang tạo tài khoản...')

    // The backend for creating a user expects multipart/form-data
    const formData = new FormData()
    // The JSON payload is appended as a Blob named 'data'
    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }))
    // Note: Image file upload logic can be added here if needed

    try {
      await createUser(formData)
      toast.success('Tạo tài khoản thành công!', { id: creationToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài khoản.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='createofmain'>
      <div className='createofmain__title'>
        <Icon
          icon='material-symbols:arrow-back-rounded'
          width='32'
          height='32'
          className='createofmain__title__icon'
          onClick={() => navigate('/admin/home')}
        />
        <Icon
          icon='fluent:people-add-32-filled'
          width='32'
          height='32'
          className='createofmain__title__icon'
        />
        <h2>Tạo tài khoản mới</h2>
      </div>

      {/* The form now wraps the content area */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='createofmain__context'>
          <div className='createofmain__context__table'>
            <div className='createofmain__context__table__box'>
              <h5>Họ và tên đệm</h5>
              <input type='text' {...register('lastName')} />
              {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
            </div>
            <div className='createofmain__context__table__box'>
              <h5>Tên</h5>
              <input type='text' {...register('firstName')} />
              {errors.firstName && (
                <span className='error-message'>{errors.firstName.message}</span>
              )}
            </div>
            <div className='createofmain__context__table__box'>
              <h5>Mã sinh viên</h5>
              <input type='text' {...register('studentCode')} />
              {errors.studentCode && (
                <span className='error-message'>{errors.studentCode.message}</span>
              )}
            </div>
            <div className='createofmain__context__table__box'>
              <h5>Email</h5>
              <input type='text' {...register('email')} />
              {errors.email && <span className='error-message'>{errors.email.message}</span>}
            </div>
          </div>
          <div className='createofmain__context__click'>
            <button
              type='submit'
              className='createofmain__context__click__button'
              disabled={loading}>
              {loading ? 'Đang tạo...' : 'Tạo'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateOfMain
