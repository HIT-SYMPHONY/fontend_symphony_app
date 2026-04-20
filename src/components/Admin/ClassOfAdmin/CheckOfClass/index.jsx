import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { getClassroomById, updateClassroom } from '../../../../apis/classroom.api'
import { getLeaderList } from '../../../../apis/user.api'
import { formatDate, safeParse } from '../../../../utils/formatters'
import { classroomUpdateSchema } from '../../../../utils/classroomValidate.js'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import TextMessage from '../../../TextMessage'
import { DISPLAY_DATE_FORMAT, API_DATE_FORMAT } from '../../../../constants/commonConstant.js'
import './style.scss'
import TiptapEditor from '../../../TiptapEditor/index.jsx'
import { useQueryClient } from '@tanstack/react-query'

const CheckOfClassAdmin = () => {
  const navigate = useNavigate()
  const { classId } = useParams()
  const queryClient = useQueryClient()
  const [information, setInformation] = useState(null)
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông tin lớp học')
  const dropdownRef = useRef(null)

  const linkOptions = [
    { option: 'Thông tin lớp học', link: `/admin/classes/${classId}` },
    { option: 'Quản lý thành viên', link: `/admin/classes/${classId}/members` },
  ]

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(classroomUpdateSchema),
    mode: 'onTouched',
  })

  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const leaderOptions = useMemo(() => {
    return leaders.map((leader) => ({
      value: leader.id,
      label: `${leader.fullName || leader.username} (${leader.studentCode})`,
    }))
  }, [leaders])

  const processAndSetData = useCallback(
    (classData, leaderList) => {
      setLeaders(leaderList)
      setInformation(classData)
      setPreviewUrl(classData.image)
      const displayData = {
        ...classData,
        description: safeParse(classData.description), 
      }
      const formData = {
        name: classData.name || '',
        leaderId: classData.leaderId || '',
        startTime: classData.startTime ? dayjs(classData.startTime) : null,
        endTime: classData.endTime ? dayjs(classData.endTime) : null,
        duration: classData.duration || '',
        description: displayData.description,
        timeSlot: classData.timeSlot || '',
      }
      reset(formData)
    },
    [reset],
  )

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [classRes, leadersRes] = await Promise.all([getClassroomById(classId), getLeaderList()])
      processAndSetData(classRes.data, leadersRes.data || [])
    } catch (err) {
      toast.error('Không thể tải dữ liệu lớp học.')
      navigate('/admin/classes')
    } finally {
      setLoading(false)
    }
  }, [classId, navigate, processAndSetData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    const saveToast = toast.loading('Đang cập nhật...')
    const payload = {
      name: data.name || '',
      leaderId: data.leaderId || '',
      startTime: data.startTime ? data.startTime.format(API_DATE_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_DATE_FORMAT) : null,
      duration: parseInt(data.duration),
      description: data.description ? JSON.stringify(data.description) : '',
      timeSlot: data.timeSlot || '',
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      await updateClassroom(classId, formData)
      toast.success('Cập nhật thành công!', { id: saveToast })
      setIsEditing(false)
      queryClient.invalidateQueries({ queryKey: classroomKeys.detail(classId) })
      queryClient.invalidateQueries({ queryKey: classroomKeys.lists() })
      queryClient.invalidateQueries({ queryKey: classroomKeys.summaries() });
      await fetchData()
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: saveToast,
      })
    }
  }

  const handleCancel = () => {
    processAndSetData(information, leaders)
    setImageFile(null)
    setIsEditing(false)
  }

  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  if (loading || !information) {
    return <TextMessage text={'Đang tải thông tin lớp học...'} />
  }
  return (
    <div className='check-class-admin'>
      <div className='intro-compet-admin__header'>
        <i
          className='intro-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competitions')}></i>
        <div
          className='intro-compet-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='28'
            height='28'
            className='intro-compet-admin__filter-icon'
          />
          <div className='intro-compet-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='intro-compet-admin__filter-icon'
          />
          {isDropdownOpen && (
            <div className='intro-compet-admin__dropdown'>
              {linkOptions.map((item, index) => (
                <div
                  key={index}
                  className='check-class-admin__dropdown-item'
                  onClick={() => handleOption(item)}>
                  {item.option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='intro-compet-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='intro-compet-admin__search-input'
          />
          <i className='intro-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='intro-compet-admin__create-button'
          onClick={() => navigate('/admin/classes/create')}>
          <i className='fa-solid fa-plus'></i> Tạo mới
        </button>
      </div>
      <div className='check-class-admin__content'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='check-class-admin__content-header'>
            <div className='check-class-admin__content-header-title'>
              <i className='fa-solid fa-circle-info'></i>
              <h3>Thông tin lớp học</h3>
            </div>
            <div className='check-class-admin__content-header-body'>
              <div
                className='check-class-admin__content-header-body__infor'
                onClick={() => isEditing && fileInputRef.current.click()}>
                {previewUrl ? (
                  <img src={previewUrl} alt='Class preview' className='class-image-preview' />
                ) : (
                  <Icon icon='ic:round-upload' width='24' height='24' />
                )}
                <p>{isEditing ? 'Thay đổi ảnh' : 'Ảnh lớp'}</p>
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept='image/*'
                />
              </div>
              <div className='check-class-admin__content-header-body__form'>
                <div className='check-class-admin__content-header-body__form-item'>
                  <div>
                    <span>Tên lớp học</span>
                    {isEditing ? (
                      <>
                        <input
                          type='text'
                          {...register('name')}
                          className='check-class-admin__input'
                        />
                        {errors.name && <p className='error-message'>{errors.name.message}</p>}
                      </>
                    ) : (
                      <h5>{information.name}</h5>
                    )}
                  </div>
                  <div>
                    <span>Leader</span>
                    {isEditing ? (
                      <>
                        <Controller
                          name='leaderId'
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <Select
                                {...field}
                                placeholder='-- Chọn Leader --'
                                options={leaderOptions}
                                listHeight={150}
                                status={error ? 'error' : ''}
                              />
                              {error && <p className='error-message'>{error.message}</p>}
                            </>
                          )}
                        />
                      </>
                    ) : (
                      <h5>{information.leaderName}</h5>
                    )}
                  </div>
                </div>
                <div className='check-class-admin__content-header-body__form-table'>
                  <div>
                    <span>Ngày bắt đầu</span>
                    {isEditing ? (
                      <>
                        <Controller
                          name='startTime'
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePicker
                                {...field}
                                format={DISPLAY_DATE_FORMAT}
                                placeholder='Chọn ngày bắt đầu'
                                status={error ? 'error' : ''}
                                allowClear={false}
                              />
                              {error && <p className='error-message'>{error.message}</p>}
                            </>
                          )}
                        />
                      </>
                    ) : (
                      <h5>{formatDate(information.startTime)}</h5>
                    )}
                  </div>
                  <div>
                    <span>Ngày kết thúc</span>
                    {isEditing ? (
                      <>
                        <Controller
                          name='endTime'
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <>
                              <DatePicker
                                {...field}
                                format={DISPLAY_DATE_FORMAT}
                                placeholder='Chọn ngày kết thúc'
                                status={error ? 'error' : ''}
                                allowClear={false}
                              />
                              {error && <p className='error-message'>{error.message}</p>}
                            </>
                          )}
                        />
                      </>
                    ) : (
                      <h5>{formatDate(information.endTime)}</h5>
                    )}
                  </div>
                  <div>
                    <span>Độ dài lớp học (tuần)</span>
                    {isEditing ? (
                      <>
                        <input
                          type='number'
                          {...register('duration')}
                          className='check-class-admin__input'
                        />
                        {errors.duration && (
                          <p className='error-message'>{errors.duration.message}</p>
                        )}
                      </>
                    ) : (
                      <h5>{information.duration}</h5>
                    )}
                  </div>
                  <div>
                    <span>Lịch học</span>
                    {isEditing ? (
                      <>
                        <input
                          type='text'
                          {...register('timeSlot')}
                          className='check-class-admin__input'
                        />
                        {errors.timeSlot && (
                          <p className='error-message'>{errors.timeSlot.message}</p>
                        )}
                      </>
                    ) : (
                      <h5>{information.timeSlot}</h5>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='check-class-admin__content-header-mota'>
              <span>Mô tả:</span>
              {isEditing ? (
                <Controller
                  name='description'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                  )}
                />
              ) : (
                <div className='description-display'>
                  <TiptapEditor value={information.description} editable={false} />
                </div>
              )}
            </div>
          </div>
          <div className='check-class-admin__content-button'>
            {isEditing ? (
              <>
                <button type='submit' disabled={isSubmitting || (!isDirty && !imageFile)}>
                  {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </button>
                <button type='button' onClick={handleCancel}>
                  Hủy
                </button>
              </>
            ) : (
              <button type='button' onClick={() => setIsEditing(true)}>
                Chỉnh sửa
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckOfClassAdmin
