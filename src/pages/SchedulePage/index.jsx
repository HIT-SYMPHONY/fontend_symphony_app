import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { getMyClasses } from '../../apis/user.api'
import './style.scss'
import TextMessage from '../../components/TextMessage'

const dayOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

const Schedule = () => {
  const [scheduleItems, setScheduleItems] = useState([])
  const [loading, setLoading] = useState(true)

  // --- Data Fetching ---
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true)
        const response = await getMyClasses()
        console.log(response.data)
        setScheduleItems(response.data || [])
      } catch (error) {
        toast.error('Không thể tải thời khóa biểu.')
      } finally {
        setLoading(false)
      }
    }
    fetchScheduleData()
  }, [])

  const currentDate = new Date()
  const today = dayOfWeek[currentDate.getDay()]

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(
    currentDate.getDate() - (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1),
  )

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    weekDays.push({
      day: dayOfWeek[day.getDay()],
      date: day.getDate(),
    })
  }

  return (
    <div className='schedule'>
      <div className='schedule__icon'>
        <div className='schedule__icon__thang'>
          <Icon
            icon='tabler:calendar-week-filled'
            width='24'
            height='24'
            className='schedule__icon__thang__Icon'
          />
          <h3>Thời khóa biểu</h3>
        </div>
        <span>Tháng {currentDate.getMonth() + 1}</span>
      </div>
      <div className='schedule__date'>
        {weekDays.map((item, index) => (
          <div key={index} className={`date-item ${today === item.day ? 'selected' : ''}`}>
            <span>{item.day}</span>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
      <div className='schedule__number'>
        <span>Số lượng lớp: </span>
        <span>{loading ? '...' : scheduleItems.length}</span>
      </div>
      <div className='schedule__list'>
        {loading ? (
          <TextMessage text='Đang tải lịch học...' />
        ) : scheduleItems.length > 0 ? (
          scheduleItems.map((item) => (
            <div key={item.id} className='schedule__item'>
              <div className='div'></div>
              <div>
                <span>Thời Gian: {item.timeSlot || 'Chưa xếp lịch'}</span>
                <h5>{item.name}</h5>
                <p>Leader: {item.leaderName || 'N/A'}</p>
                <p>Địa điểm: {item.location || 'N/A'}</p>
              </div>
            </div>
          ))
        ) : (
          <TextMessage text='Không có lịch học nào trong tuần này.'></TextMessage>
        )}
      </div>
    </div>
  )
}

export default Schedule
