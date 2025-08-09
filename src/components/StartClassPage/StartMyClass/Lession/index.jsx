import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Lesson = () => {
  const navigate = useNavigate()
  return (
    <div className='viewlession'>
      <div className='viewlession-title'>
        <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
        <h2>PRIVATE: Đồ họa - 2025</h2>
      </div>

      <div className='viewlession__one'>
        <strong className='viewlession__one__than'>1 </strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe...</strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Đề cương bài học</strong>
      </div>
      <div className='viewlession__two'>
        <strong>Nội dung: </strong>
      </div>
    </div>
  )
}

export default Lesson
