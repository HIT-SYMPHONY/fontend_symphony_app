import React, { useState, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../dataContext'
import icon from './../../../assets/img/Ellipse.png'
import { Outlet } from 'react-router-dom'
import logo from './../../../assets/img/logo.png'
import Logout from '../../Logout'
import './style.scss'

const AllMember = () => {
  const member = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
    {
      id: 1,
      name: 'Nguyễn Văn A',
      class: '2023DAPT01',
      time: '30/06/2025',
    },
  ]
  return (
    <>
      <h3>Danh sách thành viên </h3>
      <div className='soluong'>
        <h4>Số lượng thành viên: </h4>
        <span>{member.length}</span>
      </div>
      <div className='tablemember'>
        <div className='tablemember__title'>
          <h5>Tên thành viên </h5>
          <h5>Lớp hành chính </h5>
          <h5>Ngày vào lớp </h5>
        </div>
        <div className='tablemember__table'>
          {member.map((item, index) => (
            <div className='tablemember__table__item' key={index}>
              <h5 className='tablemember__table__item__h5'>{item.id}</h5>
              <h5>{item.name}</h5>
              <h5>{item.class}</h5>
              <h5>{item.time}</h5>
              <span className='tablemember__table__item__span'></span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AllMember
