import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema } from '../../../../utils/authValidate.js'
import { changePassword, verifyPassword } from '../../../../apis/auth.api'
import './style.scss'

const ReplaceOfAdmin = ({ setShowMain }) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: 'onTouched',
  })

  const handleCheckOldPassword = async () => {
    const isValid = await trigger('oldPassword')
    if (!isValid) return

    setLoading(true)
    const verifyToast = toast.loading('Đang kiểm tra...')
    try {
      await verifyPassword({ oldPassword: getValues('oldPassword') })
      toast.dismiss(verifyToast)
      setStep(2)
    } catch (error) {
      const message = error.response?.data?.message || 'Mật khẩu cũ không chính xác.'
      toast.error(message, { id: verifyToast })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const submitToast = toast.loading('Đang đổi mật khẩu...')
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })
      toast.success('Đổi mật khẩu thành công!', { id: submitToast })
      setStep(3)
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi đổi mật khẩu.'
      toast.error(message, { id: submitToast })
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className='accountframe__pos'>
            <h1 className='accountframe__pos__h1'>NHẬP MẬT KHẨU CŨ CỦA BẠN!</h1>
            <input
              type='password'
              placeholder='Nhập mật khẩu hiện tại...'
              className='accountframe__pos__input'
              {...register('oldPassword')}
            />
            {errors.oldPassword && (
              <p className='accountframe__error'>{errors.oldPassword.message}</p>
            )}
            <div className='accountframe__pos__button'>
              <button type='button' onClick={handleCheckOldPassword} disabled={loading}>
                {loading ? 'ĐANG KIỂM TRA...' : 'KIỂM TRA'}
              </button>
              <button type='button' onClick={() => setShowMain(false)}>
                QUAY LẠI
              </button>
            </div>
            <i
              className='fa-solid fa-xmark accountframe__pos__i'
              onClick={() => setShowMain(false)}></i>
          </div>
        )
      case 2: // AccountNew
        return (
          <div className='accountframe__pos'>
            <h4 className='accountframe__pos__h1'>NHẬP MẬT KHẨU MỚI</h4>
            <input
              type='password'
              placeholder='Nhập mật khẩu mới...'
              className='accountframe__pos__input'
              {...register('newPassword')}
            />
            {errors.newPassword && (
              <p className='accountframe__error'>{errors.newPassword.message}</p>
            )}

            <h4 className='accountframe__pos__h1'>NHẬP LẠI MẬT KHẨU MỚI</h4>
            <input
              type='password'
              placeholder='Nhập lại mật khẩu mới...'
              className='accountframe__pos__input'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='accountframe__error'>{errors.confirmPassword.message}</p>
            )}

            <div className='accountframe__pos__button'>
              <button type='submit' disabled={loading}>
                {loading ? 'ĐANG LƯU...' : 'XÁC NHẬN'}
              </button>
              <button type='button' onClick={() => setStep(1)}>
                QUAY LẠI
              </button>
            </div>
            <i
              className='fa-solid fa-xmark accountframe__pos__i'
              onClick={() => setShowMain(false)}></i>
          </div>
        )
      case 3: // AccountResult
        return (
          <div className='accountframe__relate'>
            <h1 className='accountframe__relate__h1'>ĐỔI MẬT KHẨU THÀNH CÔNG!</h1>
            <div className='accountframe__relate__button'>
              <button onClick={() => setShowMain(false)}>QUAY LẠI</button>
            </div>
            <i
              className='fa-solid fa-xmark accountframe__relate__i'
              onClick={() => setShowMain(false)}></i>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='accountframe'>
      {renderStep()}
    </form>
  )
}

export default ReplaceOfAdmin
