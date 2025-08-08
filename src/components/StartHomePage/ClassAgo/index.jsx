import React from 'react'
import { Icon } from '@iconify/react'
import { formatDate } from '../../../utils/formatters'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import './style.scss'

const AdvList = ({ announcements, isLoading }) => {
  if (isLoading) {
    return (
      <div className='dukien-slider'>
        <div className='dukien'>
          <div className='dukien__box--loading'>Đang tải thông báo...</div>
        </div>
      </div>
    )
  }

  if (!announcements || announcements.length === 0) {
    return (
      <div className='dukien-slider'>
        <div className='dukien'>
          <div className='dukien__box--loading'>Chưa có thông báo nào.</div>
        </div>
      </div>
    )
  }

  return (
    <div className='dukien-slider'>
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
        className='my-announcements-swiper'>
        {announcements.map((item) => (
          <SwiperSlide key={item.id}>
            <div className='dukien__box'>
              <strong>THÔNG BÁO: {item.content || 'N/A'}</strong>
              <p>Từ: {item.classRoomName}</p>
              <p className='dukien__time'>
                <Icon icon='mingcute:time-line' /> {formatDate(item.createdAt)}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default AdvList
