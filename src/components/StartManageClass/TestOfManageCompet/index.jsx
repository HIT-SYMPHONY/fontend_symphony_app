import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import './style.scss'

const TestOfManageCompet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const member = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },

    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      diem: 80,
      status: '2023DAPT01',
      time: '30/06/2025',
    },
  ]
  return (
    <>
      <div className='testcompet'>
        <div className='testcompet__title'>
          <h4 className='testcompet__title__h4'>1</h4>
          <i className='fa-solid fa-angles-right'></i>
          <h5>Buổi 8: Kiểm tra</h5>
        </div>
        <div className='testcompet__information'>
          <div className='testcompet__information__context'>
            <h5>Ngày giao</h5>
            <span>20/02/2025</span>
          </div>
          <div className='testcompet__information__context'>
            <h5>Thời gian bắt đầu</h5>
            <span>20:00 20/02/2025</span>
          </div>
          <div className='testcompet__information__context'>
            <h5>Thời gian kết thúc</h5>
            <span>22:00 20/02/2025</span>
          </div>
        </div>
        <div className='testcompet__topic'>
          <div className='testcompet__topic__tap'>
            <h4>Đề bài</h4>
            <Icon
              icon={isOpen ? 'mingcute:up-fill' : 'mingcute:down-fill'}
              width='20'
              height='20'
              className='testcompet__topic__tap__icon'
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {isOpen && (
            <div className='testcompet__topic__context'>
              <hr />
            </div>
          )}
        </div>
        <h3>Danh sách nộp bài </h3>
        <h5>Số lượng nộp: 30</h5>
        <div className='testcompet__member'>
          <div className='testcompet__member__title'>
            <span> Tên người nộp</span>
            <span> Điểm</span>
            <span>Lớp hành chính</span>
            <span>Ngày nộp</span>
          </div>
          <div className='testcompet__member__list'>
            {member.map((item, index) => (
              <div className='testcompet__member__list__box' key={index}>
                <div className='testcompet__member__list__box__name'>
                  <h4 className='testcompet__member__list__box__name__span'>{item.id}</h4>
                  <h5>{item.name}</h5>
                </div>
                <div className='testcompet__member__list__box__diem'>
                  <h5>{item.diem}</h5>
                </div>
                <div className='testcompet__member__list__box__status'>
                  <h5>{item.status}</h5>
                </div>
                <div className='testcompet__member__list__box__time'>
                  <h5>{item.time}</h5>
                  <Icon
                    icon='duo-icons:message-3'
                    width='24'
                    height='24'
                    className='testcompet__member__list__box__time__icon'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default TestOfManageCompet
