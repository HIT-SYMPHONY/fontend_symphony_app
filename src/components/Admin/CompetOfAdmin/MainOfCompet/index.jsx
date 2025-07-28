import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const MainOfCompet = () => {
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
  const lop = [
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },

    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },

    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },

    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
    {
      name: 'HIT Contest Series 2025',
      state: 'Đang diễn ra',
      see: 'Ngày bắt đầu: 14/07/2025',
    },
  ]
  return (
    <>
      <div className='mainofcompet'>
        <div className='mainofcompet__header'>
          <i
            className='mainofcompet__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate('/admin/manage')}></i>

          <div
            className='mainofcompet__filter'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            ref={dropdownRef}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='mainofcompet__filter-icon'
            />
            <div className='mainofcompet__filter-label'>{selectedClass}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='mainofcompet__filter-arrow'
            />

            {isDropdownOpen && (
              <div className='mainofcompet__dropdown'>
                {classOptions.map((item, index) => (
                  <div
                    key={index}
                    className='mainofcompet__dropdown-item'
                    onClick={() => handleSelect(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='mainofcompet__search'>
            <input type='text' placeholder='Tìm kiếm...' className='mainofcompet__search-input' />
            <i className='mainofcompet__search-icon fa-solid fa-magnifying-glass'></i>
          </div>

          <button className='mainofcompet__create-button' onClick={() => navigate('create')}>
            <i className='fa-solid fa-plus'></i>
            Tạo mới
          </button>
        </div>

        <h3>Danh sách cuộc thi</h3>
        <div className='mainofcompet__table'>
          {lop.map((item, index) => (
            <div
              className='mainofcompet__table-box'
              key={index}
              onClick={() => navigate('information')}>
              <div className='mainofcompet__table-box__img'></div>
              <div className='mainofcompet__table-box__item'>
                <div className='mainofcompet__table-box__item-start'>
                  <h4>{item.name}</h4>
                  <span>{item.state}</span>
                  <p>{item.see}</p>
                </div>
                <i className='fa-solid fa-circle-info mainofcompet__table-box__item-end'></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MainOfCompet
