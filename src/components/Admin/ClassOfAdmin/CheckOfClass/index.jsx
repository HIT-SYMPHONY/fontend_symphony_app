import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const CheckOfClassAdmin = () => {
  const navigate = useNavigate()
  const [member, setMember] = useState({
    className: 'jbojklm;kkkkkkkkkkkkkkkkk',
    leader: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkk',
    startDay: '12/02/2025',
    endDay: '12/02/2025',
    length: '8 buổi',
    time: '18:00 Thứ 2 hàng tuần',
    moTa: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [tempMember, setTempMember] = useState(member) // Lưu trữ dữ liệu tạm thời khi chỉnh sửa
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông tin lớp học')
  const [classOptions, setClassOptions] = useState([
    {
      option: 'Thông tin lớp học',
      link: '/admin/manage/information',
    },
    {
      option: 'Quản lý lớp học',
      link: '/admin/manage/manageofmember',
    },
  ])

  const dropdownRef = useRef(null)

  const handleSelect = (item) => {
    setSelectedClass(item)
    setIsDropdownOpen(false)
  }

  const handleEditToggle = () => {
    if (!isEditing) {
      setTempMember(member) // Lưu dữ liệu hiện tại vào tempMember khi bắt đầu chỉnh sửa
    }
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTempMember((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setMember(tempMember) // Cập nhật dữ liệu member với dữ liệu tạm thời
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempMember(member) // Khôi phục dữ liệu ban đầu
    setIsEditing(false)
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
    <div className='check-class-admin'>
      <div className='check-class-admin__header'>
        <i
          className='check-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/manage')}></i>

        <div
          className='check-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='check-class-admin__filter-icon'
          />
          <div className='check-class-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='check-class-admin__filter-arrow'
          />

          {isDropdownOpen && (
            <div className='check-class-admin__dropdown'>
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

        <div className='check-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='check-class-admin__search-input'
          />
          <i className='check-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='check-class-admin__create-button'>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='check-class-admin__content'>
        <div className='check-class-admin__content-header'>
          <div className='check-class-admin__content-header-title'>
            <i className='fa-solid fa-circle-info'></i>
            <h3>Thông tin lớp học</h3>
          </div>
          <div className='check-class-admin__content-header-body'>
            <div className='check-class-admin__content-header-body__infor'>
              <Icon icon='ic:round-upload' width='24' height='24' />
              <p>Tải ảnh lên</p>
            </div>
            <form className='check-class-admin__content-header-body__form'>
              <div className='check-class-admin__content-header-body__form-item'>
                <div>
                  <span>Tên lớp học</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='className'
                      value={tempMember.className}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.className}</h5>
                  )}
                </div>
                <div>
                  <span>Leader</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='leader'
                      value={tempMember.leader}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.leader}</h5>
                  )}
                </div>
              </div>
              <div className='check-class-admin__content-header-body__form-table'>
                <div>
                  <span>Ngày ban đầu</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='startDay'
                      value={tempMember.startDay}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.startDay}</h5>
                  )}
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='endDay'
                      value={tempMember.endDay}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.endDay}</h5>
                  )}
                </div>
                <div>
                  <span>Độ dài lớp học</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='length'
                      value={tempMember.length}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.length}</h5>
                  )}
                </div>
                <div>
                  <span>Lịch lớp học</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='time'
                      value={tempMember.time}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{member.time}</h5>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className='check-class-admin__content-header-mota'>
            <span>Mô tả:</span>
            {isEditing ? (
              <textarea
                name='moTa'
                value={tempMember.moTa}
                onChange={handleInputChange}
                className='check-class-admin__content-header-mota__textarea'
              />
            ) : (
              <h5>{member.moTa}</h5>
            )}
          </div>
        </div>
        <div className='check-class-admin__content-button'>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Lưu</button>
              <button onClick={handleCancel}>Hủy</button>
            </>
          ) : (
            <button onClick={handleEditToggle}>Chỉnh sửa</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOfClassAdmin
