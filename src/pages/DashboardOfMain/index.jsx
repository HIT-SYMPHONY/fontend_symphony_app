import React, { useEffect, useState, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import useAuth from '../../hooks/useAuth'
import Logout from '../../components/Logout'
import Schedule from '../SchedulePage'
import Homework from '../Homework'
import icon from '../../assets/img/Ellipse.png'
import logo from '../../assets/img/logo.png'
import { getDisplayNameForUser } from '../../utils/formatters'
import useDebounce from '../../hooks/useDebounce'
import { NON_SEARCHABLE_PATHS } from 'constants/commonConstant'
import './style.scss'
const DashboardOfMain = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [liveSearch, setLiveSearch] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(liveSearch, 500)

  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showHomework, setShowHomework] = useState(false)

  const isMyClassroomActive =
    location.pathname.startsWith('/my-classes') || location.pathname.startsWith('/my-results')
  const isManageMenuActive = location.pathname.startsWith('/manage')
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(isManageMenuActive)
  const [isClassroomMenuOpen, setClassroomMenuOpen] = useState(isMyClassroomActive)
  const isSearchDisabled = useMemo(() => {
    return NON_SEARCHABLE_PATHS.some((path) => location.pathname.startsWith(path))
  }, [location.pathname])

  useEffect(() => {
    setClassroomMenuOpen(isMyClassroomActive)
  }, [isMyClassroomActive])

  useEffect(() => {
    setIsManageMenuOpen(isManageMenuActive)
  }, [isManageMenuActive])
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)
    if (!isSearchDisabled && debouncedSearch) {
      newParams.set('q', debouncedSearch)
    } else {
      newParams.delete('q')
    }
    setSearchParams(newParams, { replace: true })
  }, [debouncedSearch, isSearchDisabled, setSearchParams])
  useEffect(() => {
    if (isSearchDisabled) {
      setLiveSearch('')
    }
  }, [isSearchDisabled])

  const handleClassroomClick = () => {
    if (isMyClassroomActive) {
      setClassroomMenuOpen((prevState) => !prevState)
    } else {
      navigate('/my-classes')
    }
  }

  const handleManageClick = () => {
    if (isManageMenuActive) {
      setIsManageMenuOpen((prevState) => !prevState)
    } else {
      navigate('/manage/classes')
    }
  }

  const handleLichHoc = () => {
    if (showHomework) setShowHomework(false)
    setShowSchedule(!showSchedule)
  }

  const handleBaiTap = () => {
    if (showSchedule) setShowSchedule(false)
    setShowHomework(!showHomework)
  }

  return (
    <div className='homepage'>
      <aside className='homepage__choose'>
        <div className='homepage__choose__img'>
          <img src={user.imageUrl || icon} alt='Profile' />
        </div>
        <h3 className='homepage__choose__h3'>Chào {getDisplayNameForUser(user)}!</h3>

        <NavLink to='/home' className='homepage__choose__click' end>
          <i className='fa-solid fa-house'></i>
          <span>Trang chủ</span>
        </NavLink>

        <div
          className={
            isMyClassroomActive ? 'homepage__choose__click origin' : 'homepage__choose__click'
          }
          onClick={handleClassroomClick}>
          <i className='fa-solid fa-book'></i>
          <span>Lớp học</span>
        </div>

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
            <div
              className={
                isManageMenuActive ? 'homepage__choose__click origin' : 'homepage__choose__click'
              }
              onClick={handleManageClick}>
              <Icon icon='mdi:book-account' className='homepage__choose__click__Icon' />
              <span>Quản lý</span>
            </div>
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

        <NavLink to='account' className='homepage__choose__click' end>
          <i className='fa-solid fa-circle-user'></i>
          <span>Tài khoản</span>
        </NavLink>

        <div className='homepage__choose__click' onClick={() => setShowLogoutPopup(true)}>
          <Icon icon='mage:shut-down-fill' className='homepage__choose__click__Icon' />
          <span>Đăng xuất</span>
        </div>
      </aside>

      <main className='homepage__main'>
        <div className='homepage__main__search'>
          <div className='search'>
            <div className='search__icon'>
              <img src={logo} alt='Logo' width='50px' height='50px' />
              <div
                className={`search__icon__box ${
                  isSearchDisabled ? 'search__icon__box--disabled' : ''
                }`}>
                <input
                  type='text'
                  placeholder={isSearchDisabled ? 'Tìm kiếm không áp dụng' : 'Tìm kiếm...'}
                  value={liveSearch}
                  onChange={(e) => setLiveSearch(e.target.value)}
                  disabled={isSearchDisabled}
                />
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
      </main>

      {showLogoutPopup && <Logout onSetFrame={setShowLogoutPopup} />}
    </div>
  )
}

export default DashboardOfMain
