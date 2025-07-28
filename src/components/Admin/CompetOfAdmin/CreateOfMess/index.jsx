import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const CreateOfMess = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
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

  const handleOption = (item) => {
    if (item?.link) {
      handleSelect(item.option)
      navigate(item.link)
    }
  }

  return (
    <div className='mess'>
      <div className='mess__header'>
        <i
          className='mess__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition/notification')}></i>

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

        <button className='mess__create-button'>
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
          <h3>Thông báo</h3>
        </div>
        <div className='mess__context-nodung'>
          <span>Tên thông báo</span>
          <input type='text' />
          <span>Nội dung</span>
          <textarea name='' id='' className='mess__context-nodung-textarea'></textarea>
        </div>
        <div className='mess__context-button'>
          <button>Tạo</button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfMess
