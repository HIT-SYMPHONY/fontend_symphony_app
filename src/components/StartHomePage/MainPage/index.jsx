import React from 'react'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getMyNotifications } from '../../../apis/notification.api'
import { getMyClasses } from '../../../apis/user.api'
import { formatDate } from '../../../utils/formatters'
import TextMessage from '../../TextMessage'
import NotificationsSwiper from '../NotificationsSwiper'
import './style.scss'

const Main = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const globalSearch = searchParams.get('q') || ''

  // 1. Fetch Dashboard Data (Notifications)
  const { data: notifications = [], isLoading: isLoadingNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const response = await getMyNotifications({ pageNum: 1, pageSize: 15 })
        return response.data?.items || []
      } catch (error) {
        toast.error('Không thể tải thông báo.')
        return []
      }
    },
  })

  // 2. Fetch Classes for Display
  const { data: recentClasses = [], isLoading: isLoadingClasses } = useQuery({
    queryKey: ['my-classes', globalSearch],
    queryFn: async () => {
      try {
        const params = { keyword: globalSearch || null }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getMyClasses(filteredParams)
        return response.data || []
      } catch (error) {
        toast.error('Không thể tải danh sách lớp học.')
        return []
      }
    },
  })

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
          <h2>Thông báo</h2>
        </div>
        <NotificationsSwiper notifications={notifications} isLoading={isLoadingNotifications} />
      </div>
      <div className='flex-one__plus'>
        <div className='plus'>
          <Icon icon='fluent:book-star-24-regular' width='25' height='25' className='plus__Icon' />
          <h2>Lớp học gần đây</h2>
        </div>
        <div className='class-ago thay2'>
          {isLoadingClasses ? (
            <TextMessage text='Đang tải lớp học...' />
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
            <TextMessage
              text={
                globalSearch
                  ? 'Không tìm thấy lớp học nào phù hợp.'
                  : 'Bạn chưa tham gia lớp học nào.'
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Main
