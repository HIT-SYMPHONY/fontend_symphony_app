import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const test = [
  {
    id: 1,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 2,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 3,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 4,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 5,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 6,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
  {
    id: 7,
    nameTest: 'HIT Contest Series',
    note: 'Lịch thi tuần 1 - Thuật toán chuyên ',
    startDay: '20/02/2000',
    creater: 'Nguyễn Văn A',
  },
]

const ListOfGroup = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
  const [expandedItems, setExpandedItems] = useState({})
  const [items, setItems] = useState(test)
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

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    setExpandedItems((prev) => {
      const newExpanded = { ...prev }
      delete newExpanded[id]
      return newExpanded
    })
  }

  return (
    <div className='list-member-admin'>
      <div className='list-member-admin__header'>
        <i
          className='list-member-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition')}></i>

        <div
          className='list-member-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='list-member-admin__filter-icon'
          />
          <div className='list-member-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='list-member-admin__filter-arrow'
          />

          {isDropdownOpen && (
            <div className='list-member-admin__dropdown'>
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

        <div className='list-member-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='list-member-admin__search-input'
          />
          <i className='list-member-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='list-member-admin__create-button' onClick={() => navigate('create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='list-member-admin__context'>
        <h3>Tất cả thông báo </h3>
        <div className='list-member-admin__context-table'>
          <div className='list-member-admin__context-table-title'>
            <h5>STT</h5>
            <h5>Cuộc thi</h5>
            <h5>Tên thông báo</h5>
            <h5>Ngày tạo</h5>
            <h5>Người tạo</h5>
            <h5></h5>
          </div>
          <div className='list-member-admin__context-table-list'>
            {items.map((item, index) => (
              <div className='list-member-admin__context-table-list__item' key={item.id}>
                <div className='list-member-admin__context-table-list__item-box'>
                  <h5>{item.id}</h5>
                  <h5>{item.nameTest}</h5>
                  <h5>{item.note}</h5>
                  <h5>{item.startDay}</h5>
                  <h5>{item.creater}</h5>
                  <div className='div'>
                    <i
                      className={
                        expandedItems[item.id]
                          ? 'fa-solid fa-chevron-up div-i'
                          : 'fa-solid fa-chevron-down div-i'
                      }
                      onClick={() => toggleExpand(item.id)}></i>
                    <i
                      className='fa-solid fa-trash div-de'
                      onClick={() => handleDelete(item.id)}></i>
                  </div>
                </div>
                {expandedItems[item.id] && (
                  <>
                    <hr />
                    <div className='list-member-admin__context-table-list__item-then'>
                      <h5>Nội dung:</h5>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOfGroup
