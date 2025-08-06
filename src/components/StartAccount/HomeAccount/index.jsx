import React, { useState, useEffect, useRef, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../dataContext'
import icon from './../../../assets/img/Ellipse.png'
import logo from './../../../assets/img/logo.png'
import accountFrame from '../accountFrame'
import Logout from '../../Logout'
import './style.scss'

const Homeaccount = () => {
  const [frame, setFrame] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    khoa: 'HIT 15',
    gioiTinh: 'Nữ',
    ngaySinh: '02/02/2002',
    email: 'nhm01234@gmail.com',
    sdt: '0123456789',
    maSV: '202015232',
    tenDangNhap: '202015232',
    matKhau: '********',
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const [sub, setSub] = useState(false)

  return (
    <>
      <div className='accountA'>
        <div className='accountA__symbol'>
          <i className='fa-solid fa-circle-user'></i>
          <h3>Tài Khoản</h3>
        </div>
        <div className='accountA__user'>
          <div className='accountA__user__img'>
            <i className='fa-solid fa-upload'></i>
            <p>Tải ảnh lên</p>
          </div>
          <h2>HỌ VÀ TÊN</h2>
        </div>
        <div className='accountA__information'>
          <div className='accountA__information__fix'>
            <h5>Thông tin cá nhân</h5>
            <span onClick={handleEdit}>
              {isEditing ? (
                'Lưu'
              ) : (
                <>
                  <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
                </>
              )}
            </span>
          </div>
          <div className='accountA__information__thongtin'>
            <div className='accountA__info-item'>
              <span>Khóa</span>
              {isEditing ? (
                <input
                  type='text'
                  name='khoa'
                  value={personalInfo.khoa}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.khoa}</span>
              )}
            </div>
            <div className='accountA__info-item'>
              <span>Giới tính</span>
              {isEditing ? (
                <input
                  type='text'
                  name='gioiTinh'
                  value={personalInfo.gioiTinh}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.gioiTinh}</span>
              )}
            </div>
            <div className='accountA__info-item'>
              <span>Ngày sinh</span>
              {isEditing ? (
                <input
                  type='text'
                  name='ngaySinh'
                  value={personalInfo.ngaySinh}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.ngaySinh}</span>
              )}
            </div>
            <div className='accountA__info-item'>
              <span>Email</span>
              {isEditing ? (
                <input
                  type='text'
                  name='email'
                  value={personalInfo.email}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.email}</span>
              )}
            </div>
            <div className='accountA__info-item'>
              <span>SĐ điện thoại</span>
              {isEditing ? (
                <input
                  type='text'
                  name='sdt'
                  value={personalInfo.sdt}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.sdt}</span>
              )}
            </div>
            <div className='accountA__info-item'>
              <span>Mã sv</span>
              {isEditing ? (
                <input
                  type='text'
                  name='maSV'
                  value={personalInfo.maSV}
                  onChange={handleChange}
                  className='edit-input'
                />
              ) : (
                <span>{personalInfo.maSV}</span>
              )}
            </div>
          </div>
        </div>
        <div className='accountA__taikhoan'>
          <div className='accountA__taikhoan__fix'>
            <h4>Thông tin tài khoản</h4>
            <span onClick={() => setSub(true)}>
              {sub ? (
                'Lưu'
              ) : (
                <>
                  <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
                </>
              )}
            </span>
          </div>

          <div className='accountA__taikhoan__context'>
            <div className='accountA__taikhoan__info-item'>
              <span>Tên đăng nhập</span>
              {/* {isEditing ? (
                      <input
                        type="text"
                        name="tenDangNhap"
                        value={personalInfo.tenDangNhap}
                        className="edit-input"
                      />
                    ) : (
                      <span>{personalInfo.tenDangNhap}</span>
                    )} */}
              <span>{personalInfo.tenDangNhap}</span>
            </div>
            <div className='accountA__taikhoan__info-item'>
              <span>Mật khẩu</span>
              {/* {isEditing ? (
                      <input
                        type="text"
                        name="matKhau"
                        value={personalInfo.matKhau}
                        onChange={handleChange}
                        className="edit-input"
                      />
                    ) : (
                      <span>{personalInfo.matKhau}</span>
                    )} */}
              <span>{personalInfo.matKhau}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Homeaccount
