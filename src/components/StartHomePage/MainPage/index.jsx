import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getMyNotifications } from '../../../apis/notification.api'
import { getMyClasses } from '../../../apis/user.api'
import { Client } from '@stomp/stompjs'
import { formatDate } from '../../../utils/formatters'
import AdvList from '../ClassAgo/index'
import TextMessage from '../../TextMessage'
import './style.scss'

const Main = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [announcements, setAnnouncements] = useState([])
  const [recentClasses, setRecentClasses] = useState([])
  const [allClasses, setAllClasses] = useState([])
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true)
  const [loadingClasses, setLoadingClasses] = useState(true)
  const [stompClient, setStompClient] = useState(null)
  const globalSearch = searchParams.get('q') || ''
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoadingAnnouncements(true)
        const response = await getMyNotifications({ pageNum: 1, pageSize: 15 })
        setAnnouncements(response.data?.items || [])
      } catch (error) {
        toast.error('Không thể tải thông báo.')
      } finally {
        setLoadingAnnouncements(false)
      }
    }
    fetchAnnouncements()
  }, []) 
  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        setLoadingClasses(true)
        const params = {
          keyword: globalSearch || null,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getMyClasses(filteredParams)
        setRecentClasses(response.data || [])
      } catch (error) {
        toast.error('Không thể tải danh sách lớp học.')
      } finally {
        setLoadingClasses(false)
      }
    }
    fetchMyClasses()
  }, [globalSearch]) 

  // Fetch all classes for real-time subscription
  useEffect(() => {
    const fetchAllClasses = async () => {
      try {
        const response = await getMyClasses({ pageSize: 1000 })
        setAllClasses(response.data || [])
      } catch (error) {
        console.error('Failed to fetch classes for subscription', error)
      }
    }
    fetchAllClasses()
  }, [])

  // Initialize WebSocket connection
  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onConnect: () => {
        setStompClient(client)
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message'])
        console.error('Additional details: ' + frame.body)
      },
    })
    client.activate()
    return () => client.deactivate()
  }, [])

  // Subscribe to topics
  useEffect(() => {
    if (!stompClient || !stompClient.connected || allClasses.length === 0) return

    const subscriptions = allClasses.map((item) => {
      return stompClient.subscribe(`/topic/classrooms/${item.id}/notifications`, (message) => {
        const notification = JSON.parse(message.body)
        setAnnouncements((prev) => [notification, ...prev])
        toast.success(notification.title)
      })
    })
    return () => subscriptions.forEach((sub) => sub.unsubscribe())
  }, [stompClient, allClasses])

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
        <AdvList announcements={announcements} isLoading={loadingAnnouncements} />
      </div>
      <div className='flex-one__plus'>
        <div className='plus'>
          <Icon icon='fluent:book-star-24-regular' width='25' height='25' className='plus__Icon' />
          <h2>Lớp học gần đây</h2>
        </div>
        <div className='class-ago thay2'>
          {loadingClasses ? (
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
