import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { lop } from '../../../../data/app'

import './style.scss'

const AllClassroom = () => {
  const navigate = useNavigate()
  return (
    <div className='flextap-one'>
      <div className='flextap-one__plus'>
        <div className='plustap'>
          <div className='plustap__plus'>
            <Icon
              icon='fluent:book-star-24-regular'
              width='25'
              height='25'
              className='plustap__plus__Icon'
            />
            <h3>Lớp học gần đây</h3>
          </div>
        </div>
        {/* "class-tap thay2" */}
        <div className='class-tap thay2'>
          {lop && Array.isArray(lop) ? (
            lop.map((item, index) => (
              <div className='class-tap__box' key={index}>
                <div className='class-tap__thumbnail'></div>
                <div className='class-tap__content'>
                  <button className='class-tap__button' onClick={() => navigate('/information')}>
                    VÀO HỌC
                  </button>
                  <h2 className='class-tap__content__title'>Private</h2>
                  <h2 className='class-tap__content__title'>{item.name}</h2>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mdi:badge-account' />
                    </span>{' '}
                    Leader: {item.leader}
                  </p>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mingcute:time-line' />
                    </span>{' '}
                    Ngày bắt đầu: {item.date}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Không có dữ liệu lớp học!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AllClassroom
