import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const RolusOfCompetAdmin = () => {
  const navigate = useNavigate()
  const [information, setInformation] = useState({
    contextNoProfess:
      'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
    contextPotoShop:
      'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...information })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thể lệ')
  const [classOptions, setClassOptions] = useState([
    {
      option: 'Giới thiệu',
      link: '/admin/competition/information',
    },
    {
      option: 'Thể lệ',
      link: '/admin/competition/rules',
    },
    {
      option: 'Quản lý cuộc thi',
      link: '/admin/competition/memberofcompetition',
    },
    {
      option: 'Thông báo',
      link: '/admin/competition/notification',
    },
  ])

  const dropdownRef = useRef(null)
  const fileInputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleSelect = (item) => {
    setSelectedClass(item)
    setIsDropdownOpen(false)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => setPreviewUrl(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = () => {
    setInformation({ ...editForm })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm({ ...information })
    setIsEditing(false)
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
  const handleOption = (item) => {
    if (item?.link) {
      handleSelect(item.option)
      navigate(item.link)
    }
  }
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

        <button className='rolus-compet-admin__create-button'>
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
          <span>Phần thi thuật toán chuyên & không chuyên</span>
          {isEditing ? (
            <textarea
              name='contextNoProfess'
              value={editForm.contextNoProfess}
              onChange={handleEditChange}
              className='rolus-compet-admin__context-enter-textarea'
            />
          ) : (
            <h5>{information.contextNoProfess}</h5>
          )}
          <span>Phần thi photoshop</span>
          {isEditing ? (
            <textarea
              name='contextPotoShop'
              value={editForm.contextPotoShop}
              onChange={handleEditChange}
              className='rolus-compet-admin__context-enter-textarea'
            />
          ) : (
            <h5>{information.contextPotoShop}</h5>
          )}
        </div>

        <div className='rolus-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button onClick={handleEditSubmit}>
                <Icon icon='material-symbols:save' width='20' height='20' />
                Lưu
              </button>
              <button onClick={handleCancelEdit}>
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

export default RolusOfCompetAdmin
