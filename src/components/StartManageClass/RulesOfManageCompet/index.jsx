import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompetitionById, updateCompetition } from '../../../apis/competition.api'
import './style.scss'

const RulesOfManageCompet = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  // State
  const [competition, setCompetition] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // State for header/dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thể lệ')
  const dropdownRef = useRef(null)
  const classOptions = [
    { option: 'Giới thiệu', link: `/client/manage/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/client/manage/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/client/manage/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/client/manage/competitions/${competitionId}/test` },
  ]

  // --- Data Fetching ---
  const fetchCompetitionData = useCallback(async () => {
    if (!competitionId) return
    try {
      setLoading(true)
      const response = await getCompetitionById(competitionId)
      const compData = response.data
      setCompetition(compData)
      // Based on your API docs, rules seem to be in the 'content' field.
      // Adjust to 'rule' if that's the correct field name.
      setEditContent(compData.content || '')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
    } finally {
      setLoading(false)
    }
  }, [competitionId])

  useEffect(() => {
    fetchCompetitionData()
  }, [fetchCompetitionData])

  // --- Event Handlers ---
  const handleSave = async () => {
    const saveToast = toast.loading('Đang lưu...')

    // The backend expects all fields in the 'data' part of the FormData.
    // We must send the original data back, with our changes merged in.
    const payload = {
      ...competition, // Start with all original data
      content: editContent, // Override the 'content' with our edits
    }

    // Remove fields the backend doesn't expect on an update
    delete payload.id
    delete payload.status
    delete payload.createdAt

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      await updateCompetition(competitionId, formData)
      toast.success('Cập nhật thành công!', { id: saveToast })
      setIsEditing(false)
      await fetchCompetitionData() // Re-fetch data to show the saved state
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật.', { id: saveToast })
    }
  }

  const handleCancel = () => {
    setEditContent(competition.content || '')
    setIsEditing(false)
  }

  // Dropdown handlers
  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) return <div>Đang tải thể lệ cuộc thi...</div>
  if (!competition) return <div>Không tìm thấy thông tin cuộc thi.</div>

  return (
    <div className='rolus-compet-admin'>
      <div className='rolus-compet-admin__header'>
        <i
          className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition')}></i>
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

      <div className='rolus-compet-admin__context'>
        <div className='rolus-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Thể lệ</h2>
        </div>

        <div className='rolus-compet-admin__context-enter'>
          {isEditing ? (
            <textarea
              name='content'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='rolus-compet-admin__context-enter-textarea'
              rows={15}
            />
          ) : (
            <pre className='rolus-compet-admin__context-display'>{competition.content}</pre>
          )}
        </div>

        <div className='rolus-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button onClick={handleSave}>
                <Icon icon='material-symbols:save' width='20' height='20' />
                Lưu
              </button>
              <button onClick={handleCancel}>
                <Icon icon='material-symbols:cancel' width='20' height='20' />
                Hủy
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RulesOfManageCompet
