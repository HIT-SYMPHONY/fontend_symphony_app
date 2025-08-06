import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../apis/user.api'
import './style.scss'
import placeHolderImage from '../../../../assets/img/Ellipse.png'
import { getDisplayName } from '../../../../utils/formatters'

const classOptions = ['ALL', 'USER', 'LEADER', 'ADMIN']
const MainOfAdmin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await getAllUsers()
        setUsers(response.data || [])
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Có lỗi xảy ra khi tải danh sách thành viên.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    let filtered = [...users]
    if (selectedClass !== 'ALL') {
      filtered = filtered.filter((user) => user.role === selectedClass)
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(lowercasedQuery) ||
          user.studentCode?.includes(lowercasedQuery),
      )
    }
    return filtered
  }, [users, selectedClass, searchQuery])
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
          <div className='main-admin__title__choose__label'>
            {selectedClass === 'ALL' ? 'Tất cả' : selectedClass}
          </div>
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
                  {item === 'ALL' ? 'Tất cả' : item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='main-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='main-admin__title__create'
          onClick={() => navigate('/admin/users/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <h2>Danh sách thành viên </h2>
      <h3>Số lượng thành viên: {loading ? '...' : filteredUsers.length}</h3>
      <div className='main-admin__context'>
        <div className='main-admin__context__table__tbody-wrapper'>
          <table className='main-admin__context__table'>
            <thead className='main-admin__context__table__thead'>
              <tr className='main-admin__context__table__thead__tr'>
                <th>STT</th>
                <th>Tên</th>
                <th>Phân quyền</th>
                <th>Mã sinh viên</th>
                <th>Ngày tham gia</th>
                <th>Ảnh</th>
              </tr>
            </thead>
            <tbody className='main-admin__context__table__tbody'>
              {loading && (
                <tr>
                  <td colSpan='6' style={{ textAlign: 'center', padding: '2rem' }}>
                    Đang tải...
                  </td>
                </tr>
              )}
              {!loading &&
                filteredUsers.map((user, index) => (
                  <tr key={user.id} onClick={() => navigate(`/admin/users/${user.id}`)}>
                    <td className='tbody'>
                      <h4>{index + 1}</h4>
                    </td>
                    <td>{getDisplayName(user)}</td>
                    <td>{user.role}</td>
                    <td>{user.studentCode}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className='tbody-td'>
                      <img src={user.imageUrl || placeHolderImage} alt='Profile' />
                    </td>
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
