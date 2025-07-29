import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { createClassroom } from '../../../../apis/admin.api'
import './style.scss'

const CreateOfMain = () => {
  const navigate = useNavigate()
  return (
    <div className='createofmain'>
      <div className='createofmain__title'>
        <Icon
          icon='material-symbols:arrow-back-rounded'
          width='32'
          height='32'
          className='createofmain__title__icon'
          onClick={() => navigate('/admin/home')}
        />
        <Icon
          icon='fluent:people-add-32-filled'
          width='32'
          height='32'
          className='createofmain__title__icon'
        />
        <h2>Tạo tài khoản mới</h2>
      </div>
      <div className='createofmain__context'>
        <div className='createofmain__context__table'>
          <div className='createofmain__context__table__box'>
            <h5>Họ đệm</h5>
            <input type='text' />
          </div>
          <div className='createofmain__context__table__box'>
            <h5>Tên</h5>
            <input type='text' />
          </div>
          <div className='createofmain__context__table__box'>
            <h5>Mã sinh viên </h5>
            <input type='text' />
          </div>
          <div className='createofmain__context__table__box'>
            <h5>Email</h5>
            <input type='text' />
          </div>
        </div>
        <div className='createofmain__context__click'>
          <button className='createofmain__context__click__button'>Tạo</button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfMain
