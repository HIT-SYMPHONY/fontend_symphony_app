import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classroomCreationSchema } from '../../../../utils/classroomValidate.js'
import { createClassroom } from '../../../../apis/classroom.api'
import { getLeaderList } from '../../../../apis/user.api'
import './style.scss'

const CreateOfClassAdmin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classroomCreationSchema),
  })

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [leaders, setLeaders] = useState([])
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await getLeaderList()
        setLeaders(response.data || [])
      } catch (err) {
        toast.error('Không thể tải danh sách leader.')
      }
    }
    fetchLeaders()
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép tệp hình ảnh.')
        return
      }
      setImageFile(file)
      // Clean up the previous preview URL to prevent memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    const createToast = toast.loading('Đang tạo lớp học...')

    const payload = {
      ...data,
      duration: parseInt(data.duration),
    }

    const formDataToSend = new FormData()
    formDataToSend.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formDataToSend.append('image', imageFile)
    }

    try {
      await createClassroom(formDataToSend)
      toast.success('Tạo lớp học thành công!', { id: createToast })
    } catch (err) {
      const message = err.response?.data?.message || 'Tạo lớp học thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: createToast,
      })
    } finally {
      setLoading(false)
    }
  }

  // Cleanup effect for the image preview URL when the component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  return (
    <div className='create-class-admin'>
      <div className='create-class-admin__header'>
        <i
          className='create-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(-1)}></i>
      </div>

      <div className='create-class-admin__content'>
        <div className='create-class-admin__content-title'>
          <i className='fa-solid fa-plus'></i>
          <h3>Tạo lớp học mới</h3>
        </div>
        <div className='create-class-admin__content-body'>
          <form
            className='create-class-admin__content-body__form'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='div'>
              <div className='create-class-admin__content-body__form-item'>
                <div>
                  <label htmlFor='name'>Tên lớp học</label>
                  <input type='text' {...register('name')} id='name' />
                  {errors.name && <p className='error-message'>{errors.name.message}</p>}
                </div>
                <div>
                  <label>Leader</label>
                  <select {...register('leaderId')}>
                    <option value=''>Chọn leader</option>
                    {leaders.map((leader) => (
                      <option key={leader.id} value={leader.id}>
                        {leader.fullName || leader.username}
                      </option>
                    ))}
                  </select>
                  {errors.leaderId && <p className='error-message'>{errors.leaderId.message}</p>}
                </div>
              </div>
              <div className='create-class-admin__content-body__form-table'>
                <div>
                  <div>
                    <label>Ngày bắt đầu</label>
                    <input type='date' {...register('startTime')} />
                    {errors.startTime && (
                      <p className='error-message'>{errors.startTime.message}</p>
                    )}
                  </div>
                  <div>
                    <label>Ngày kết thúc</label>
                    <input type='date' {...register('endTime')} />
                    {errors.endTime && <p className='error-message'>{errors.endTime.message}</p>}
                  </div>
                </div>
                <div>
                  <div>
                    <label>Độ dài lớp học (tuần)</label>
                    <input type='number' {...register('duration')} />
                    {errors.duration && <p className='error-message'>{errors.duration.message}</p>}
                  </div>
                  <div>
                    <label>Lịch học (VD: 18h-20h Thứ 4)</label>
                    <input type='text' {...register('timeSlot')} />
                    {errors.timeSlot && <p className='error-message'>{errors.timeSlot.message}</p>}
                  </div>
                </div>
              </div>

              <div className='create-class-admin__content-body__form-item'>
                {/* --- THE FIX IS HERE --- */}
                <div className='image-input-container'>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  {!imagePreview ? (
                    <div className='image-input' onClick={() => fileInputRef.current.click()}>
                      <Icon icon='ic:round-upload' className='upload-icon' width='24' height='24' />
                      <span>Tải ảnh lên</span>
                    </div>
                  ) : (
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='create-class-admin__content-body__preview mt-2'
                      onClick={() => fileInputRef.current.click()} // The image itself is now clickable
                    />
                  )}
                </div>
                <div>
                  <label>Mô tả</label>
                  <textarea {...register('description')}></textarea>
                </div>
              </div>
            </div>
            <div className='create-class-admin__content-button'>
              <button type='submit' disabled={loading}>
                {loading ? 'Đang tạo...' : 'Tạo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOfClassAdmin
