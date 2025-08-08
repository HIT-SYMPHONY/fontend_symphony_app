import React from 'react'
import { Icon } from '@iconify/react'
import './style.scss'
import { useState } from 'react'
const VeiwsLesson = () => {
  const [submit, setSubmit] = useState(false)
  return (
    <div className='points'>
      <h2>PRIVATE: Đồ họa - 2025</h2>
      <div className='points__one'>
        <strong className='points__one__than'>1 </strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe...</strong>
        <strong className='than'>
          <i className='fa-solid fa-angles-right'></i>
        </strong>
        <strong>Đề cương bài học</strong>
      </div>
      <div className='cap'>
        <div className='cap__left'>
          <div className='points__two'>
            <strong>Nội dung: </strong>
          </div>
          {!submit ? (
            <div className='points__two'>
              <strong>Trả lời: </strong>
              <div className='points__two__textarea'></div>
            </div>
          ) : (
            <div className='points__two'>
              <strong>Nhận xét: </strong>
              <textarea name='rep' id='' className='points__two__textarea'></textarea>
            </div>
          )}
        </div>
        <div className='cap__right'>
          <Icon
            icon='duo-icons:message-3'
            width='50'
            height='50'
            className={submit ? 'cap__right__icon cap-icon' : 'cap__right__icon'}
            onClick={() => {
              setSubmit(!submit)
            }}
          />
          <h3>Nhập Điểm</h3>
          <h2 className={submit ? 'cap__right__h2 cap-h2' : 'cap__right__h2'}></h2>
          <h2 className={submit ? 'cap__right__h2 cap-h2' : 'cap__right__h2'}>Xác Nhận</h2>
        </div>
      </div>
    </div>
  )
}

export default VeiwsLesson
