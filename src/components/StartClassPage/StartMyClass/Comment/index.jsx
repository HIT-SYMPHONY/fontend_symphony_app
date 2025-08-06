import React, { useState, useEffect, useRef, useContext } from 'react'
import { Icon } from '@iconify/react'
import { work } from '../../../../data/app'
import { GlobalContext } from '../../../../dataContext'
import Classroom from '../Classroom'
import icon from './../../../../assets/img/Ellipse.png'
import logo from './../../../../assets/img/logo.png'
import Frame from '../Frame'
import './style.scss'

const Comment = () => {
  const context = useContext(GlobalContext)
  const [sub, setSub] = useState(false)
  if (!context) {
    console.error('GlobalContext is undefined. Ensure HomePage is wrapped in GlobalProvider.')
    return <div>Lỗi: Không tìm thấy GlobalContext!</div>
  }

  return (
    <>
      <div className='comment'>
        <div className='comment__left'>
          <h2>PRIVATE: Đồ họa - 2025</h2>
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
