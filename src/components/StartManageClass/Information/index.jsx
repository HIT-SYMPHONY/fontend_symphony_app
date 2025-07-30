import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import logo from './../../../assets/img/Logo.png'
import Notification from '../Notification'
import MemberClass from '../MemberClass'
import ListMember from '../AllMember'
import ManageLesson from '../ManageLesson'
import CreateLesson from '../CreateLesson'
import CreateTest from '../CreateTest'
import TestContent from '../TestContent'
import { Outlet } from 'react-router-dom'
import './style.scss'

const Communication = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    classname: 'jbojklm;kkkkkkkkkkkkkkkkk',
    leader: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkk',
    timeBegin: '12/02/2025',
    timeEnd: '15/04/2025',
    fullTime: '8 buổi',
    describe:
      'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <div className='manage-infor__context-infor'>
        <div className='manage-infor__context-infor__title'>
          <div className='title-com'>
            <i className='fa-solid fa-circle-info title-com__i'></i>
            <h3>Thông tin lớp học</h3>
          </div>
          <button className='button' onClick={toggleEdit}>
            <Icon icon='iconamoon:edit-fill' width='15' height='15' />
            {isEditing ? 'Lưu' : 'Chỉnh sửa'}
          </button>
        </div>
        <div className='manage-infor__context-infor__context'>
          <div className='manage-infor__context-infor__context__box'>
            <div className='box'>
              <h5>Tên lớp học</h5>
              {isEditing ? (
                <input
                  type='text'
                  name='classname'
                  value={formData.classname}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.classname}</span>
              )}
            </div>
            <div className='box'>
              <h5>Tên Leader</h5>
              {isEditing ? (
                <input
                  type='text'
                  name='leader'
                  value={formData.leader}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.leader}</span>
              )}
            </div>
          </div>
          <div className='manage-infor__context-infor__context__box'>
            <div className='box'>
              <h5>Ngày bắt đầu</h5>
              {isEditing ? (
                <input
                  type='text'
                  name='timeBegin'
                  value={formData.timeBegin}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.timeBegin}</span>
              )}
            </div>
            <div className='box'>
              <h5>Ngày kết thúc</h5>
              {isEditing ? (
                <input
                  type='text'
                  name='timeEnd'
                  value={formData.timeEnd}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.timeEnd}</span>
              )}
            </div>
            <div className='box'>
              <h5>Độ dài lớp học</h5>
              {isEditing ? (
                <input
                  type='text'
                  name='fullTime'
                  value={formData.fullTime}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{formData.fullTime}</span>
              )}
            </div>
          </div>
          <h5>Mô tả:</h5>
          <div className='manage-infor__context-infor__context__item'>
            {isEditing ? (
              <textarea
                name='describe'
                value={formData.describe}
                onChange={handleInputChange}
                rows='5'
                style={{ width: '95%', padding: '10px' }}
              />
            ) : (
              <p>{formData.describe}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const Information = () => {
  return (
    <>
      <div className='manage-infor__context'>
        <p>Hãy chọn danh mục thông tin!</p>
        <img src={logo} alt='' />
      </div>
    </>
  )
}
export { Communication, Information }

const InformationManage = () => {
  return (
    <div className='manage-infor'>
      <div className='manage-infor__title'>
        <Icon
          icon='mdi:book-account'
          width='30'
          height='30'
          className='manage-infor__title__icon'
        />
        <h2>Quản lý lớp học</h2>
      </div>

      <div className='manage-infor__search'>
        <i className='fa-solid fa-arrow-left' />

        <select className='manage-infor__search__select' name='category'>
          <option value=''>--Danh mục--</option>
          <option value='info'>--Thông tin lớp học--</option>
          <option value='announce'>--Thông báo--</option>
          <option value='lesson'>--Bài học--</option>
          <option value='test'>--Kiểm Tra--</option>
          <option value='exercise'>--Bài tập--</option>
          <option value='students'>--Danh sách sinh viên--</option>
        </select>

        <div className='manage-infor__search__container'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            className='manage-infor__search__input'
          />
          <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
        </div>

        <button className='manage-infor__search__button'>+ Tạo mới</button>
      </div>
      {/* here */}
      {/* <MemberClass /> */}
      {/* <ListMember /> */}
      {/* <ManageLesson /> */}
      {/* <CreateLesson /> */}
      {/* <CreateTest /> */}
      {/* <TestContent /> */}
      <Outlet />
    </div>
  )
}

export default InformationManage
