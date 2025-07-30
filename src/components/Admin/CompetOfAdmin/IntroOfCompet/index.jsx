import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const IntroOfCompetAdmin = () => {
  const navigate = useNavigate()
  const [information, setInformation] = useState({
    name: 'jbojklm;kkkkkkkkkkkkkkkkk',
    leader: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkk',
    startDay: '12/02/2025',
    endDay: '15/04/2025',
    context:
      'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ ...information })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Giới thiệu')
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
    <div className='intro-compet-admin'>
      <div className='intro-compet-admin__header'>
        <i
          className='intro-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition')}></i>

        <div
          className='intro-compet-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='intro-compet-admin__filter-icon'
          />
          <div className='intro-compet-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='intro-compet-admin__filter-arrow'
          />

          {isDropdownOpen && (
            <div className='intro-compet-admin__dropdown'>
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

        <div className='intro-compet-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='intro-compet-admin__search-input'
          />
          <i className='intro-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='intro-compet-admin__create-button'>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='intro-compet-admin__context'>
        <div className='intro-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Giới thiệu</h2>
        </div>

        <div className='intro-compet-admin__context-enter'>
          <div className='intro-compet-admin__context-enter__left'>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên cuộc thi</span>
              {isEditing ? (
                <input
                  type='text'
                  name='name'
                  value={editForm.name}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{information.name}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên leader</span>
              {isEditing ? (
                <input
                  type='text'
                  name='leader'
                  value={editForm.leader}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{information.leader}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày bắt đầu</span>
              {isEditing ? (
                <input
                  type='text'
                  name='startDay'
                  value={editForm.startDay}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{information.startDay}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày kết thúc</span>
              {isEditing ? (
                <input
                  type='text'
                  name='endDay'
                  value={editForm.endDay}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{information.endDay}</h5>
              )}
            </div>
          </div>
          <div className='intro-compet-admin__context-enter__right'>
            <span>Nội dung</span>
            {isEditing ? (
              <textarea
                name='context'
                value={editForm.context}
                onChange={handleEditChange}
                className='intro-compet-admin__context-enter__right-textarea'
              />
            ) : (
              <h5>{information.context}</h5>
            )}
          </div>
        </div>

        <div className='intro-compet-admin__context-button'>
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

export default IntroOfCompetAdmin
