import React, { useState, useRef, useEffect, useMemo, useContext } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../dataContext'
import './style.scss'

const member = [
  { id: 1, name: 'Nguyễn Văn A', msv: '2023001001', age: 'HIT 15', role: 'USER' },
  { id: 2, name: 'Nguyễn Văn B', msv: '2023001002', age: 'HIT 16', role: 'LEADER' },
  { id: 3, name: 'Trần Thị C', msv: '2023001003', age: 'HIT 15', role: 'USER' },
  { id: 4, name: 'Lê Văn D', msv: '2023001004', age: 'HIT 17', role: 'ADMIN' },
  { id: 5, name: 'Phạm Thị E', msv: '2023001005', age: 'HIT 15', role: 'USER' },
  { id: 6, name: 'Đỗ Văn F', msv: '2023001006', age: 'HIT 16', role: 'LEADER' },
  { id: 7, name: 'Hoàng Thị G', msv: '2023001007', age: 'HIT 17', role: 'USER' },
  { id: 8, name: 'Ngô Văn H', msv: '2023001008', age: 'HIT 18', role: 'ADMIN' },
  { id: 9, name: 'Vũ Thị I', msv: '2023001009', age: 'HIT 16', role: 'LEADER' },
  { id: 10, name: 'Bùi Văn K', msv: '2023001010', age: 'HIT 15', role: 'USER' },
]

