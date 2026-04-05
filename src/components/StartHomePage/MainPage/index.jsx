import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Skeleton } from 'antd'
import { getMyNotifications } from '../../../apis/notification.api'
import { getMyClasses, getMyCompetitions } from '../../../apis/user.api'
import { formatDate } from '../../../utils/formatters'
import { Client } from '@stomp/stompjs'
import { LocalStorage } from 'constants/localStorage.constant'
import TextMessage from '../../TextMessage'
import NotificationsSwiper from '../NotificationsSwiper'
import './style.scss'
import { notificationKeys, userKeys } from 'constants/queryKeys'

const Main = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const globalSearch = searchParams.get('q') || ''
  const notifParams = { pageNum: 1, pageSize: 10 }
  const params = { keyword: globalSearch || null }
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v != null),
  )

  // 1. Fetch Dashboard Data (Notifications)
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: notificationKeys.myNotifications(notifParams),
    queryFn: async () => {
      try {
        const response = await getMyNotifications({ pageNum: 1, pageSize: 10 })
        return response.data?.items || []
      } catch (error) {
        toast.error('Không thể tải thông báo.')
        return []
      }
    },
  })

  // 2. Fetch Classes for Display
  const { data: recentClasses, isLoading: isLoadingClasses } = useQuery({
    queryKey: userKeys.myClasses(filteredParams),
    queryFn: async () => {
      try {
        const response = await getMyClasses(filteredParams)
        return response.data || []
      } catch (error) {
        toast.error('Không thể tải danh sách lớp học.')
        return []
      }
    },
  })

  // 3. Fetch Competitions for WebSocket subscription
  const { data: competitions } = useQuery({
    queryKey: userKeys.myCompetitions(),
    queryFn: () => getMyCompetitions({}),
    select: (data) => data.data?.items || [],
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!recentClasses || !competitions) {
      return
    }

    const authData = JSON.parse(localStorage.getItem(LocalStorage.auth))
    const accessToken = authData?.accessToken

    if (!accessToken) {
      return
    }

    const handleMessage = (message) => {
      const notification = JSON.parse(message.body)
      // Update swiper cache
      queryClient.setQueryData(
        notificationKeys.myNotifications(notifParams),
        (oldData) => {
          const data = oldData || []
          const newData = [notification, ...data]
          return newData.slice(0, 10)
        },
      )
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        recentClasses.forEach((classroom) => {
          client.subscribe(
            `/topic/classrooms/${classroom.id}/notifications`,
            handleMessage,
          )
        })
        competitions.forEach((competition) => {
          client.subscribe(
            `/topic/competitions/${competition.id}/notifications`,
            handleMessage,
          )
        })
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      },
    })

    client.activate()

    return () => {
      client.deactivate()
    }
  }, [queryClient, recentClasses, competitions])

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
        <NotificationsSwiper
          notifications={notifications || []}
          isLoading={isLoadingNotifications}
        />
      </div>
      <div className='flex-one__plus'>
        <div className='plus'>
          <Icon
            icon='fluent:book-star-24-regular'
            width='25'
            height='25'
            className='plus__Icon'
          />
          <h2>Lớp học gần đây</h2>
        </div>
        <div className='class-ago thay2'>
          {isLoadingClasses ? (
            // Render 4 Skeleton cards while loading
            Array.from({ length: 4 }).map((_, index) => (
              <div className='class-ago__box' key={`skeleton-${index}`}>
                <div
                  className='class-ago__thumbnail'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f5f5',
                  }}>
                  <Skeleton.Image
                    active
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div className='class-ago__content'>
                  {/* Fake Button */}
                  <Skeleton.Button
                    active
                    size='small'
                    shape='round'
                    style={{ width: 80, marginBottom: 16 }}
                  />
                  {/* Fake Title and Subtitles */}
                  <Skeleton
                    active
                    paragraph={{ rows: 2, width: ['60%', '80%'] }}
                    title={{ width: '90%' }}
                  />
                </div>
              </div>
            ))
          ) : recentClasses && recentClasses.length > 0 ? (
            recentClasses?.map((item) => (
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
                  <h2 className='class-ago__content__title ellipsis'>
                    {item.name}
                  </h2>
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
