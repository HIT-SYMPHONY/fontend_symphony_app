import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { getMyLessons } from '../../apis/lesson.api'
import TextMessage from '../../components/TextMessage'
import './style.scss'

// Map from JS Day index (Sun=0) to API String
const dayIndexToApiString = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

// Map from API String to Vietnamese display name
const apiStringToVietnamese = {
  MONDAY: 'T2',
  TUESDAY: 'T3',
  WEDNESDAY: 'T4',
  THURSDAY: 'T5',
  FRIDAY: 'T6',
  SATURDAY: 'T7',
  SUNDAY: 'CN',
}

const SchedulePage = () => {
  const [allLessons, setAllLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState(new Date())

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true)
        const response = await getMyLessons()
        setAllLessons(response.data || [])
      } catch (error) {
        toast.error('Không thể tải thời khóa biểu.')
      } finally {
        setLoading(false)
      }
    }
    fetchScheduleData()
  }, [])

  // --- Calendar Logic ---
  const startOfWeek = new Date(selectedDay)
  startOfWeek.setDate(
    selectedDay.getDate() - (selectedDay.getDay() === 0 ? 6 : selectedDay.getDay() - 1),
  )

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    const dayApiString = dayIndexToApiString[day.getDay()]
    weekDays.push({
      dayName: apiStringToVietnamese[dayApiString],
      date: day.getDate(),
      fullDate: day,
    })
  }

  // --- THE FIX IS HERE: Correct Filtering Logic ---
  const filteredLessons = useMemo(() => {
    // 1. Get the API string for the currently selected day (e.g., "MONDAY")
    const selectedDayApiString = dayIndexToApiString[selectedDay.getDay()]

    // 2. Filter the lessons by directly comparing the strings
    return allLessons.filter((lesson) => lesson.dayOfWeek === selectedDayApiString)
  }, [allLessons, selectedDay])

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
        <span>Tháng {selectedDay.getMonth() + 1}</span>
      </div>
      <div className='schedule__date'>
        {weekDays.map((item) => (
          <div
            key={item.date}
            className={`date-item ${selectedDay.getDate() === item.date ? 'selected' : ''}`}
            onClick={() => setSelectedDay(item.fullDate)}>
            <span>{item.dayName}</span>
            <p>{item.date}</p>
          </div>
        ))}
      </div>
      <div className='schedule__number'>
        <span>Số lượng lớp: </span>
        <span>{loading ? '...' : filteredLessons.length}</span>
      </div>
      <div className='schedule__list'>
        {loading ? (
          <TextMessage text='Đang tải lịch học...' />
        ) : filteredLessons.length > 0 ? (
          filteredLessons.map((item) => (
            <div key={item.id} className='schedule__item'>
              <div className='div'></div>
              <div>
                <span>
                  Thời Gian: {item.startTime} - {item.endTime}
                </span>
                <h5>{item.className}</h5>
                <p>Leader: {item.leaderName || 'N/A'}</p>
                <p>Địa điểm: {item.location || 'N/A'}</p>
              </div>
            </div>
          ))
        ) : (
          <TextMessage text='Không có lịch học cho ngày này.' />
        )}
      </div>
    </div>
  )
}

export default SchedulePage
