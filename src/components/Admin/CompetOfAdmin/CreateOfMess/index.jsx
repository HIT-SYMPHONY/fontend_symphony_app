

import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createNotification } from '../../../../apis/notification.api'
import './style.scss'

const CreateOfMess = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const [content, setContent] = useState('') 
  const [loading, setLoading] = useState(false)

  // Header/Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
  const dropdownRef = useRef(null)
  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
  ]

  // Effect for closing the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Nội dung thông báo không được để trống.')
      return
    }
    setLoading(true)
    const creationToast = toast.loading('Đang tạo thông báo...')

    try {
      // The payload matches your Postman screenshot perfectly
      const payload = {
        content: content,
        classRoomId: null, // As per the screenshot, this is null for competitions
        competitionId: competitionId,
      }
      await createNotification(payload)
      toast.success('Tạo thông báo thành công!', { id: creationToast })
      // Navigate back to the list of notifications for this competition
      navigate(`/admin/competitions/${competitionId}/notifications`)
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo thông báo.'
      toast.error(message, { id: creationToast })
    } finally {
      setLoading(false)
    }
  }

  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  return (
    <div className='mess'>
      <div className='mess__header'>
        <i
          className='mess__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(`/admin/competitions/${competitionId}/notifications`)}></i>
        <div
          className='mess__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon icon='stash:filter-solid' width='20' height='20' className='mess__filter-icon' />
          <div className='mess__filter-label'>{selectedClass}</div>
          <Icon icon='mdi:chevron-down' width='20' height='20' className='mess__filter-arrow' />
          {isDropdownOpen && (
            <div className='mess__dropdown'>
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
        <div className='mess__search'>
          <input type='text' placeholder='Tìm kiếm...' className='mess__search-input' />
          <i className='mess__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button className='mess__create-button' disabled>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='mess__context'>
        <div className='mess__context-title'>
          <Icon
            icon='mingcute:notification-newdot-fill'
            width='30px'
            height='30px'
            className='mess__context-title-icon'
          />
          <h3>Tạo thông báo mới</h3>
        </div>
        <div className='mess__context-nodung'>
          <span>Nội dung</span>
          <textarea
            name='content'
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='mess__context-nodung-textarea'
            placeholder='Nhập nội dung thông báo...'
            rows={10}></textarea>
        </div>
        <div className='mess__context-button'>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfMess