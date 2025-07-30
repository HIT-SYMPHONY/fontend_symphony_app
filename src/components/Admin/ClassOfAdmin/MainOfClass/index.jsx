import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { Outlet, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllClassrooms } from '../../../../apis/classroom.api'
import { translateStatus } from '../../../../utils/formatters'
import './style.scss'

const MainOfClassAdmin = () => {
  const navigate = useNavigate()
  const [classrooms, setClassrooms] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, pageSize: 10, totalElements: 0 })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('Tất cả')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const statusOptions = ['Tất cả', 'UPCOMING', 'ONGOING', 'COMPLETED']

  const fetchClasses = useCallback(async (page = 1) => {
    try {
      setLoading(true)
      const params = { pageNum: page, pageSize: 10 }
      const response = await getAllClassrooms(params)
      const content = response.data

      if (content && content.items) {
        setClassrooms(content.items)
      }
      if (content && content.meta) {
        setPagination((prev) => ({
          ...prev,
          totalElements: content.meta.totalElements,
          pageNum: content.meta.pageNum,
        }))
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải danh sách lớp học.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchClasses(pagination.pageNum)
  }, [fetchClasses, pagination.pageNum])

  const filteredClassrooms = useMemo(() => {
    let filtered = [...classrooms]
    if (selectedStatus !== 'Tất cả') {
      filtered = filtered.filter((cls) => cls.status === selectedStatus)
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase()
      filtered = filtered.filter((cls) => cls.name.toLowerCase().includes(lowercasedQuery))
    }
    return filtered
  }, [classrooms, selectedStatus, searchQuery])

  const handleSelect = (item) => {
    setSelectedStatus(item)
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
          <div className='main-class-admin__filter-label'>
            {selectedStatus === 'Tất cả' ? 'Tất cả' : translateStatus(selectedStatus)}
          </div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='main-class-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='main-class-admin__dropdown'>
              {statusOptions.map((item, index) => (
                <div
                  key={index}
                  className='main-class-admin__dropdown-item'
                  onClick={() => handleSelect(item)}>
                  {item === 'Tất cả' ? 'Tất cả' : translateStatus(item)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='main-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='main-class-admin__search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='main-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='main-class-admin__create-button'
          onClick={() => navigate('/admin/manage/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='main-class-admin__content'>
        <h3>Danh sách lớp học ({loading ? '...' : pagination.totalElements})</h3>
        <div className='main-class-admin__content-body'>
          {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}
          {!loading &&
            filteredClassrooms.map((item) => (
              <div className='main-class-admin__content-body-item' key={item.id}>
                <div className='main-class-admin__content-body-item__img'>
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className='placeholder-image'></div>
                  )}
                </div>
                <div className='main-class-admin__content-body-item__box'>
                  <div className='main-class-admin__content-body-item__box-start'>
                    <h4>{item.name}</h4>
                    <span className={item.status === 'COMPLETED' ? 'span2' : 'span1'}>
                      {translateStatus(item.status)}
                    </span>
                  </div>
                  <span onClick={() => navigate(`/admin/manage/information/${item.id}`)}>
                    Xem chi tiết
                  </span>
                </div>
              </div>
            ))}
          {!loading && filteredClassrooms.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              Không có lớp học nào.
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default MainOfClassAdmin
