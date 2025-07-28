import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const CreateOfCompetAdmin = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả lớp')
  const [classOptions, setClassOptions] = useState(['Tất cả lớp', 'Lớp 10A', 'Lớp 11B', 'Lớp 12C'])

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <div className='create-compet-admin'>
        <div className='create-compet-admin__header'>
          <i
            className='create-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate('/admin/competition')}></i>

          <div
            className='create-compet-admin__filter'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='create-compet-admin__filter-icon'
            />
            <div className='create-compet-admin__filter-label'>{selectedClass}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='create-compet-admin__filter-arrow'
            />

            {isDropdownOpen && (
              <div className='create-compet-admin__dropdown'>
                {classOptions.map((item, index) => (
                  <div
                    key={index}
                    className='create-compet-admin__dropdown-item'
                    onClick={() => handleSelect(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='create-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='create-compet-admin__search-input'
            />
            <i className='create-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>

          <button className='create-compet-admin__create-button'>
            <i className='fa-solid fa-plus'></i>
            Tạo mới
          </button>
        </div>

        <div className='create-compet-admin__context'>
          <div className='create-compet-admin__context-title'>
            <i className='fa-solid fa-plus'></i>
            <h2>Tạo cuộc thi</h2>
          </div>

          <div className='create-compet-admin__context-enter'>
            <div className='create-compet-admin__context-enter__left'>
              <span>Tên cuộc thi</span>
              <input type='text' />

              <div className='create-compet-admin__context-enter__left-time'>
                <div>
                  <span>Ngày bắt đầu</span>
                  <input type='date' />
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  <input type='date' />
                </div>
              </div>

              <span>Ảnh bìa cuộc thi</span>
              {/* === Upload Image Section === */}
              {!previewUrl && (
                <div
                  className='create-compet-admin__context-enter__left-upload'
                  onClick={() => fileInputRef.current.click()}>
                  <Icon icon='ic:round-upload' className='upload-icon' />
                  <span>Tải ảnh lên</span>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt='Ảnh bìa'
                  className='create-compet-admin__context-enter__left-upload-preview'
                />
              )}

              <span>Giới thiệu </span>
              <textarea
                name='introduction'
                placeholder='Nhập nội dung'
                id=''
                className='create-compet-admin__context-enter__left-textarea'></textarea>
            </div>
            <div className='create-compet-admin__context-enter__right'>
              <span>Leader (Phụ trách)</span>
              <input type='text' />
              <span>Thể lệ</span>
              <textarea
                name=''
                id=''
                placeholder='Nhập nội dung'
                className='create-compet-admin__context-enter__right-textarea'></textarea>
            </div>
          </div>

          <div className='create-compet-admin__context-button'>
            <button>tạo</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateOfCompetAdmin
