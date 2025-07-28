import React, { useState, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../dataContext'
import { useNavigate } from 'react-router-dom'
import icon from './../../assets/img/Ellipse.png'
import { Outlet } from 'react-router-dom'
import logo from './../../assets/img/logo.png'
import Schedule from '../SchedulePage'
import Homework from '../Homework'
import Logout from '../../components/Logout'
import Main from '../../components/StartHomePage/MainPage'
import DataInitialState from '../../data/dataSV'
import MainOfAdmin from '../../components/Admin/HomeOfAdmin/MainOfAdmin'
import CreateOfMain from '../../components/Admin/HomeOfAdmin/CreateOfMain'
import InforOfAdmin from '../../components/Admin/HomeOfAdmin/InforOfAdmin'
import MainOfClassAdmin from '../../components/Admin/ClassOfAdmin/MainOfClass'
import CreateOfClassAdmin from '../../components/Admin/ClassOfAdmin/CreateOfClass'
import CheckOfClassAdmin from '../../components/Admin/ClassOfAdmin/CheckOfClass'
import MainOfCompet from '../../components/Admin/CompetOfAdmin/MainOfCompet'
import CreateOfCompetAdmin from '../../components/Admin/CompetOfAdmin/CreateOfCompet'
import IntroOfCompetAdmin from '../../components/Admin/CompetOfAdmin/IntroOfCompet'
import RolusOfCompetAdmin from '../../components/Admin/CompetOfAdmin/RolusOfAdmin'
import MemberOfCompetAdmin from '../../components/Admin/ClassOfAdmin/MemberOfAdmin'
import ReplaceOfAdmin from '../../components/Admin/NotiOfAdmin/ReplaceOfNoti'
import CreateOfHomeAdmin from '../../components/Admin/HomeOfAdmin/CreateOfMain'
import CreateOfNoti from '../../components/Admin/NotiOfAdmin/CreateOfNoti'

import './style.scss'

const AdminPage = () => {
  const { showMain, setShowMain, showNoti, setShowNoti } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [frame, setFrame] = useState(false)

  // Khởi tạo trạng thái từ localStorage hoặc giá trị mặc định
  const [showThen, setShowThen] = useState(() => {
    const saved = localStorage.getItem('showThen')
    return saved ? JSON.parse(saved) : { one: false, two: false }
  })

  const [showManage, setShowManage] = useState(false)

  const [showLink, setShowLink] = useState(() => {
    const saved = localStorage.getItem('showLink')
    return saved
      ? JSON.parse(saved)
      : { home: false, manage: false, decent: false, account: false, logout: false }
  })

  // Lưu showThen vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('showThen', JSON.stringify(showThen))
  }, [showThen])

  // Lưu showLink vào localStorage khi nó thay đổi
  useEffect(() => {
    localStorage.setItem('showLink', JSON.stringify(showLink))
  }, [showLink])

  const handleThen = (index) => {
    const then = {
      one: false,
      two: false,
    }
    switch (index) {
      case 1:
        navigate('/admin/manage')
        handleColor(6)
        then.one = true
        break
      case 2:
        navigate('/admin/competition')
        handleColor(6)
        then.two = true
        break
      default:
        break
    }
    setShowThen(then)
  }

  const handleColor = (index) => {
    let newLink = {
      home: false,
      manage: false,
      decent: false,
      account: false,
      logout: false,
    }

    switch (index) {
      case 1:
        handleThen(0)
        newLink.home = true
        navigate('/admin/home')
        break
      case 2:
        setShowManage(!showManage)
        handleThen(1)
        navigate('/admin/manage')
        newLink.manage = true
        break
      case 3:
        navigate('/admin/decent')
        handleThen(0)
        newLink.decent = true
        break
      case 4:
        navigate('/admin/account')
        handleThen(0)
        newLink.account = true
        break
      case 5:
        handleThen(0)
        newLink.logout = true
        break
      case 6:
        newLink.manage = true
        break
      default:
        handleThen(0)
        break
    }

    setShowLink(newLink)
  }

  const handleLogout = (index) => {
    handleColor(5)
    setFrame(true)
  }

  return (
    <div className='homepage'>
      <div className='homepage__choose'>
        <div className='homepage__choose__img'>
          <img src={icon} alt='Profile' />
        </div>
        <h3 className='homepage__choose__h3'>Chào Tên!</h3>
        <div
          className={showLink.home ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleColor(1)}>
          <i className='fa-solid fa-house'></i>
          <span>Trang chủ</span>
        </div>
        <div
          className={showLink.manage ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleColor(2)}>
          <Icon
            icon='mdi:book-account'
            width='22'
            height='22'
            className='homepage__choose__click__Icon'
          />
          <span>Quản lý</span>
        </div>
        {showManage ? (
          <div>
            <div
              className={
                showThen.one ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
              }
              onClick={() => handleThen(1)}>
              <Icon
                icon='fluent:book-star-24-regular'
                className='homepage__choose__clickone__Icon'
              />
              <span>Lớp học</span>
            </div>
            <div
              className={
                showThen.two ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
              }
              onClick={() => handleThen(2)}>
              <Icon
                icon='streamline-ultimate:ranking-stars-ribbon-bold'
                className='homepage__choose__clickone__Icon'
              />
              <span>Cuộc thi</span>
            </div>
          </div>
        ) : (
          ''
        )}
        <div
          className={showLink.decent ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleColor(3)}>
          <Icon icon='fluent:people-star-24-filled' className='homepage__choose__click__Icon' />
          <span>Phân quyền</span>
        </div>
        <div
          className={
            showLink.account ? 'homepage__choose__click origin' : 'homepage__choose__click'
          }
          onClick={() => handleColor(4)}>
          <i className='fa-solid fa-circle-user'></i>
          <span>Tài khoản</span>
        </div>
        <div
          className={showLink.logout ? 'homepage__choose__click origin' : 'homepage__choose__click'}
          onClick={() => handleLogout(5)}>
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