const DecentOfAdmin = () => {
  const { showMain, setShowMain, showNoti, setShowNoti } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
  const [selectedClassRight, setSelectedClassRight] = useState('USER')
  const [searchQuery, setSearchQuery] = useState('')
  const [classOptions] = useState(['USER', 'LEADER', 'ADMIN'])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [addedMembers, setAddedMembers] = useState([])
  const dropdownRefLeft = useRef(null)
  const dropdownRefRight = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target)) {
        setIsDropdownOpenLeft(false)
      }
      if (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target)) {
        setIsDropdownOpenRight(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredMembers = useMemo(() => {
    return member.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.msv.includes(searchQuery)) &&
        (selectedClassLeft === 'Tất cả lớp' || item.role === selectedClassLeft),
    )
  }, [searchQuery, selectedClassLeft])

  const filteredAddedMembers = useMemo(() => {
    return addedMembers.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.msv.includes(searchQuery)) &&
        item.role === selectedClassRight,
    )
  }, [addedMembers, searchQuery, selectedClassRight])

  const handleSelectLeft = (item) => {
    setSelectedClassLeft(item)
    setIsDropdownOpenLeft(false)
  }

  const handleSelectRight = (item) => {
    setSelectedClassRight(item)
    setIsDropdownOpenRight(false)
  }

  const handleRadioChange = (item) => {
    setSelectedMembers((prev) =>
      prev.includes(item.msv) ? prev.filter((msv) => msv !== item.msv) : [...prev, item.msv],
    )
  }

  const handleSelectAll = () => {
    setSelectedMembers(filteredMembers.map((item) => item.msv))
  }

  const handleSelectAllRight = () => {
    setSelectedMembers(filteredAddedMembers.map((item) => item.msv))
  }

  const handleAddMembers = () => {
    const membersToAdd = filteredMembers.filter((item) => selectedMembers.includes(item.msv))
    setAddedMembers((prev) => [
      ...prev,
      ...membersToAdd.filter((item) => !prev.some((added) => added.msv === item.msv)),
    ])
    setSelectedMembers([])
  }

  const handleRemoveMembers = () => {
    setAddedMembers((prev) => prev.filter((item) => !selectedMembers.includes(item.msv)))
    setSelectedMembers([])
  }

  return (
    <div className='decent-admin'>
      <div className='decent-admin__left'>
        <div className='decent-admin__left-title'>
          <Icon
            icon='mdi:book-account'
            width='24'
            height='24'
            className='decent-admin__left-title-icon'
          />
          <h3>Quản lý cuộc thi</h3>
          <i className='fa-solid fa-angles-right'></i>
          <h3>HIT Contest Series - 2025</h3>
        </div>
        <div className='decent-admin__header'>
          <i
            className='decent-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate('/admin')}></i>
          <div
            className='decent-admin__filter'
            onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
            ref={dropdownRefLeft}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='decent-admin__filter-icon'
            />
            <div className='decent-admin__filter-label'>{selectedClassLeft}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='decent-admin__filter-arrow'
            />
            {isDropdownOpenLeft && (
              <div className='decent-admin__dropdown'>
                {['Tất cả lớp', ...classOptions].map((item, index) => (
                  <div
                    key={index}
                    className='decent-admin__dropdown-item'
                    onClick={() => handleSelectLeft(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='decent-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='decent-admin__search-input'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className='decent-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='decent-admin__left-context'>
          <div className='decent-admin__left-context__title'>
            <h5>Tên thí sinh</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa học</h5>
          </div>
          <div className='decent-admin__left-context__list'>
            {filteredMembers.map((item) => (
              <div className='decent-admin__left-context__list-item' key={item.msv}>
                <div className='decent-admin__left-context__list-item-box'>
                  <h5 className='decent-admin__left-context__list-item-box-h5'>{item.id}</h5>
                  <h5>{item.name}</h5>
                </div>
                <h5>{item.msv}</h5>
                <div className='decent-admin__left-context__list-item-box'>
                  <h5>{item.age}</h5>
                  <input
                    type='radio'
                    id={item.msv}
                    checked={selectedMembers.includes(item.msv)}
                    onChange={() => handleRadioChange(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='decent-admin__left-button'>
          <span onClick={handleSelectAll} className='decent-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={handleAddMembers}>Thêm</button>
          {classOptions.map((role) => (
            <span
              key={role}
              onClick={() => handleSelectRight(role)}
              className={selectedClassRight === role ? 'decent-admin__left-button-span' : ''}>
              {role}
            </span>
          ))}
        </div>
      </div>
      <div className='decent-admin__among'></div>
      <div className='decent-admin__right'>
        <div className='decent-admin__left-title'>
          <Icon
            icon='fluent:people-24-filled'
            width='24'
            className='decent-admin__left-title-icon'
          />
          <h3>Danh sách thí sinh</h3>
        </div>
        <div className='decent-admin__header'>
          <div className='decent-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='decent-admin__search-input-second'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className='decent-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
          <div
            className='decent-admin__filter'
            onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
            ref={dropdownRefRight}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='decent-admin__filter-icon'
            />
            <div className='decent-admin__filter-label'>{selectedClassRight}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='decent-admin__filter-arrow'
            />
            {isDropdownOpenRight && (
              <div className='decent-admin__dropdown'>
                {classOptions.map((item, index) => (
                  <div
                    key={index}
                    className='decent-admin__dropdown-item'
                    onClick={() => handleSelectRight(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='decent-admin__left-context'>
          <div className='decent-admin__left-context__title'>
            <h5>Tên thí sinh</h5>
            <h5>Mã sinh viên</h5>
          </div>
          <div className='decent-admin__left-context__list'>
            {filteredAddedMembers.map((item) => (
              <div className='decent-admin__left-context__list-item' key={item.msv}>
                <div className='decent-admin__left-context__list-item-box'>
                  <h5 className='decent-admin__left-context__list-item-box-h5'>{item.id}</h5>
                  <h5>{item.name}</h5>
                </div>
                <h5>{item.msv}</h5>
                <input
                  type='radio'
                  id={item.msv}
                  checked={selectedMembers.includes(item.msv)}
                  onChange={() => handleRadioChange(item)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='decent-admin__left-button'>
          <span onClick={handleSelectAllRight} className='decent-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button onClick={() => setShowNoti(true)}>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default DecentOfAdmin
