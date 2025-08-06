import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Complete from '../Complete'
import './style.scss'

const Assignment = () => {
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(1 * 3600 + 30 * 60)
  const intervalRef = useRef(null)
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0')
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
    const s = String(seconds % 60).padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          alert('Hết giờ!')
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <>
      {open ? (
        <Complete />
      ) : (
        <div className='assignment'>
          <h2>HIT Contest Series 2025</h2>
          <div className='assignment__work'>
            <div className='assignment__work__begin'>
              <h3 className='assignment__work__begin__h3'>3</h3>
              {/* Nếu dùng Font Awesome, cần import và cấu hình */}
              <i className='fa-solid fa-angles-right'></i>
              <h3>Phần thi: Photoshop</h3>
            </div>
            <h4 className='assignment__work__end'>{formatTime(timeLeft)}</h4>
          </div>
          <div className='assignment__context'>
            <h4>Đề bài:</h4>
          </div>
          <div className='assignment__feedback'>
            <h4>Trả lời: </h4>
            <div className='assignment__feedback__respon'>
              <textarea rows='5' className='respon'></textarea>
              <Icon
                icon='streamline-flex:mail-send-email-message-circle-solid'
                width='35'
                height='35'
                className='respon-color'
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Assignment
