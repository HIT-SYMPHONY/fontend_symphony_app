import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import useAuth from '../../hooks/useAuth'
import Logout from '../../components/Logout'
import icon from '../../assets/img/Ellipse.png'
import logo from '../../assets/img/logo.png'
import './style.scss'
import { getDisplayName } from '../../utils/formatters'

const AdminPage = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const isManageSectionActive =
    location.pathname.startsWith('/admin/classes') ||
    location.pathname.startsWith('/admin/competitions')
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(isManageSectionActive)

  useEffect(() => {
    setIsManageMenuOpen(isManageSectionActive)
  }, [isManageSectionActive])

  if (!user) {
    return <div>Loading...</div>
  }
  const userRole = user.authorities?.[0]?.authority

  const handleManageClick = () => {
    if (isManageSectionActive) {
      setIsManageMenuOpen((prevState) => !prevState)
    } else {
      navigate('/admin/classes')
    }
  }

  return (
    <div className='homepage admin-layout'>
      <aside className='homepage__choose'>
        <div className='homepage__choose__img'>
          <img src={user.imageUrl || icon} alt='Profile' />
        </div>
        <h3 className='homepage__choose__h3'>Chào {getDisplayName(user.fullName)}!</h3>

        <NavLink to='/admin/home' className='homepage__choose__click' end>
          <i className='fa-solid fa-house'></i>
          <span>Trang chủ</span>
        </NavLink>
        <div
          className={
            isManageSectionActive ? 'homepage__choose__click origin' : 'homepage__choose__click'
          }
          onClick={handleManageClick}>
          <Icon icon='mdi:book-account' width='22' height='22' />
          <span>Quản lý</span>
        </div>

        {isManageMenuOpen && (
          <div className='admin-sidebar-submenu'>
            <NavLink to='/admin/classes' className='homepage__choose__clickone' end>
              <Icon
                icon='fluent:book-star-24-regular'
                className='homepage__choose__clickone__Icon'
              />
              <span>Lớp học</span>
            </NavLink>
            <NavLink to='/admin/competitions' className='homepage__choose__clickone' end>
              <Icon
                icon='streamline-ultimate:ranking-stars-ribbon-bold'
                className='homepage__choose__clickone__Icon'
              />
              <span>Cuộc thi</span>
            </NavLink>
          </div>
        )}

        {userRole === 'ADMIN' && (
          <NavLink to='/admin/decent' className='homepage__choose__click' end>
            <Icon icon='fluent:people-star-24-filled' />
            <span>Phân quyền</span>
          </NavLink>
        )}

        <NavLink to='/admin/account' className='homepage__choose__click' end>
          <i className='fa-solid fa-circle-user'></i>
          <span>Tài khoản</span>
        </NavLink>

        <div className='homepage__choose__click' onClick={() => setShowLogoutPopup(true)}>
          <Icon icon='mage:shut-down-fill' />
          <span>Đăng xuất</span>
        </div>
      </aside>

      <main className='homepage__main'>
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
              <Icon
                icon='streamline-flex:mail-send-email-message-circle-solid'
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
        </div>
        <div className='admin-page-content'>
          <Outlet />
        </div>
      </main>

      {showLogoutPopup && <Logout onSetFrame={setShowLogoutPopup} />}
    </div>
  )
}

export default AdminPage
