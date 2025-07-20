import React, { useState, useEffect, useRef, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../dataContext'
import icon from './../../../assets/img/Ellipse.png'
import logo from './../../../assets/img/logo.png'
import MainCompetition from '../MainPage'
import InformationCompetition from '../InformationPage'
import Assignment from '../Assignment'
import MainFrame from '../MainFrame'
import Logout from '../../Logout'
import Complete from '../Complete'

const PublicPage = () => {
  const [frame, setFrame] = useState(false)
  const [open, setOpen] = useState(false)
  const context = useContext(GlobalContext)
  const [sub, setSub] = useState(false)
  const [showMain, setShowMain] = useState(true)

  if (!context) {
    console.error('GlobalContext is undefined. Ensure PublicPage is wrapped in GlobalProvider.')
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>
  }

  const { updateGlobalState, path, aspect } = context
  const k = 3

  const handleLichHoc = () => {
    // Logic cho "Lịch học" (có thể thêm trạng thái showSchedule nếu cần)
    console.log('Lịch học clicked')
  }

  const handleBaiTap = () => {
    console.log('Bài tập clicked')
  }

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
                    <button className='search__then__button' onClick={handleLichHoc}>
                      Lịch học
                    </button>
                    <button className='search__then__button' onClick={handleBaiTap}>
                      Bài tập
                    </button>
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
            <Outlet context={{ onSetSub: setSub, open: open }} />
          </div>
        </div>
        {sub && <MainFrame onSetSub={setSub} setOpen={setOpen} />}
        {frame ? <Logout onSetFrame={setFrame} /> : ''}
      </div>
    </>
  )
}

export default PublicPage
