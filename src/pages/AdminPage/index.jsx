import React, { useState, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../dataContext'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import icon from './../../assets/img/Ellipse.png'
import logo from './../../assets/img/logo.png'
import Logout from '../../components/Logout'
import ReplaceOfAdmin from '../../components/Admin/NotiOfAdmin/ReplaceOfNoti'
import CreateOfNoti from '../../components/Admin/NotiOfAdmin/CreateOfNoti'
import './style.scss'

const AdminPage = () => {
  const { showMain, setShowMain, showNoti, setShowNoti } = useContext(GlobalContext)
  const [frame, setFrame] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Khởi tạo trạng thái từ localStorage hoặc giá trị mặc định
  const [showThen, setShowThen] = useState(() => {
    const saved = localStorage.getItem('showThen')
    return saved ? JSON.parse(saved) : { one: false, two: false }
  })

  const [showLink, setShowLink] = useState(() => {
    const saved = localStorage.getItem('showLink')
    return saved
      ? JSON.parse(saved)
      : { home: false, manage: false, decent: false, account: false, logout: false }
  })

  // Đồng bộ trạng thái với URL khi trang tải
  useEffect(() => {
    const path = location.pathname
    const newLink = {
      home: false,
      manage: false,
      decent: false,
      account: false,
      logout: false,
    }
    const newThen = { one: false, two: false }

    if (path === '/admin' || path.startsWith('/admin/home')) {
      newLink.home = true
      setShowManage(false)
    } else if (path.startsWith('/admin/manage')) {
      newLink.manage = true
      newThen.one = true
      setShowManage(true)
    } else if (path.startsWith('/admin/competition')) {
      newLink.manage = true
      newThen.two = true
      setShowManage(true)
    } else if (path.startsWith('/admin/decent')) {
      newLink.decent = true
      setShowManage(false)
    } else if (path.startsWith('/admin/account')) {
      newLink.account = true
      setShowManage(false)
    }

    setShowLink(newLink)
    setShowThen(newThen)
    localStorage.setItem('showLink', JSON.stringify(newLink))
    localStorage.setItem('showThen', JSON.stringify(newThen))
  }, [location.pathname])

  // Lưu showThen vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('showThen', JSON.stringify(showThen))
  }, [showThen])

  // Lưu showLink vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('showLink', JSON.stringify(showLink))
  }, [showLink])

  // Hàm xử lý trạng thái khi nhấp vào liên kết
  const handleLinkClick = (section) => {
    const newLink = {
      home: false,
      manage: false,
      decent: false,
      account: false,
      logout: false,
    }
    const newThen = { one: false, two: false }

    switch (section) {
      case 'home':
        newLink.home = true
        setShowManage(false)
        navigate('/admin/home')
        break
      case 'manage':
        newLink.manage = true
        newThen.one = true // Highlight "Lớp học"
        setShowManage(true)
        navigate('/admin/manage') // Điều hướng về /admin/manage
        break
      case 'class':
        newLink.manage = true
        newThen.one = true
        setShowManage(true)
        navigate('/admin/manage')
        break
      case 'competition':
        newLink.manage = true
        newThen.two = true
        setShowManage(true)
        navigate('/admin/competition')
        break
      case 'decent':
        newLink.decent = true
        setShowManage(false)
        navigate('/admin/decent')
        break
      case 'account':
        newLink.account = true
        setShowManage(false)
        navigate('/admin/account')
        break
      case 'logout':
        newLink.logout = true
        setFrame(true)
        setShowManage(false)
        break
      default:
        break
    }

    setShowLink(newLink)
    setShowThen(newThen)
  }

  return (
    <div className='homepage'>
      <div className='homepage__choose'>
        <div className='homepage__choose__img'>
          <img src={icon} alt='Profile' />
        </div>
        <h3 className='homepage__choose__h3'>Chào Tên!</h3>
        <Link
          to='/admin/home'
          className={showLink.home ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleLinkClick('home')}>
          <i className='fa-solid fa-house'></i>
          <span>Trang chủ</span>
        </Link>
        <div
          className={showLink.manage ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleLinkClick('manage')}>
          <Icon
            icon='mdi:book-account'
            width='22'
            height='22'
            className={showLink.manage ? 'whiteP' : 'homepage__choose__click__Icon'}
          />
          <span>Quản lý</span>
        </div>
        {showManage && (
          <div>
            <Link
              to='/admin/manage'
              className={
                showThen.one ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
              }
              onClick={() => handleLinkClick('class')}>
              <Icon
                icon='fluent:book-star-24-regular'
                className='homepage__choose__clickone__Icon'
              />
              <span>Lớp học</span>
            </Link>
            <Link
              to='/admin/competition'
              className={
                showThen.two ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
              }
              onClick={() => handleLinkClick('competition')}>
              <Icon
                icon='streamline-ultimate:ranking-stars-ribbon-bold'
                className='homepage__choose__clickone__Icon'
              />
              <span>Cuộc thi</span>
            </Link>
          </div>
        )}
        <Link
          to='/admin/decent'
          className={showLink.decent ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleLinkClick('decent')}>
          <Icon
            icon='fluent:people-star-24-filled'
            className={showLink.decent ? 'whiteP' : 'homepage__choose__click__Icon'}
          />
          <span>Phân quyền</span>
        </Link>
        <Link
          to='/admin/account'
          className={
            showLink.account ? 'homepage__choose__click origin' : 'homepage__choose__click'
          }
          onClick={() => handleLinkClick('account')}>
          <i className='fa-solid fa-circle-user'></i>
          <span>Tài khoản</span>
        </Link>
        <div
          className={showLink.logout ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleLinkClick('logout')}>
          <Icon
            icon='mage:shut-down-fill'
            className={showLink.logout ? 'whiteP' : 'homepage__choose__click__Icon'}
          />
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
          <Outlet />
        </div>
      </div>
      {frame ? <Logout onSetFrame={setFrame} /> : ''}
      {showMain ? <ReplaceOfAdmin /> : ''}
      {showNoti ? <CreateOfNoti /> : ''}
    </div>
  )
}

export default AdminPage
