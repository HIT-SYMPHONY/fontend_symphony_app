import React, { useState, useEffect, useRef, useContext } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import Frame from '../Frame'
import './style.scss'

const Comment = ({ setSubmit }) => {
  const navigate = useNavigate()
  const [sub, setSub] = useState(false)

  return (
    <>
      <div className='comment'>
        <div className='comment__left'>
          <div className='comment__left-title'>
            <i className='fa-solid fa-arrow-left' onClick={() => navigate(-1)}></i>
            <h2>PRIVATE: Đồ họa - 2025</h2>
          </div>
          <div className='comment__left__one'>
            <strong className='comment__left__one__than'>1</strong>
            <strong className='comment__left__one__more'>
              <i class='fa-solid fa-angles-right'></i>
            </strong>
            <strong>Buổi 8: Kiểm tra</strong>
          </div>
          <div className='comment__left__two'>
            <strong>Nội dung: </strong>
          </div>
          <div className='comment__left__three'>
            {sub && <strong>Nhận xét: </strong>}
            {!sub && <strong>Trả lời: </strong>}
          </div>
        </div>
        <div className='comment__right'>
          <Icon
            icon='duo-icons:message-3'
            width='35'
            height='35'
            style={{ cursor: 'pointer' }}
            className={!sub ? '' : 'comment__right__icon'}
            onClick={() => setSub(!sub)}
          />
          <div className='comment__right__diem'>
            <span>Điểm</span>
            <h2>80</h2>
          </div>
          <h3 className='comment__right__nop'>Đã nộp </h3>
        </div>
      </div>
    </>
  )
}

export default Comment
