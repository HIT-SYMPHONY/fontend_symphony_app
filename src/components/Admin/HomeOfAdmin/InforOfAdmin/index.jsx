import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userUpdateSchema } from '../../../../utils/userValidate.js'
import { getUserById, updateUser, getUserClasses } from '../../../../apis/user.api'
import {
  formatDate,
  formatDateForAPI,
  translateGender,
  translateStatus,
} from '../../../../utils/formatters'
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
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
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

        const formattedData = {
          lastName: userData.lastName || '',
          firstName: userData.firstName || '',
          studentCode: userData.studentCode || '',
          email: userData.email || '',
          phoneNumber: userData.phoneNumber || '',
          intake: userData.intake || '',
          gender: userData.gender || '',
          dateBirth: userData.dateBirth || '',
        }

        setInitialData(formattedData)
        reset(formattedData)
      } catch (error) {
        toast.error('Không thể tải thông tin người dùng.')
      } finally {
        setLoading(false)
      }
    }
    fetchAllData()
  }, [userId, reset])

  const onSubmit = async (data) => {
    if (!isDirty) {
      toast.error('Không có thay đổi nào để lưu.')
      setIsEditing(false)
      return
    }
    const updateToast = toast.loading('Đang cập nhật...')
    const payload = { ...data }
    if (payload.dateBirth instanceof Date) {
      payload.dateBirth = formatDateForAPI(payload.dateBirth)
    } else if (!payload.dateBirth) {
      payload.dateBirth = null
    }
    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      const response = await updateUser(userId, formData)
      const updatedUserData = response.data
      const formattedData = {
        lastName: updatedUserData.lastName || '',
        firstName: updatedUserData.firstName || '',
        studentCode: updatedUserData.studentCode || '',
        email: updatedUserData.email || '',
        phoneNumber: updatedUserData.phoneNumber || '',
        intake: updatedUserData.intake || '',
        gender: updatedUserData.gender || '',
        dateBirth: updatedUserData.dateBirth || '',
      }
      setInitialData(formattedData)
      reset(formattedData)

      setIsEditing(false)
      toast.success('Cập nhật thành công!', { id: updateToast })
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(message, { id: updateToast })
    }
  }

  const handleCancel = () => {
    reset(initialData)
    setIsEditing(false)
  }
  const displayValue = (value) => value || 'N/A'

  if (loading) return <div>Đang tải...</div>
  if (!initialData) return <div>Không tìm thấy người dùng.</div>

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
                  <select {...register('gender')}>
                    <option value='MALE'>Nam</option>
                    <option value='FEMALE'>Nữ</option>
                    <option value='OTHER'>Khác</option>
                  </select>
                ) : (
                  <h4>{translateGender(initialData.gender)}</h4>
                )}
              </div>
              <div className='inforofadmin__context__list__box__item'>
                <span>Ngày sinh</span>
                {isEditing ? (
                  <input type='date' {...register('dateBirth')} />
                ) : (
                  <h4>{initialData.dateBirth ? formatDate(initialData.dateBirth) : 'N/A'}</h4>
                )}
                {errors.dateBirth && (
                  <span className='error-message'>{errors.dateBirth.message}</span>
                )}
              </div>
              <div style={{ flex: 1 }}></div>
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
                <div className='inforofadmin__class__list__item__img'></div>
                <div className='inforofadmin__class__list__item__box'>
                  <div className='inforofadmin__class__list__item__box__start'>
                    <h4>{item.name}</h4>
                    <span className={item.status === 'COMPLETED' ? 'span2' : 'span1'}>
                      {translateStatus(item.status)}
                    </span>
                  </div>
                  <span>Xem chi tiết</span>
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
