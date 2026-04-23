import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { Select, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
import { getLeaderList } from '../../../../apis/user.api'
import { formatDate, getDisplayName } from '../../../../utils/formatters'
import { competitionUpdateSchema } from '../../../../utils/competitionValidate.js'
import useOnClickOutside from '../../../../hooks/useOnClickOutside'
import TextMessage from '../../../TextMessage'
import TiptapEditor from '../../../TiptapEditor'
import { DISPLAY_DATETIME_FORMAT, API_DATETIME_FORMAT } from 'constants/commonConstant.js'
import './style.scss'
import { useQueryClient } from '@tanstack/react-query'
import { competitionKeys } from 'constants/queryKeys'

const EditorPlaceholder = () => <div className='editor-placeholder'>Loading Editor...</div>

const EditorPlaceholder = () => <div className='editor-placeholder'>Loading Editor...</div>

const IntroOfCompetAdmin = () => {
  const { competitionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [information, setInformation] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [leaders, setLeaders] = useState([])
  const fileInputRef = useRef(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Giới thiệu')
  const dropdownRef = useRef(null)

  const linkOptions = [
    { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
  ]

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(competitionUpdateSchema),
    mode: 'onTouched',
  })

  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const leaderOptions = useMemo(() => {
    return leaders.map((leader) => ({
      value: leader.id,
      label: `${getDisplayName(leader)} (${leader.studentCode})`,
    }))
  }, [leaders])

  const processAndSetData = useCallback(
    (competitionData, leaderList) => {
      const currentLeader = leaderList.find((l) => l.id === competitionData.competitionLeaderId)
      const displayData = {
        ...competitionData,
        leaderName: currentLeader ? getDisplayName(currentLeader) : 'Chưa có leader',
      }
      setInformation(displayData)

      const safeParse = (jsonString) => {
        try {
          return jsonString ? JSON.parse(jsonString) : null
        } catch (e) {
          return null
        }
      }

      const formData = {
        name: competitionData.name || '',
        competitionLeaderId: competitionData.competitionLeaderId || null,
        startTime: competitionData.startTime ? dayjs(competitionData.startTime) : null,
        endTime: competitionData.endTime ? dayjs(competitionData.endTime) : null,
        description: safeParse(competitionData.description),
        content: safeParse(competitionData.content),
        rule: safeParse(competitionData.rule),
      }
      reset(formData)
      setPreviewUrl(competitionData.image)
    },
    [reset],
  )

  const fetchData = useCallback(async () => {
    try {
      const [competitionRes, leadersRes] = await Promise.all([
        getCompetitionById(competitionId),
        getLeaderList(),
      ])
      const leaderList = leadersRes.data || []
      setLeaders(leaderList)
      processAndSetData(competitionRes.data, leaderList)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
      navigate('/admin/competitions')
    }
  }, [competitionId, processAndSetData, navigate])

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
    const updateToast = toast.loading('Đang cập nhật...')
    const payload = {
      name: data.name,
      competitionLeaderId: data.competitionLeaderId,
      startTime: data.startTime ? data.startTime.format(API_DATETIME_FORMAT) : null,
      endTime: data.endTime ? data.endTime.format(API_DATETIME_FORMAT) : null,
      description: data.description ? JSON.stringify(data.description) : '',
      rule: data.rule ? JSON.stringify(data.rule) : '',
      content: data.content ? JSON.stringify(data.content) : '',
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await updateCompetition(competitionId, formData)
      processAndSetData(response.data, leaders)
      toast.success('Cập nhật thành công!', { id: updateToast })
      setIsEditing(false)
      setImageFile(null)
      queryClient.invalidateQueries({ queryKey: competitionKeys.detail(competitionId) })
      queryClient.invalidateQueries({ queryKey: competitionKeys.lists() })
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: updateToast,
      })
    }
  }

  const handleCancelEdit = () => {
    processAndSetData(information, leaders)
    setImageFile(null)
    setIsEditing(false)
  }

  const handleOption = (item) => {
    setSelectedClass(item.option)
    setIsDropdownOpen(false)
    navigate(item.link)
  }

  if (!information) {
    return <TextMessage text='Đang tải dữ liệu cuộc thi...' />
  }

  return (
    <div className='intro-compet-admin'>
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
          onClick={() => navigate('/admin/competitions/create')}>
          <i className='fa-solid fa-plus'></i> Tạo mới
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='intro-compet-admin__context'>
        <div className='intro-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Giới thiệu</h2>
        </div>
        <div className='intro-compet-admin__context-enter'>
          <div className='intro-compet-admin__context-enter__left'>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên cuộc thi</span>
              {isEditing ? (
                <>
                  <input
                    type='text'
                    {...register('name')}
                    className={`intro-compet-admin__input ${errors.name ? 'input-error' : ''}`}
                  />
                  {errors.name && <p className='error-message'>{errors.name.message}</p>}
                </>
              ) : (
                <h5>{information.name}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên leader</span>
              {isEditing ? (
                <Controller
                  name='competitionLeaderId'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        placeholder='-- Chọn người phụ trách --'
                        options={leaderOptions}
                        listHeight={200}
                        status={error ? 'error' : ''}
                        className='ant-select-custom'
                      />
                      {error && <p className='error-message'>{error.message}</p>}
                    </>
                  )}
                />
              ) : (
                <h5>{information.leaderName}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày giờ bắt đầu</span>
              {isEditing ? (
                <Controller
                  name='startTime'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <DatePicker
                        {...field}
                        showTime
                        format={DISPLAY_DATETIME_FORMAT}
                        placeholder='Chọn ngày giờ'
                        className='ant-picker-custom'
                        status={error ? 'error' : ''}
                      />
                      {error && <p className='error-message'>{errors.error?.message}</p>}
                    </>
                  )}
                />
              ) : (
                <h5>{formatDate(information.startTime)}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày giờ kết thúc</span>
              {isEditing ? (
                <Controller
                  name='endTime'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <DatePicker
                        {...field}
                        showTime
                        format={DISPLAY_DATETIME_FORMAT}
                        placeholder='Chọn ngày giờ'
                        className='ant-picker-custom'
                        status={error ? 'error' : ''}
                      />
                      {error && <p className='error-message'>{error.message}</p>}
                    </>
                  )}
                />
              ) : (
                <h5>{formatDate(information.endTime)}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ảnh bìa</span>
              <img
                src={previewUrl}
                alt={information.name}
                className='intro-compet-admin__image-preview'
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/default-placeholder.png'
                }}
              />
              {isEditing && (
                <>
                  <button
                    type='button'
                    className='intro-compet-admin__image-button'
                    onClick={() => fileInputRef.current?.click()}>
                    <Icon icon='material-symbols:upload' />
                    Tải ảnh lên
                  </button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept='image/png, image/jpeg, image/jpg'
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </div>
          </div>

          <div className='intro-compet-admin__context-enter__right'>
            <span>Mô tả</span>
            {isEditing ? (
              <Suspense fallback={<EditorPlaceholder />}>
                <Controller
                  name='description'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                  )}
                />
              </Suspense>
            ) : (
              <div className='description-display'>
                <TiptapEditor value={information.description} editable={false} />
              </div>
            )}

            <span>Nội dung</span>
            {isEditing ? (
              <Suspense fallback={<EditorPlaceholder />}>
                <Controller
                  name='content'
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TiptapEditor value={field.value} onChange={field.onChange} error={error} />
                  )}
                />
              </Suspense>
            ) : (
              <div className='description-display'>
                <TiptapEditor value={information.content} editable={false} />
              </div>
            )}
          </div>
        </div>
        <div className='intro-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button type='submit' disabled={isSubmitting || (!isDirty && !imageFile)}>
                <Icon icon='material-symbols:save' width='20' height='20' />{' '}
                {isSubmitting ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button type='button' onClick={handleCancelEdit}>
                <Icon icon='material-symbols:cancel' width='20' height='20' /> Hủy
              </button>
            </>
          ) : (
            <button type='button' onClick={() => setIsEditing(true)}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default IntroOfCompetAdmin
