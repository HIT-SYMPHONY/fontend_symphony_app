import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { userUpdateSchema } from '../../../../utils/userValidate.js'
import { getUserById, updateUser, getUserClasses, resetPassword } from '../../../../apis/user.api'
import { formatDate, translateGender, translateStatus } from '../../../../utils/formatters'
import { DISPLAY_DATE_FORMAT, API_DATE_FORMAT } from '../../../../constants/commonConstant'
import TextMessage from '../../../TextMessage'
import './style.scss'

const InforOfAdmin = () => {
  const navigate = useNavigate()
  const { userId } = useParams()

  const [initialData, setInitialData] = useState(null)
  const [userClasses, setUserClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    control, // <-- Need 'control' for Controller
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
    mode: 'onTouched',
  })

  useEffect(() => {
    if (!userId) return

    const fetchAllData = async () => {
      try {
        setLoading(true)
        const [userResponse, classesResponse] = await Promise.all([
          getUserById(userId),
          getUserClasses(userId),
        ])

        const userData = userResponse.data
        setUserClasses(classesResponse.data || [])
        setInitialData(userData)
        const formattedDataForForm = {
          lastName: userData.lastName || '',
          firstName: userData.firstName || '',
          studentCode: userData.studentCode || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          intake: userData.intake || '',
          gender: userData.gender || null,
          dateBirth: userData.dateBirth ? dayjs(userData.dateBirth) : null,
        }
        reset(formattedDataForForm)
      } catch (error) {
        toast.error('Không thể tải thông tin người dùng.')
      } finally {
        setLoading(false)
      }
    }
    fetchAllData()
  }, [userId, reset])

  const onSubmit = async (data) => {
    const updateToast = toast.loading('Đang cập nhật...')
    const payload = {
      ...data,
      dateBirth: data.dateBirth ? data.dateBirth.format(API_DATE_FORMAT) : null,
    }
    console.log(payload)

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      const response = await updateUser(userId, formData)
      console.log('day la response', response)
      const updatedUserData = response.data

      setInitialData(updatedUserData)
      const formattedDataForForm = {
        lastName: updatedUserData.lastName || '',
        firstName: updatedUserData.firstName || '',
        studentCode: updatedUserData.studentCode || '',
        email: updatedUserData.email || '',
        phoneNumber: updatedUserData.phoneNumber || '',
        intake: updatedUserData.intake || '',
        gender: updatedUserData.gender || null,
        dateBirth: updatedUserData.dateBirth ? dayjs(updatedUserData.dateBirth) : null,
      }
      reset(formattedDataForForm)

      setIsEditing(false)
      toast.success('Cập nhật thành công!', { id: updateToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(message, { id: updateToast })
    }
  }

  const handleCancel = () => {
    const formattedDataForForm = {
      lastName: initialData.lastName || '',
      firstName: initialData.firstName || '',
      studentCode: initialData.studentCode || '',
      email: initialData.email || '',
      phoneNumber: initialData.phoneNumber || '',
      intake: initialData.intake || '',
      gender: initialData.gender || null,
      dateBirth: initialData.dateBirth ? dayjs(initialData.dateBirth) : null,
    }
    reset(formattedDataForForm)
    setIsEditing(false)
  }

  const handleResetPassword = async () => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn reset mật khẩu cho người dùng ${initialData.lastName} ${initialData.firstName}?`,
      )
    ) {
      return
    }
    const resetToast = toast.loading('Đang reset mật khẩu...')
    try {
      const response = await resetPassword(userId)
      console.log(response)
      const newPassword = response.data.newPassword
      toast.success(`Reset mật khẩu thành công! Mật khẩu mới là ${newPassword}`, {
        id: resetToast,
        duration: 10000,
      })
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi reset mật khẩu'
      toast.error(message, { id: resetToast })
    }
  }

  const displayValue = (value) => value || 'N/A'

  if (loading) return <TextMessage></TextMessage>
  if (!initialData) return <TextMessage text='Không tìm thấy người dùng.'></TextMessage>

  return (
    <div className='inforofadmin'>
      <div className='inforofadmin__title'>
        <Icon
          icon='material-symbols:arrow-back-rounded'
          width='32'
          height='32'
          className='inforofadmin__title__icon'
          onClick={() => navigate('/admin/home')}
        />
        <i className='fa-solid fa-circle-user inforofadmin__title__i'></i>
        <h2>Thông tin tài khoản</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='inforofadmin__context'>
          <h3>Thông tin cá nhân</h3>
          <div className='inforofadmin__context__list'>
            <div className='inforofadmin__context__list__box'>
              <div className='inforofadmin__context__list__box__item'>
                <span>Họ đệm</span>
                {isEditing ? (
                  <input type='text' {...register('lastName')} />
                ) : (
                  <h4>{displayValue(initialData.lastName)}</h4>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Mã sinh viên</span>
                {isEditing ? (
                  <input type='text' {...register('studentCode')} />
                ) : (
                  <h4>{displayValue(initialData.studentCode)}</h4>
                )}
                {errors.studentCode && (
                  <span className='error-message'>{errors.studentCode.message}</span>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Email</span>
                {isEditing ? (
                  <input type='email' {...register('email')} />
                ) : (
                  <h4>{displayValue(initialData.email)}</h4>
                )}
                {errors.email && <span className='error-message'>{errors.email.message}</span>}
              </div>
            </div>
            <div className='inforofadmin__context__list__box'>
              <div className='inforofadmin__context__list__box__item'>
                <span>Tên</span>
                {isEditing ? (
                  <input type='text' {...register('firstName')} />
                ) : (
                  <h4>{displayValue(initialData.firstName)}</h4>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Số điện thoại</span>
                {isEditing ? (
                  <input type='text' {...register('phoneNumber')} />
                ) : (
                  <h4>{displayValue(initialData.phoneNumber)}</h4>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Khoa</span>
                {isEditing ? (
                  <input type='text' {...register('intake')} />
                ) : (
                  <h4>{displayValue(initialData.intake)}</h4>
                )}
              </div>
            </div>
            <div className='inforofadmin__context__list__box'>
              <div className='inforofadmin__context__list__box__item'>
                <span>Giới tính</span>
                {isEditing ? (
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
                  <h4>{translateGender(initialData.gender)}</h4>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Ngày sinh</span>
                {isEditing ? (
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
                          allowClear={false}
                        />
                        {error && <p className='error-message'>{error.message}</p>}
                      </>
                    )}
                  />
                ) : (
                  <h4>{initialData.dateBirth ? formatDate(initialData.dateBirth) : 'N/A'}</h4>
                )}
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
          <h3>Thống tin tài khoản</h3>
          <div className='inforofadmin__context__list inforofadmin__horizontal-list'>
            <div className='inforofadmin__context__list__box inforofadmin__horizontal-list-box'>
              <div className='inforofadmin__context__list__box__item'>
                <span>Tên đăng nhập</span>
                <h4>{displayValue(initialData.studentCode)}</h4>
              </div>
            </div>
            <div className='inforofadmin__context__list__box inforofadmin__horizontal-list-box'>
              <div className='inforofadmin__context__list__box__item'>
                <span>Mật khẩu</span>
                <div className='inforofadmin__reset-wrap'>
                  <h4>{'*'.repeat(8)}</h4>
                  {!isEditing && (
                    <div className='inforofadmin__reset-button' onClick={handleResetPassword}>
                      Reset
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='inforofadmin__context__button'>
            {isEditing ? (
              <>
                <button type='submit'>
                  <Icon icon='material-symbols:save' width='20' height='20' />
                  Lưu
                </button>
                <button type='button' onClick={handleCancel}>
                  <Icon icon='material-symbols:cancel' width='20' height='20' />
                  Hủy
                </button>
              </>
            ) : (
              <span onClick={() => setIsEditing(true)} className='edit-span'>
                <Icon icon='iconamoon:edit-fill' width='20' height='20' />
                Chỉnh sửa
              </span>
            )}
          </div>
        </div>
      </form>

      <div className='inforofadmin__class'>
        <h3>Danh sách lớp học</h3>
        <div className='inforofadmin__class__list'>
          {userClasses.length > 0 ? (
            userClasses.map((item, index) => (
              <div className='inforofadmin__class__list__item' key={index}>
                <div className='inforofadmin__class__list__item__img'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className='inforofadmin__class__list__item__box'>
                  <div className='inforofadmin__class__list__item__box__start'>
                    <h4>{item.name}</h4>
                    <span className={item.status === 'COMPLETED' ? 'span2' : 'span1'}>
                      {translateStatus(item.status)}
                    </span>
                  </div>
                  <span onClick={() => navigate(`/admin/users/${userId}/classes/${item.id}`)}>
                    Xem chi tiết
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>Người dùng chưa tham gia lớp học nào.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InforOfAdmin
