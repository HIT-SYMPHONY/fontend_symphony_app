import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
import { getAllUsers } from '../../../../apis/user.api'
import { formatDate } from '../../../../utils/formatters'
import { competitionCreationSchema } from '../../../../utils/competitionValidate.js'
import useOnClickOutside from '../../../../hooks/useOnClickOutside' // Assuming path
import './style.scss'

const IntroOfCompetAdmin = () => {
  const { competitionId } = useParams()
  const navigate = useNavigate()

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
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: yupResolver(competitionCreationSchema),
    mode: 'onTouched',
  })

  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const processAndSetData = useCallback(
    (competitionData, leaderList) => {
      const currentLeader = leaderList.find((l) => l.id === competitionData.competitionLeaderId)

      const formattedData = {
        name: competitionData.name || '',
        competitionLeaderId: competitionData.competitionLeaderId || '',
        startDay: competitionData.startTime ? competitionData.startTime.split('T')[0] : '',
        endDay: competitionData.endTime ? competitionData.endTime.split('T')[0] : '',
        description: competitionData.description || '',
        content: competitionData.content || '',
        rule: competitionData.rule || '',
        leaderName: currentLeader?.fullName || 'Chưa có leader',
        image: competitionData.image,
      }

      setInformation(formattedData)
      reset(formattedData)
      setPreviewUrl(formattedData.image)
    },
    [reset],
  )

  const fetchData = useCallback(async () => {
    try {
      // Optimized: Fetch competition and only users with LEADER role
      const [competitionRes, leadersRes] = await Promise.all([
        getCompetitionById(competitionId),
        getAllUsers({ role: 'LEADER' }),
      ])

      const leaderList = leadersRes.data?.items || []
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
      description: data.description,
      content: data.content,
      rule: data.rule,
      startTime: `${data.startDay}T00:00:00Z`,
      endTime: `${data.endDay}T23:59:59Z`,
      competitionLeaderId: data.competitionLeaderId,
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
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: updateToast,
      })
    }
  }

  const handleCancelEdit = () => {
    reset(information)
    setPreviewUrl(information.image)
    setImageFile(null)
    setIsEditing(false)
  }

  const handleOption = (item) => {
    setSelectedClass(item.option)
    setIsDropdownOpen(false)
    navigate(item.link)
  }

  if (!information) {
    return <div>Đang tải dữ liệu cuộc thi...</div>
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
                <>
                  <select
                    {...register('competitionLeaderId')}
                    className={`intro-compet-admin__input ${
                      errors.competitionLeaderId ? 'input-error' : ''
                    }`}>
                    <option value=''>-- Chọn người phụ trách --</option>
                    {leaders.map((leader) => (
                      <option key={leader.id} value={leader.id}>
                        {leader.fullName || leader.username}
                      </option>
                    ))}
                  </select>
                  {errors.competitionLeaderId && (
                    <p className='error-message'>{errors.competitionLeaderId.message}</p>
                  )}
                </>
              ) : (
                <h5>{information.leaderName}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày bắt đầu</span>
              {isEditing ? (
                <>
                  <input
                    type='date'
                    {...register('startDay')}
                    className={`intro-compet-admin__input ${errors.startDay ? 'input-error' : ''}`}
                  />
                  {errors.startDay && <p className='error-message'>{errors.startDay.message}</p>}
                </>
              ) : (
                <h5>{formatDate(information.startDay)}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày kết thúc</span>
              {isEditing ? (
                <>
                  <input
                    type='date'
                    {...register('endDay')}
                    className={`intro-compet-admin__input ${errors.endDay ? 'input-error' : ''}`}
                  />
                  {errors.endDay && <p className='error-message'>{errors.endDay.message}</p>}
                </>
              ) : (
                <h5>{formatDate(information.endDay)}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ảnh bìa</span>
              <img
                src={previewUrl}
                alt='Xem trước ảnh bìa'
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
              <>
                <textarea
                  {...register('description')}
                  className={`intro-compet-admin__context-enter__right-textarea ${
                    errors.description ? 'input-error' : ''
                  }`}
                  rows={4}
                />
                {errors.description && (
                  <p className='error-message'>{errors.description.message}</p>
                )}
              </>
            ) : (
              <h5 className='description-text'>{information.description || 'Chưa có mô tả.'}</h5>
            )}

            <span>Nội dung</span>
            {isEditing ? (
              <>
                <textarea
                  {...register('content')}
                  className={`intro-compet-admin__context-enter__right-textarea ${
                    errors.content ? 'input-error' : ''
                  }`}
                  rows={8}
                />
                {errors.content && <p className='error-message'>{errors.content.message}</p>}
              </>
            ) : (
              <h5>{information.content}</h5>
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
