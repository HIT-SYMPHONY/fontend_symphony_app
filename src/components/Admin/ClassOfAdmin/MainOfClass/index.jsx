import React, { useState, useRef, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getAllClassrooms } from '../../../../apis/admin.api'
import { GlobalContext } from '../../../../dataContext'
import './style.scss'

const MainOfClassAdmin = () => {
  const navigate = useNavigate()
  const { token } = useContext(GlobalContext)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả lớp')
  const [classOptions, setClassOptions] = useState(['Tất cả lớp'])
  const [memberClass, setMemberClass] = useState([])
  const [filteredClass, setFilteredClass] = useState([]) // For filtering
  const [error, setError] = useState(null)
  const dropdownRef = useRef(null)

  const handleSelect = (item) => {
    setSelectedClass(item)
    setIsDropdownOpen(false)

    // Lọc lớp học khi chọn dropdown
    if (item === 'Tất cả lớp') {
      setFilteredClass(memberClass)
    } else {
      setFilteredClass(memberClass.filter((cls) => cls.className === item))
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

  useEffect(() => {
    if (!token || token.trim() === '') {
      setError('Token không hợp lệ hoặc không tồn tại. Vui lòng đăng nhập lại.')
      navigate('/login')
      return
    }

    const fetchClasses = async () => {
      try {
        const response = await getAllClassrooms(token)
        if (response.success) {
          const formattedClasses = response.data.items.map((classroom) => ({
            id: classroom.id,
            className: classroom.name,
            style: classroom.status === 'UPCOMING' ? 1 : 2,
            state: classroom.status === 'UPCOMING' ? 'Đang diễn ra' : 'Đã kết thúc',
            view: 'Xem chi tiết',
            image: classroom.image,
          }))

          setMemberClass(formattedClasses)
          setFilteredClass(formattedClasses)

          const newClassOptions = [
            'Tất cả lớp',
            ...new Set(response.data.items.map((classroom) => classroom.name)),
          ]
          setClassOptions(newClassOptions)
        } else {
          if (response.error.includes('xác thực')) {
            setError('Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.')
            navigate('/login')
          } else {
            setError('Không thể tải danh sách lớp: ' + response.error)
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error)
        setError('Lỗi không mong muốn khi tải danh sách lớp')
      }
    }

    fetchClasses()
  }, [token, navigate])

  return (
    <div className='main-class-admin'>
      {error && (
        <div className='main-class-admin__error' style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}

      <div className='main-class-admin__header'>
        <i
          className='main-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin')}></i>

        {/* Dropdown chọn lớp */}
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

        {/* Thanh tìm kiếm (chưa xử lý logic tìm) */}
        <div className='main-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='main-class-admin__search-input'
            onChange={(e) => {
              const search = e.target.value.toLowerCase()
              const filtered = memberClass.filter((item) =>
                item.className.toLowerCase().includes(search),
              )
              setFilteredClass(filtered)
            }}
          />
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
          {filteredClass.map((item) => (
            <div className='main-class-admin__content-body-item' key={item.id}>
              <div className='main-class-admin__content-body-item__img'>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.className}
                    className='main-class-admin__content-body-item__img-content'
                  />
                )}
              </div>
              <div className='main-class-admin__content-body-item__box'>
                <div className='main-class-admin__content-body-item__box-start'>
                  <h4>{item.className}</h4>
                  <span className={item.style === 1 ? 'span1' : 'span2'}>{item.state}</span>
                </div>
                <span onClick={() => navigate(`information/${item.id}`)}>{item.view}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default MainOfClassAdmin
