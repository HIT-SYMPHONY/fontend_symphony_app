import React from 'react'
import { Icon } from '@iconify/react'
import { formatDate } from '../../../utils/formatters'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import './style.scss'
  
const NotificationsSwiper = ({ notifications, isLoading }) => {
  if (isLoading) {
    return (
      <div className='notifications-swiper-wrapper'>
        <div className='notifications-status'>
          <div className='notifications-status__text'>Đang tải thông báo...</div>
        </div>
      </div>
    )
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className='notifications-swiper-wrapper'>
        <div className='notifications-status'>
          <div className='notifications-status__text'>Chưa có thông báo nào.</div>
        </div>
      </div>
    )
  }

  return (
    <div className='notifications-swiper-wrapper'>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className='notifications-swiper'>
        {notifications.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='notification-card'>
              <p className='notification-card__content'>{item.content ? `Thông báo: ${item.content}` : 'N/A'}</p>
              <p>Từ: {item.classRoomName ? item.classRoomName : item.competitionName}</p>
              <p className='notification-card__time'>
                <Icon icon='mingcute:time-line' /> {formatDate(item.createdAt)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NotificationsSwiper
