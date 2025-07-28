import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './style.scss'

const InforOfAdmin = () => {
  const navigate = useNavigate()
  // Initial member data
  const [member, setMember] = useState({
    firstname: 'Nguyễn',
    name: 'Nguyễn Thị Minh',
    studentId: '2023100000',
    email: 'nguyenthiminhan2020@gmail.com',
    phone: '0123456789',
    khoa: 'K15 - Công nghệ thông tin',
    sex: 'Nữ',
    birthday: '2000-01-01',
    username: 'nguyenthiminhan',
    password: '12345678',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(member)

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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Handle save button click
  const handleSave = () => {
    setMember(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(member)
    setIsEditing(false)
  }

  const maskPassword = (password) => '•'.repeat(password.length)

  return (
    <div className='inforofadmin'>
      <div className='inforofadmin__title'>
        <Icon
          icon='material-symbols:arrow-back-rounded'
          width='32'
          height='32'
          className='inforofadmin__title__icon'
          onClick={() => navigate('/admin/home')}
        />
        <i className='fa-solid fa-circle-user inforofadmin__title__i'></i>
        <h2>Thông tin tài khoản</h2>
      </div>
      <div className='inforofadmin__context'>
        <h3>Thông tin cá nhân</h3>
        <div className='inforofadmin__context__list'>
          <div className='inforofadmin__context__list__box'>
            <div className='inforofadmin__context__list__box__item'>
              <span>Họ đệm</span>
              {isEditing ? (
                <input
                  type='text'
                  name='firstname'
                  value={formData.firstname}
                  onChange={handleInputChange}
                />
              ) : (
                <h4>{member.firstname}</h4>
              )}
            </div>
            <div className='inforofadmin__context__list__box__item'>
              <span>Mã sinh viên</span>
              {isEditing ? (
                <input
                  type='text'
                  name='studentId'
                  value={formData.studentId}
                  onChange={handleInputChange}
                />
              ) : (
                <h4>{member.studentId}</h4>
              )}
            </div>
            <div className='inforofadmin__context__list__box__item'>
              <span>Email</span>
              {isEditing ? (
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <h4>{member.email}</h4>
              )}
            </div>
          </div>
          <div className='inforofadmin__context__list__box'>
            <div className='inforofadmin__context__list__box__item'>
              <span>Tên</span>
              {isEditing ? (
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
              ) : (
                <h4>{member.name}</h4>
              )}
            </div>
            <div className='inforofadmin__context__list__box__item'>
              <span>Số điện thoại</span>
              {isEditing ? (
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <h4>{member.phone}</h4>
              )}
            </div>
            <div className='inforofadmin__context__list__box__item'>
              <span>Khoa</span>
              {isEditing ? (
                <input type='text' name='khoa' value={formData.khoa} onChange={handleInputChange} />
              ) : (
                <h4>{member.khoa}</h4>
              )}
            </div>
          </div>
          <div className='inforofadmin__context__list__box'>
            <div className='inforofadmin__context__list__box__item'>
              <span>Giới tính</span>
              {isEditing ? (
                <input type='text' name='sex' value={formData.sex} onChange={handleInputChange} />
              ) : (
                <h4>{member.sex}</h4> // Fixed: was incorrectly showing studentId
              )}
            </div>
            <div className='inforofadmin__context__list__box__item'>
              <span>Ngày sinh</span>
              {isEditing ? (
                <input
                  type='date'
                  name='birthday'
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              ) : (
                <h4>{member.birthday}</h4>
              )}
            </div>
          </div>
        </div>
        <h3>Thông tin tài khoản</h3>
        <div className='inforofadmin__context__item'>
          <div className='inforofadmin__context__item__box'>
            <span>Tên đăng nhập</span>
            {isEditing ? (
              <input
                type='text'
                name='username'
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <h4>{member.username}</h4>
            )}
          </div>
          <div className='inforofadmin__context__item__box'>
            <span>Mật khẩu</span>
            {isEditing ? (
              <input
                type='text'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            ) : (
              <h4>{maskPassword(member.password)}</h4>
            )}
          </div>
        </div>
        <div className='inforofadmin__context__button'>
          {isEditing ? (
            <>
              <button onClick={handleSave}>
                <Icon icon='material-symbols:save' width='20' height='20' />
                Lưu
              </button>
              <button onClick={handleCancel}>
                <Icon icon='material-symbols:cancel' width='20' height='20' />
                Hủy
              </button>
            </>
          ) : (
            <button onClick={handleEdit}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>

      <div className='inforofadmin__class'>
        <h3>Danh sách lớp học</h3>
        <div className='inforofadmin__class__list'>
          {memberClass.map((item, index) => (
            <div className='inforofadmin__class__list__item' key={index}>
              <div className='inforofadmin__class__list__item__img'></div>
              <div className='inforofadmin__class__list__item__box'>
                <div className='inforofadmin__class__list__item__box__start'>
                  <h4>{item.className}</h4>
                  <span className={item.style === 1 ? 'span1' : 'span2'}>{item.state}</span>
                </div>
                <span>{item.view}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InforOfAdmin
