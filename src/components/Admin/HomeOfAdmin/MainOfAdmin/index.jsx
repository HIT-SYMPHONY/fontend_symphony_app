import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const classOptions = ['HIT 15', 'Lớp 10', 'Lớp 11', 'Lớp 12']
const member = [
  { id: 1, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 2, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 3, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 4, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 5, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 6, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 1, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 2, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 3, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 4, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 5, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 6, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 1, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 2, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 3, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 4, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 5, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 6, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 1, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 2, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 3, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 4, name: 'Nguyễn Văn A', role: 'LEADER', msv: '2023609901', time: '30/06/2025' },
  { id: 5, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
  { id: 6, name: 'Nguyễn Văn A', role: 'USER', msv: '2023609901', time: '30/06/2025' },
]
const MainOfAdmin = () => {
  const navigate = useNavigate()
  const [selectedClass, setSelectedClass] = useState('HIT 15')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='main-admin'>
      <div className='main-admin__title'>
        <i
          className='fa-solid fa-arrow-left main-admin__title__i'
          onClick={() => navigate('/admin')}></i>

        <div
          className='main-admin__title__choose'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='main-admin__title__choose__icon'
          />
          <div className='main-admin__title__choose__label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='main-admin__title__choose__arrow'
          />

          {isDropdownOpen && (
            <div className='main-admin__title__choose__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='main-admin__title__choose__dropdown__item'
                  onClick={() => handleSelect(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='main-admin__search'>
          <input type='text' placeholder='Tìm kiếm...' />
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='main-admin__title__create' onClick={() => navigate('create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <h2>Danh sách thành viên </h2>
      <h3>Số lượng thành viên: {member.length}</h3>
      <div className='main-admin__context'>
        <table className='main-admin__context__table'>
          <thead className='main-admin__context__table__thead'>
            <tr className='main-admin__context__table__thead__tr'>
              <th>STT</th>
              <th>Tên</th>
              <th>Phân quyền</th>
              <th>Mã sinh viên</th>
              <th>Thời gian</th>
              <th>Icon</th>
            </tr>
          </thead>
        </table>

        {/* Đây là phần có scroll */}
        <div className='main-admin__context__table__tbody-wrapper'>
          <table className='main-admin__context__table'>
            <tbody className='main-admin__context__table__tbody'>
              {member.map((item, index) => (
                <tr key={index} onClick={() => navigate('information')}>
                  <td className='tbody'>
                    <h4>{index + 1}</h4>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.msv}</td>
                  <td>{item.time}</td>
                  <td className='tbody-td'></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MainOfAdmin
