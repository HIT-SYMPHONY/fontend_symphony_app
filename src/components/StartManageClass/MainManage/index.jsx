import React, { useState, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../dataContext'
import icon from './../../../assets/img/Ellipse.png'
import { Outlet } from 'react-router-dom'
import logo from './../../../assets/img/logo.png'
import Logout from '../../Logout'
import './style.scss'

const MainManage = () => {
  const lop = [
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
    {
      name: 'PRIVATE: Đồ họa - 2025',
      state: 'Đang diễn ra',
      see: 'Xem chi tiết',
    },
  ]
  return (
    <>
      <div className='manage'>
        <div className='manage__title'>
          <Icon icon='mdi:book-account' width='30' height='30' className='manage__title__icon' />
          <h2>Quản lý lớp học </h2>
        </div>
        <div className='manage__search'>
          <div className='manage__search__container'>
            <input type='text' placeholder='Nhập tìm kiếm...' />
            <i className='fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <h3>Danh sách lớp quản lý</h3>
        <div className='manage__table'>
          {lop.map((item, index) => (
            <div className='manage-table' key={index}>
              <div className='manage-table__img'></div>
              <div className='manage-table__context'>
                <div className='manage-table__context__pair'>
                  <h4>{item.name}</h4>
                  <span>{item.state}</span>
                </div>
                <span className='manage-table__context__span'>{item.see}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MainManage
