import React from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const ManageCompetitions = () => {
  const navigate = useNavigate()
  const contests = [
    {
      id: 1,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 3,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 4,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 5,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 6,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 7,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
    {
      id: 8,
      name: 'HIT Contest Series 2025',
      startDate: '14/07/2025',
      status: 'Đang diễn ra',
    },
  ]

  return (
    <div className='manage-competition'>
      <div className='manage-competition__start'>
        <Icon
          icon='mdi:book-account'
          className='manage-competition__start__Icon'
          width='40'
          height='40'
        />
        <h2>Quản lý cuộc thi</h2>
      </div>
      <div className='manage-competition__left__bang'>
        {contests.map((contest) => (
          <div className='manage-competition__left__bang__box' key={contest.id}>
            <div className='manage-competition__left__bang__box__board'></div>
            <div className='manage-competition__left__bang__box__information'>
              <h4>{contest.name}</h4>
              <div className='manage-competition__left__bang__box__information__list'>
                <span className='manage-competition__left__bang__box__information__list__span1'>
                  {contest.status}
                </span>
                <i className='fa-solid fa-circle-info'></i>
              </div>
              <p>Ngày bắt đầu: {contest.startDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageCompetitions
