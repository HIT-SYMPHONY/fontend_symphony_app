import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Select, DatePicker } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { classroomCreationSchema } from '../../../../utils/classroomValidate.js'
import { createClassroom } from '../../../../apis/classroom.api'
import { getLeaderList } from '../../../../apis/user.api'

import './style.scss'
import { getDisplayName } from 'utils/formatters.js'
import { DISPLAY_DATE_FORMAT, API_DATE_FORMAT } from 'constants/commonConstant.js'
import EditorPlaceholder from 'components/EditorPlaceHolder/index.jsx'
import { useQueryClient } from '@tanstack/react-query'
import { classroomKeys } from 'constants/queryKeys.js'
const TiptapEditor = React.lazy(() => import('../../../TiptapEditor'))
const CreateOfClassAdmin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(classroomCreationSchema),
    mode: 'onTouched',
  })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [leaders, setLeaders] = useState([])
  const fileInputRef = useRef(null)
  const queryClient = useQueryClient()

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

  const leaderOptions = useMemo(() => {
    return leaders.map((leader) => ({
      value: leader.id,
      label: `${getDisplayName(leader) || leader.username} (${leader.studentCode})`,
    }))
  }, [leaders])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép tệp hình ảnh.')
        return
      }
      setImageFile(file)
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    const createToast = toast.loading('Đang tạo lớp học...')
    const payload = {
      name: data.name,
      leaderId: data.leaderId,
      duration: parseInt(data.duration),
      timeSlot: data.timeSlot,
      startTime: data.startTime ? data.startTime.format(API_DATE_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_DATE_FORMAT) : null,
      description: data.description ? JSON.stringify(data.description) : '',
    }

    const formDataToSend = new FormData()
    formDataToSend.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formDataToSend.append('image', imageFile)
    }

    try {
      await createClassroom(formDataToSend)
      toast.success('Tạo lớp học thành công!', { id: createToast })
      queryClient.invalidateQueries({ queryKey: classroomKeys.lists() })
      queryClient.invalidateQueries({ queryKey: classroomKeys.summaries() });
      navigate('/admin/classes')
    } catch (err) {
      const message = err.response?.data?.message || 'Tạo lớp học thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: createToast,
      })
    }
  }

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
                  <Controller
                    name='leaderId'
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select
                          {...field}
                          placeholder='Chọn leader'
                          options={leaderOptions}
                          listHeight={150}
                          status={error ? 'error' : ''}
                          className='ant-select-custom'
                        />
                        {error && <p className='error-message'>{error.message}</p>}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className='create-class-admin__content-body__form-table'>
                <div>
                  <div>
                    <label>Ngày bắt đầu</label>
                    <Controller
                      name='startTime'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DatePicker
                            {...field}
                            format={DISPLAY_DATE_FORMAT}
                            placeholder='Chọn ngày bắt đầu'
                            className='ant-picker-custom'
                            status={error ? 'error' : ''}
                          />
                          {error && <p className='error-message'>{error.message}</p>}
                        </>
                      )}
                    />
                  </div>
                  <div>
                    <label>Ngày kết thúc</label>
                    <Controller
                      name='endTime'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <>
                          <DatePicker
                            {...field}
                            format={DISPLAY_DATE_FORMAT}
                            placeholder='Chọn ngày kết thúc'
                            className='ant-picker-custom'
                            status={error ? 'error' : ''}
                          />
                          {error && <p className='error-message'>{error.message}</p>}
                        </>
                      )}
                    />
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

              <div className='create-class-admin__content-body__form-item image-container'>
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
                      onClick={() => fileInputRef.current.click()}
                    />
                  )}
                </div>
                <div>
                  <label>Mô tả</label>
                  <Suspense fallback={<EditorPlaceholder />}>
                    <Controller
                      name='description'
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                      )}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
            <div className='create-class-admin__content-button'>
              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Đang tạo...' : 'Tạo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOfClassAdmin
