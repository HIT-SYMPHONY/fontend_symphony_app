import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// Import the specific API functions
import { getNotificationsForCurrentUser } from '../../../apis/notification.api'
import { getMyClasses } from '../../../apis/user.api'

import { formatDate } from '../../../utils/formatters'
import AdvList from '../ClassAgo/index'
import './style.scss'
import TextMessage from '../../TextMessage'

const Main = () => {
  const navigate = useNavigate()

  const [announcements, setAnnouncements] = useState([])
  const [recentClasses, setRecentClasses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const [notificationsResponse, classesResponse] = await Promise.all([
          getNotificationsForCurrentUser({ pageNum: 1, pageSize: 15 }),
          getMyClasses(),
        ])

        setAnnouncements(notificationsResponse.data?.items || [])
        setRecentClasses(classesResponse.data || [])
      } catch (error) {
        toast.error('Không thể tải dữ liệu trang chủ.')
        console.error('Dashboard fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className='flex-one'>
      <div className='flex-one__thongbao'>
        <div className='thongbao'>
          <Icon
            icon='mingcute:notification-newdot-line'
            width='25'
            height='25'
            className='thongbao__Icon'
          />
          <h3>Thông báo</h3>
        </div>
        <AdvList announcements={announcements} isLoading={loading} />
      </div>
      <div className='flex-one__plus'>
        <div className='plus'>
          <Icon icon='fluent:book-star-24-regular' width='25' height='25' className='plus__Icon' />
          <h3>Lớp học gần đây</h3>
        </div>
        <div className='class-ago thay2'>
          {loading ? (
            <TextMessage text='Đang tải lớp học...'></TextMessage>
          ) : recentClasses.length > 0 ? (
            recentClasses.map((item) => (
              <div className='class-ago__box' key={item.id}>
                <div className='class-ago__thumbnail'>
                  {item.image && <img src={item.image} alt={item.name} />}
                </div>
                <div className='class-ago__content'>
                  <button
                    className='class-ago__button'
                    onClick={() => {
                      console.log(item.id)
                      navigate(`/my-classes/${item.id}`)
                    }}>
                    VÀO HỌC
                  </button>
                  <h2 className='class-ago__content__title ellipsis'>{item.name}</h2>
                  <p className='class-ago__content__info'>
                    <span className='icon'>
                      <Icon icon='mdi:badge-account' />
                    </span>
                    Leader: {item.leaderName || 'N/A'}
                  </p>
                  <p className='class-ago__content__info'>
                    <span className='icon'>
                      <Icon icon='mingcute:time-line' />
                    </span>
                    Ngày bắt đầu: {formatDate(item.startTime)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Bạn chưa tham gia lớp học nào.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
