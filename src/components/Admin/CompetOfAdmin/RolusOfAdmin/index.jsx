import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { getCompetitionById, updateCompetition } from 'apis/competition.api'
import TextMessage from 'components/TextMessage'
import TiptapEditor from 'components/TiptapEditor'
import { safeParse } from 'utils/formatters'
import './style.scss'
import useOnClickOutside from 'hooks/useOnClickOutside'

const RulesOfManageCompet = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const [information, setInformation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thể lệ')
  const dropdownRef = useRef(null)

  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
  ]

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({})

  useOnClickOutside([dropdownRef], () => setIsDropdownOpen(false))

  const processAndSetData = useCallback(
    (competitionData) => {
      const displayData = {
        ...competitionData,
        rule: safeParse(competitionData.rule),
      }
      setInformation(displayData)
      reset({
        rule: displayData.rule,
      })
    },
    [reset],
  )

  const fetchData = useCallback(async () => {
    if (!competitionId) return
    try {
      setLoading(true)
      const response = await getCompetitionById(competitionId)
      processAndSetData(response.data)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
    } finally {
      setLoading(false)
    }
  }, [competitionId, processAndSetData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const onSubmit = async (data) => {
    const saveToast = toast.loading('Đang lưu thể lệ...')
    const payload = {
      ...information,
      rule: data.rule ? JSON.stringify(data.rule) : '',
    }
    console.log(payload)
    delete payload.id
    delete payload.status
    delete payload.createdAt
    delete payload.leaderName

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      const response = await updateCompetition(competitionId, formData)
      toast.success('Cập nhật thể lệ thành công!', { id: saveToast })
      setIsEditing(false)
      processAndSetData(response.data)
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      const errorMessage = typeof message === 'object' ? Object.values(message).join('\n') : message
      toast.error(errorMessage, { id: saveToast })
    }
  }

  const handleCancel = () => {
    processAndSetData(information)
    setIsEditing(false)
  }

  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  if (loading) return <TextMessage text='Đang tải thể lệ cuộc thi...' />
  if (!information) return <TextMessage text='Không tìm thấy thông tin cuộc thi.' />
  return (
    <div className='rolus-compet-admin'>
      <div className='rolus-compet-admin__header'>
        <i
          className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(-1)}></i>
        <div
          className='rolus-compet-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='rolus-compet-admin__filter-icon'
          />
          <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='rolus-compet-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='rolus-compet-admin__dropdown'>
              {classOptions.map((item, index) => (
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
        <div className='rolus-compet-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='rolus-compet-admin__search-input'
          />
          <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='rolus-compet-admin__create-button'
          onClick={() => navigate('/client/manage/competitions/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='rolus-compet-admin__context'>
        <div className='rolus-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Thể lệ</h2>
        </div>

        <div className='rolus-compet-admin__context-enter'>
          {isEditing ? (
            <Controller
              name='rule'
              control={control}
              render={({ field }) => <TiptapEditor value={field.value} onChange={field.onChange} />}
            />
          ) : (
            <div className='rolus-compet-admin__context-display'>
              <TiptapEditor value={information.rule} editable={false} />
            </div>
          )}
        </div>

        <div className='rolus-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button type='submit' disabled={isSubmitting || !isDirty}>
                <Icon icon='material-symbols:save' width='20' height='20' />
                {isSubmitting ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button type='button' onClick={handleCancel}>
                <Icon icon='material-symbols:cancel' width='20' height='20' />
                Hủy
              </button>
            </>
          ) : (
            <button type='button' onClick={() => setIsEditing(true)}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' />
              Chỉnh sửa
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default RulesOfManageCompet
