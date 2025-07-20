import React, { useState, useEffect, useRef, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../dataContext'
import icon from './../../assets/img/Ellipse.png'
import logo from './../../assets/img/logo.png'
import AccountFrame from '../../components/StartAccount/AccountFrame'
import Logout from '../../components/Logout'
import './style.scss'

const HomeAccount = () => {
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

  const context = useContext(GlobalContext)
  const [sub, setSub] = useState(false)
  if (!context) {
    console.error('GlobalContext is undefined. Ensure HomePage is wrapped in GlobalProvider.')
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>
  }

  const { updateGlobalState, path, aspect } = context
  const k = 4
  return (
    <>
      <div className='homepage'>
        <div className='homepage__choose'>
          <div className='homepage__choose__img'>
            <img src={icon} alt='Profile' />
          </div>
          <h3 className='homepage__choose__h3'>Chào (tên)! </h3>
          <div
            className={path[k].home ? 'homepage__choose__click origin' : 'homepage__choose__click'}
            onClick={() => updateGlobalState(1)}>
            <i className='fa-solid fa-house'></i>
            <span>Trang chủ</span>
          </div>
          <div
            className={
              path[k].classroom ? 'homepage__choose__click origin' : 'homepage__choose__click'
            }
            onClick={() => {
              updateGlobalState(2)
            }}>
            <i className='fa-solid fa-book'></i>
            <span>Lớp học</span>
          </div>
          {path[k].show && (
            <div>
              <div
                className={
                  path[k].myclass
                    ? 'homepage__choose__clickone child'
                    : 'homepage__choose__clickone'
                }
                onClick={() => updateGlobalState(2)}>
                <Icon
                  icon='fluent:book-star-24-regular'
                  className='homepage__choose__clickone__Icon'
                />
                <span>Lớp của tôi</span>
              </div>
              <div
                className={
                  path[k].myresult
                    ? 'homepage__choose__clickone child'
                    : 'homepage__choose__clickone'
                }
                onClick={() => updateGlobalState(3)}>
                <Icon icon='carbon:result' className='homepage__choose__clickone__Icon' />
                <span>Bảng kết quả</span>
              </div>
            </div>
          )}
          <div
            className={
              path[k].competition ? 'homepage__choose__click origin' : 'homepage__choose__click'
            }
            onClick={() => updateGlobalState(4)}>
            <Icon
              icon='streamline-ultimate:ranking-stars-ribbon-bold'
              className='homepage__choose__click__Icon'
            />
            <span>Cuộc thi</span>
          </div>
          {aspect == 'LEADER' && (
            <div
              className={
                path[k].manage ? 'homepage__choose__click origin' : 'homepage__choose__click'
              }
              onClick={() => updateGlobalState(7)}>
              <Icon
                icon='mdi:book-account'
                className={
                  path[k].manage
                    ? 'homepage__choose__click__replace'
                    : 'homepage__choose__click__Icon'
                }
              />
              <span>Quản lý</span>
            </div>
          )}
          <div
            className={
              path[k].account ? 'homepage__choose__click origin' : 'homepage__choose__click'
            }
            onClick={() => updateGlobalState(5)}>
            <i className='fa-solid fa-circle-user'></i>
            <span>Tài khoản</span>
          </div>
          <div
            className={
              path[k].logout ? 'homepage__choose__click origin' : 'homepage__choose__click'
            }
            onClick={() => setFrame(true)}>
            <Icon icon='mage:shut-down-fill' className='homepage__choose__click__Icon' />
            <span>Đăng xuất</span>
          </div>
        </div>
        <div className='homepage__main'>
          <div className='homepage__main__search'>
            <div className='search'>
              <div className='search__icon'>
                <img src={logo} alt='Logo' width='50px' height='50px' />
                <div className='search__icon__box'>
                  <input type='text' placeholder='Tìm kiếm...' />
                  <i className='fa-solid fa-magnifying-glass'></i>
                </div>
              </div>
              <div className='search__then'>
                {showMain ? (
                  <Icon
                    icon='line-md:menu-unfold-left'
                    width='26'
                    height='26'
                    className='search__then__Icon'
                    onClick={() => setShowMain(!showMain)}
                  />
                ) : (
                  <div>
                    <Icon
                      icon='line-md:menu-unfold-right'
                      width='26'
                      height='26'
                      className='search__then__Icon'
                      onClick={() => setShowMain(!showMain)}
                    />
                    <Icon
                      icon='streamline-flex:mail-send-email-message-circle-solid'
                      width='26'
                      height='26'
                      className='search__then__Icon'
                    />
                  </div>
                )}
                <Icon
                  icon='hugeicons:message-notification-01'
                  width='26'
                  height='26'
                  className='search__then__Icon'
                />
                <Icon
                  icon='mingcute:notification-newdot-line'
                  width='26'
                  height='26'
                  className='search__then__Icon'
                />
              </div>
            </div>

            <div className='account'>
              <div className='account__symbol'>
                <i className='fa-solid fa-circle-user'></i>
                <h3>Tài Khoản</h3>
              </div>
              <div className='account__user'>
                <div className='account__user__img'>
                  <i className='fa-solid fa-upload'></i>
                  <p>Tải ảnh lên</p>
                </div>
                <h2>HỌ VÀ TÊN</h2>
              </div>
              <div className='account__information'>
                <div className='account__information__fix'>
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
                <div className='account__information__thongtin'>
                  <div className='account__info-item'>
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
                  <div className='account__info-item'>
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
                  <div className='account__info-item'>
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
                  <div className='account__info-item'>
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
                  <div className='account__info-item'>
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
                  <div className='account__info-item'>
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
              <div className='account__taikhoan'>
                <div className='account__taikhoan__fix'>
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

                <div className='account__taikhoan__context'>
                  <div className='account__taikhoan__info-item'>
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
                  <div className='account__taikhoan__info-item'>
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
          </div>
        </div>
        {sub && <AccountFrame onSetSub={setSub} />}
        {frame ? <Logout onSetFrame={setFrame} /> : ''}
      </div>
    </>
  )
}

export default HomeAccount
