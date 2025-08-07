import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import { ApiConstant } from '../../constants/api.constant'
import Logout from '../../components/Logout'
import Main from '../../components/StartHomePage/MainPage'
import AllClassroom from '../../components/StartClassPage/StartMyClass/AllClassroom'
import Schedule from '../SchedulePage'
import Homework from '../Homework'
import icon from '../../assets/img/Ellipse.png'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import './style.scss'
import { getDisplayName } from '../../utils/formatters'

const DashboardOfMain = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showHomework, setShowHomework] = useState(false)
  const [isClassroomMenuOpen, setClassroomMenuOpen] = useState(false)
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false)

  const handleLichHoc = () => {
    if (showHomework) setShowHomework(false)
    setShowSchedule(!showSchedule)
  }

  const handleBaiTap = () => {
    if (showSchedule) setShowSchedule(false)
    setShowHomework(!showHomework)
  }

  if (!user) {
    return <div>Loading user information...</div>
  }

  return (
    <div className='homepage'>
      <div className='homepage__choose'>
        <div className='homepage__choose__img'>
          <img src={user.imageUrl || icon} alt='Profile' />
        </div>
        <h3 className='homepage__choose__h3'>Chào {getDisplayName(user.fullName)}!</h3>

        <NavLink to='/home' className='homepage__choose__click'>
          <i className='fa-solid fa-house'></i>
          <span>Trang chủ</span>
        </NavLink>

        <NavLink
          to='my-classes'
          className='homepage__choose__click'
          onClick={() => setClassroomMenuOpen(!isClassroomMenuOpen)}>
          <i className='fa-solid fa-book'></i>
          <span>Lớp học</span>
        </NavLink>

        {isClassroomMenuOpen && (
          <div>
            <NavLink to='/my-classes' className='homepage__choose__clickone'>
              <Icon
                icon='fluent:book-star-24-regular'
                className='homepage__choose__clickone__Icon'
              />
              <span>Lớp của tôi</span>
            </NavLink>
            <NavLink to='/my-results' className='homepage__choose__clickone'>
              <Icon icon='carbon:result' className='homepage__choose__clickone__Icon' />
              <span>Bảng kết quả</span>
            </NavLink>
          </div>
        )}

        <NavLink to='/competitions' className='homepage__choose__click'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            className='homepage__choose__click__Icon'
          />
          <span>Cuộc thi</span>
        </NavLink>

        {user.authorities?.[0]?.authority === 'LEADER' && (
          <>
            <NavLink
              to='/manage'
              className='homepage__choose__click'
              onClick={() => setIsManageMenuOpen(!isManageMenuOpen)}>
              <Icon icon='mdi:book-account' className='homepage__choose__click__Icon' />
              <span>Quản lý</span>
            </NavLink>
            {isManageMenuOpen && (
              <div>
                <NavLink to='/manage/classes' className='homepage__choose__clickone'>
                  <Icon
                    icon='fluent:book-star-24-regular'
                    className='homepage__choose__clickone__Icon'
                  />
                  <span>Lớp học</span>
                </NavLink>
                <NavLink to='/manage/competitions' className='homepage__choose__clickone'>
                  <Icon icon='carbon:result' className='homepage__choose__clickone__Icon' />
                  <span>Cuộc thi</span>
                </NavLink>
              </div>
            )}
          </>
        )}

        <NavLink to='account' className='homepage__choose__click'>
          <i className='fa-solid fa-circle-user'></i>
          <span>Tài khoản</span>
        </NavLink>

        <div className='homepage__choose__click' onClick={() => setShowLogoutPopup(true)}>
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
                <div>
                  <Icon
                    icon='line-md:menu-unfold-right'
                    width='26'
                    height='26'
                    className='search__then__Icon'
                    onClick={() => setShowMain(!showMain)}
                  />
                  <button className='search__then__button' onClick={handleLichHoc}>
                    Lịch học
                  </button>
                  <button className='search__then__button' onClick={handleBaiTap}>
                    Bài tập
                  </button>
                </div>
              ) : (
                <Icon
                  icon='line-md:menu-unfold-left'
                  width='26'
                  height='26'
                  className='search__then__Icon'
                  onClick={() => setShowMain(!showMain)}
                />
              )}
              <Icon
                icon='hugeicons:message-notification-01'
                width='26'
                height='26'
                className='search__then__Icon'
                onClick={() => navigate('/chat')}
              />
              <Icon
                icon='mingcute:notification-newdot-line'
                width='26'
                height='26'
                className='search__then__Icon'
              />
            </div>
          </div>

          <div className='context-main'>
            <Outlet />
            {showSchedule && showMain && <Schedule />}
            {showHomework && showMain && <Homework />}
          </div>
        </div>
      </div>

      {showLogoutPopup && <Logout onSetFrame={setShowLogoutPopup} />}
    </div>
  )
}

export default DashboardOfMain
