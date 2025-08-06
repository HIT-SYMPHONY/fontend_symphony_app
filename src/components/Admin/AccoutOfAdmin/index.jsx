import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userUpdateSchema } from '../../../utils/userValidate.js'
import { getCurrentUser, updateUser } from '../../../apis/user.api'
import {
  formatDate,
  translateGender,
  formatDateForAPI,
  getDisplayName,
} from '../../../utils/formatters'
import useAuth from '../../../hooks/useAuth'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import ReplaceOfAdmin from '../NotiOfAdmin/ReplaceOfNoti'
import placeholderImage from '../../../assets/img/Ellipse.png'
import './style.scss'

const AccountOfAdmin = () => {
  const { user, saveUser } = useAuth()
  const [initialData, setInitialData] = useState({})
  const [loading, setLoading] = useState(true)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const formRef = useRef(null)
  const imageUploadRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
  })

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return
      try {
        setLoading(true)
        const response = await getCurrentUser()
        const userData = response.data

        const formattedData = {
          lastName: userData.lastName || '',
          firstName: userData.firstName || '',
          studentCode: userData.studentCode || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          intake: userData.intake || '',
          gender: userData.gender || '',
          dateBirth: userData.dateBirth,
          username: userData.username || '',
          fullName: userData.fullName || '',
          imageUrl: userData.imageUrl || null,
        }

        setInitialData(formattedData)
        setPreviewUrl(formattedData.imageUrl)
        reset(formattedData)
      } catch (error) {
        toast.error('Không thể tải thông tin tài khoản.')
      } finally {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [user, reset])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép hình ảnh PNG, JPG, JPEG, WEBP hoặc GIF')
        return
      }
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      if (!isEditingPersonal) {
        setIsEditingPersonal(true)
      }
    }
  }
  const handleCancelEdit = () => {
    reset(initialData)
    setPreviewUrl(initialData.imageUrl)
    setImageFile(null)
    setIsEditingPersonal(false)
  }
  useOnClickOutside([formRef, imageUploadRef], () => {
    if (isEditingPersonal) handleCancelEdit()
  })

  const onSubmit = async (data) => {
    if (!isDirty && !imageFile) {
      toast.error('Không có thay đổi nào để lưu.')
      setIsEditingPersonal(false)
      return
    }

    const updateToast = toast.loading('Đang cập nhật thông tin...')
    const payload = { ...data }

    if (payload.dateBirth instanceof Date) {
      payload.dateBirth = formatDateForAPI(payload.dateBirth)
    } else if (!payload.dateBirth) {
      payload.dateBirth = null
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await updateUser(user.id, formData)
      const updatedUserData = response.data

      const formattedData = {
        lastName: updatedUserData.lastName || '',
        firstName: updatedUserData.firstName || '',
        studentCode: updatedUserData.studentCode || '',
        email: updatedUserData.email || '',
        phoneNumber: updatedUserData.phoneNumber || '',
        intake: updatedUserData.intake || '',
        gender: updatedUserData.gender || '',
        dateBirth: updatedUserData.dateBirth,
        username: updatedUserData.username || '',
        fullName: updatedUserData.fullName || '',
        imageUrl: updatedUserData.imageUrl || null,
      }

      setInitialData(formattedData)
      setPreviewUrl(formattedData.imageUrl)
      reset(formattedData)
      saveUser({ ...user, ...updatedUserData })
      setIsEditingPersonal(false)
      setImageFile(null)
      toast.success('Cập nhật thành công!', { id: updateToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: updateToast,
      })
    }
  }

  if (loading) return <div>Đang tải...</div>

  const displayName = getDisplayName(initialData)

  return (
    <div className='account'>
      <div className='account__symbol'>
        <i className='fa-solid fa-circle-user'></i>
        <h3>Tài Khoản</h3>
      </div>
      <div className='account__user'>
        <div
          className='account__user__img'
          onClick={() => isEditingPersonal && fileInputRef.current.click()}
          ref={imageUploadRef}>
          <img
            src={previewUrl || placeholderImage}
            alt='User Avatar'
            className='user-avatar-preview'
          />
          {isEditingPersonal && (
            <div className='image-overlay'>
              <i className='fa-solid fa-upload'></i>
              <p>Tải ảnh lên</p>
            </div>
          )}
          <input
            type='file'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/*'
            style={{ display: 'none' }}
          />
        </div>
        <h2>{displayName}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='account__information' ref={formRef}>
          <div className='account__information__fix'>
            <h5>Thông tin cá nhân</h5>
            {isEditingPersonal ? (
              <button type='submit' className='edit-button save'>
                Lưu
              </button>
            ) : (
              <span onClick={() => setIsEditingPersonal(true)} className='edit-span'>
                <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
              </span>
            )}
          </div>
          <div className='account__information__thongtin'>
            <div className='account__info-item'>
              <span>Họ đệm</span>
              {isEditingPersonal ? (
                <input type='text' {...register('lastName')} className='edit-input' />
              ) : (
                <span>{initialData.lastName || 'N/A'}</span>
              )}
              {errors.username && <span className='error-message'>{errors.username.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Tên</span>
              {isEditingPersonal ? (
                <input type='text' {...register('firstName')} className='edit-input' />
              ) : (
                <span>{initialData.firstName || 'N/A'}</span>
              )}
              {errors.username && <span className='error-message'>{errors.username.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Tên tài khoản</span>
              {isEditingPersonal ? (
                <input type='text' {...register('username')} className='edit-input' />
              ) : (
                <span>{initialData.username || 'N/A'}</span>
              )}
              {errors.username && <span className='error-message'>{errors.username.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Khóa</span>
              {isEditingPersonal ? (
                <input type='text' {...register('intake')} className='edit-input' />
              ) : (
                <span>{initialData.intake || 'N/A'}</span>
              )}
              {errors.intake && <span className='error-message'>{errors.intake.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Giới tính</span>
              {isEditingPersonal ? (
                <select {...register('gender')} className='edit-input'>
                  <option value='MALE'>Nam</option>
                  <option value='FEMALE'>Nữ</option>
                  <option value='OTHER'>Khác</option>
                </select>
              ) : (
                <span>{translateGender(initialData.gender)}</span>
              )}
              {errors.gender && <span className='error-message'>{errors.gender.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Ngày sinh</span>
              {isEditingPersonal ? (
                <input type='date' {...register('dateBirth')} className='edit-input' />
              ) : (
                <span>{initialData.dateBirth ? formatDate(initialData.dateBirth) : 'N/A'}</span>
              )}
              {errors.dateBirth && (
                <span className='error-message'>{errors.dateBirth.message}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Email</span>
              {isEditingPersonal ? (
                <input type='text' {...register('email')} className='edit-input' />
              ) : (
                <span>{initialData.email || 'N/A'}</span>
              )}
              {errors.email && <span className='error-message'>{errors.email.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Số điện thoại</span>
              {isEditingPersonal ? (
                <input type='text' {...register('phoneNumber')} className='edit-input' />
              ) : (
                <span>{initialData.phoneNumber || 'N/A'}</span>
              )}
              {errors.phoneNumber && (
                <span className='error-message'>{errors.phoneNumber.message}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Mã sinh viên</span>
              {isEditingPersonal ? (
                <input type='text' {...register('studentCode')} className='edit-input' />
              ) : (
                <span>{initialData.studentCode || 'N/A'}</span>
              )}
              {errors.studentCode && (
                <span className='error-message'>{errors.studentCode.message}</span>
              )}
            </div>
          </div>
        </div>
      </form>

      <div className='account__taikhoan'>
        <div className='account__taikhoan__fix'>
          <h4>Thông tin tài khoản</h4>
          <span onClick={() => setShowPasswordPopup(true)} className='edit-span'>
            <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
          </span>
        </div>
        <div className='account__taikhoan__context'>
          <div className='account__taikhoan__info-item'>
            <span>Tên đăng nhập</span>
            <span>{initialData.studentCode}</span>
          </div>
          <div className='account__taikhoan__info-item'>
            <span>Mật khẩu</span>
            <span>{'•'.repeat(8)}</span>
          </div>
        </div>
      </div>

      {showPasswordPopup && <ReplaceOfAdmin setShowMain={setShowPasswordPopup} />}
    </div>
  )
}

export default AccountOfAdmin
