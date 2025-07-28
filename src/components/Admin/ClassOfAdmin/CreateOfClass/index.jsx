import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const CreateOfClassAdmin = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả lớp')
  const [classOptions, setClassOptions] = useState(['Tất cả lớp', 'Lớp 10A', 'Lớp 11B', 'Lớp 12C'])

  const dropdownRef = useRef(null)

  const handleSelect = (item) => {
    setSelectedClass(item)
    setIsDropdownOpen(false)
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
    <div className='create-class-admin'>
      <div className='create-class-admin__header'>
        <i
          className='create-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/manage')}></i>

        <div
          className='create-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='create-class-admin__filter-icon'
          />
          <div className='create-class-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='create-class-admin__filter-arrow'
          />

          {isDropdownOpen && (
            <div className='create-class-admin__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='create-class-admin__dropdown-item'
                  onClick={() => handleSelect(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='create-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='create-class-admin__search-input'
          />
          <i className='create-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='create-class-admin__create-button'>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='create-class-admin__content'>
        <div className='create-class-admin__content-title'>
          <i className='fa-solid fa-plus'></i>
          <h3>Tạo lớp học mới</h3>
        </div>
        <div className='create-class-admin__content-body'>
          <form className='create-class-admin__content-body__form'>
            <div className='create-class-admin__content-body__form-item'>
              <div>
                <label>Tên lớp học</label>
                <input type='text' placeholder='Tên lớp học' />
              </div>
              <div>
                <label>Leader</label>
                <input type='text' placeholder='Leader' />
              </div>
            </div>
            <div className='create-class-admin__content-body__form-table'>
              <div>
                <label>Ngày bắt đầu</label>
                <input type='date' />
              </div>
              <div>
                <label>Ngày kết thúc</label>
                <input type='date' />
              </div>
              <div>
                <label>Độ dài lớp học</label>
                <input type='text' placeholder='Độ dài lớp học' />
              </div>
              <div>
                <label>Lịch học</label>
                <input type='text' placeholder='Lịch học' />
              </div>
            </div>

            <div className='create-class-admin__content-body__form-context'>
              <div>
                <label>Ảnh đại diện</label>
                <input type='file' />
              </div>
              <div>
                <label>Mô tả</label>
                <textarea placeholder='Nhập text...' className='textarea'></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className='create-class-admin__content-button'>
          <button>Tạo</button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfClassAdmin
