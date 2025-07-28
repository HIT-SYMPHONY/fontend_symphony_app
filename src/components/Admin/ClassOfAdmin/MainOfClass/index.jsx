import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const memberClass = [
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 2,
    state: 'Đã kết thúc',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 2,
    state: 'Đã kết thúc',
    view: 'Xem chi tiết',
  },
  {
    className: 'PRIVATE: Đồ họa - 2025',
    style: 1,
    state: 'Đang diễn ra',
    view: 'Xem chi tiết',
  },
]

const MainOfClassAdmin = () => {
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
    <div className='main-class-admin'>
      <div className='main-class-admin__header'>
        <i
          className='main-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin')}></i>

        <div
          className='main-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='main-class-admin__filter-icon'
          />
          <div className='main-class-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='main-class-admin__filter-arrow'
          />

          {isDropdownOpen && (
            <div className='main-class-admin__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='main-class-admin__dropdown-item'
                  onClick={() => handleSelect(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='main-class-admin__search'>
          <input type='text' placeholder='Tìm kiếm...' className='main-class-admin__search-input' />
          <i className='main-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='main-class-admin__create-button' onClick={() => navigate('create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='main-class-admin__content'>
        <h3>Danh sách lớp học</h3>
        <div className='main-class-admin__content-body'>
          {memberClass.map((item, index) => (
            <div className='main-class-admin__content-body-item' key={index}>
              <div className='main-class-admin__content-body-item__img'></div>
              <div className='main-class-admin__content-body-item__box'>
                <div className='main-class-admin__content-body-item__box-start'>
                  <h4>{item.className}</h4>
                  <span className={item.style === 1 ? 'span1' : 'span2'}>{item.state}</span>
                </div>
                <span onClick={() => navigate('information')}>{item.view}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainOfClassAdmin
