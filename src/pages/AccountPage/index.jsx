import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { userUpdateSchema } from '../../utils/userValidate.js'
import { getCurrentUser, updateUser } from '../../apis/user.api'
import { formatDate, translateGender, getDisplayName } from '../../utils/formatters'
import { DISPLAY_DATE_FORMAT, API_DATE_FORMAT, intakeOptions } from '../../constants/commonConstant'
import useAuth from '../../hooks/useAuth'
import ReplaceOfAdmin from '../../components/Admin/NotiOfAdmin/ReplaceOfNoti/index.jsx'
import placeholderImage from '../../assets/img/Ellipse.png'
import TextMessage from '../../components/TextMessage'
import './style.scss'

const AccountPage = () => {
  const { user, saveUser } = useAuth()
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
    mode: 'onTouched',
  })

  const intakeSelectOptions = useMemo(() => {
    return intakeOptions
      .filter((option) => option !== 'Tất cả')
      .map((option) => ({ value: option, label: option }))
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return
      try {
        setLoading(true)
        const response = await getCurrentUser()
        const userData = response.data

        setInitialData(userData)
        setPreviewUrl(userData.imageUrl)

        const formattedDataForForm = {
          lastName: userData.lastName || '',
          firstName: userData.firstName || '',
          studentCode: userData.studentCode || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          intake: userData.intake || null,
          gender: userData.gender || null,
          dateBirth: userData.dateBirth ? dayjs(userData.dateBirth) : null,
          username: userData.username || '',
        }
        reset(formattedDataForForm)
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
        toast.error('Chỉ cho phép hình ảnh.')
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
    const formattedDataForForm = {
      lastName: initialData.lastName || '',
      firstName: initialData.firstName || '',
      studentCode: initialData.studentCode || '',
      email: initialData.email || '',
      phoneNumber: initialData.phoneNumber || '',
      intake: initialData.intake || null,
      gender: initialData.gender || null,
      dateBirth: initialData.dateBirth ? dayjs(initialData.dateBirth) : null,
      username: initialData.username || '',
    }
    reset(formattedDataForForm)
    setPreviewUrl(initialData.imageUrl)
    setImageFile(null)
    setIsEditingPersonal(false)
  }

  const onSubmit = async (data) => {
    const updateToast = toast.loading('Đang cập nhật thông tin...')
    const payload = {
      ...data,
      dateBirth: data.dateBirth ? data.dateBirth.format(API_DATE_FORMAT) : null,
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await updateUser(user.id, formData)
      const updatedUserData = response.data

      setInitialData(updatedUserData)
      setPreviewUrl(updatedUserData.imageUrl)
      const formattedDataForForm = {
        lastName: updatedUserData.lastName || '',
        firstName: updatedUserData.firstName || '',
        studentCode: updatedUserData.studentCode || '',
        email: updatedUserData.email || '',
        phoneNumber: updatedUserData.phoneNumber || '',
        intake: updatedUserData.intake || null,
        gender: updatedUserData.gender || null,
        dateBirth: updatedUserData.dateBirth ? dayjs(updatedUserData.dateBirth) : null,
        username: updatedUserData.username || '',
      }
      reset(formattedDataForForm)
      saveUser({ ...user, fullName: updatedUserData.fullName, imageUrl: updatedUserData.imageUrl })
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

  if (loading) return <TextMessage />
  if (!initialData) return <TextMessage text='Không tìm thấy người dùng.' />

  const displayName = getDisplayName(initialData)

  return (
    <div className='account'>
      <div className='account__symbol'>
        <i className='fa-solid fa-circle-user'></i>
        <h2>Tài Khoản</h2>
      </div>
      <div className='account__user'>
        <div
          className='account__user__img'
          onClick={() => isEditingPersonal && fileInputRef.current.click()}>
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
        <div className='account__information'>
          <div className='account__information__fix'>
            <h5>Thông tin cá nhân</h5>
            {isEditingPersonal ? (
              <div className='account__button'>
                <button
                  type='submit'
                  className='edit-button save'
                  disabled={isSubmitting || (!isDirty && !imageFile)}>
                  {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </button>
                <button type='button' className='edit-button cancel' onClick={handleCancelEdit}>
                  Hủy
                </button>
              </div>
            ) : (
              <span onClick={() => setIsEditingPersonal(true)} className='edit-span flex gap-1'>
                <Icon icon='iconamoon:edit-fill' width='20' height='20' /> <p>Chỉnh sửa</p>
              </span>
            )}
          </div>
          <div className='account__information__thongtin'>
            <div className='account__info-item'>
              <span>Họ đệm</span>
              {isEditingPersonal ? (
                <input type='text' {...register('firstName')} className='edit-input' />
              ) : (
                <span>{initialData.firstName || 'Trống'}</span>
              )}
              {errors.firstName && (
                <span className='error-message'>{errors.firstName.message}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Tên</span>
              {isEditingPersonal ? (
                <input type='text' {...register('lastName')} className='edit-input' />
              ) : (
                <span>{initialData.lastName || 'Trống'}</span>
              )}
              {errors.lastName && <span className='error-message'>{errors.lastName.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Khóa</span>
              {isEditingPersonal ? (
                <Controller
                  name='intake'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        value={field.value === null ? undefined : field.value}
                        placeholder='Chọn khóa'
                        options={intakeSelectOptions}
                        status={error ? 'error' : ''}
                        className='ant-select-custom'
                      />
                      {error && <p className='error-message'>{error.message}</p>}
                    </>
                  )}
                />
              ) : (
                <span>{initialData.intake || 'Trống'}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Tên tài khoản</span>
              {isEditingPersonal ? (
                <input type='text' {...register('username')} className='edit-input' />
              ) : (
                <span>{initialData.username || 'Trống'}</span>
              )}
              {errors.username && <span className='error-message'>{errors.username.message}</span>}
            </div>

            <div className='account__info-item'>
              <span>Giới tính</span>
              {isEditingPersonal ? (
                <Controller
                  name='gender'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        value={field.value === null ? undefined : field.value}
                        placeholder='Chọn giới tính'
                        options={[
                          { value: 'MALE', label: 'Nam' },
                          { value: 'FEMALE', label: 'Nữ' },
                          { value: 'OTHER', label: 'Khác' },
                        ]}
                        status={error ? 'error' : ''}
                        className='ant-select-custom'
                      />
                      {error && <p className='error-message'>{error.message}</p>}
                    </>
                  )}
                />
              ) : (
                <span>{translateGender(initialData.gender)}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Ngày sinh</span>
              {isEditingPersonal ? (
                <Controller
                  name='dateBirth'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <DatePicker
                        {...field}
                        format={DISPLAY_DATE_FORMAT}
                        placeholder='Chọn ngày sinh'
                        className='ant-picker-custom'
                        status={error ? 'error' : ''}
                      />
                      {error && <p className='error-message'>{error.message}</p>}
                    </>
                  )}
                />
              ) : (
                <span>{initialData.dateBirth ? formatDate(initialData.dateBirth) : 'Trống'}</span>
              )}
            </div>
            <div className='account__info-item'>
              <span>Email</span>
              {isEditingPersonal ? (
                <input type='text' {...register('email')} className='edit-input' />
              ) : (
                <span>{initialData.email || 'Trống'}</span>
              )}
              {errors.email && <span className='error-message'>{errors.email.message}</span>}
            </div>
            <div className='account__info-item'>
              <span>Số điện thoại</span>
              {isEditingPersonal ? (
                <input type='text' {...register('phoneNumber')} className='edit-input' />
              ) : (
                <span>{initialData.phoneNumber || 'Trống'}</span>
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
                <span>{initialData.studentCode || 'Trống'}</span>
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
          <span onClick={() => setShowPasswordPopup(true)} className='edit-span flex gap-1'>
            <Icon icon='iconamoon:edit-fill' width='20' height='20' /> <p>Chỉnh sửa</p>
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

export default AccountPage
