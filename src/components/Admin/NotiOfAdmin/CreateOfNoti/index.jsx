import React, { useState, useContext } from 'react'
import { Icon } from '@iconify/react'
import { GlobalContext } from '../../../../dataContext'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const CreateOfNoti = ({ onSetFrame }) => {
  const { showMain, setShowMain, showNoti, setShowNoti } = useContext(GlobalContext)
  const navigate = useNavigate()
  return (
    <>
      <div className='createofnoti'>
        <div className='createofnoti__pos'>
          <div className='createofnoti__pos-input'>
            <span>Tên đoạn chat</span>
            <input type='text' />
            <span>Nhóm trưởng</span>
            <input type='text' />
          </div>
          <div className='createofnoti__pos__button'>
            <button onClick={() => setShowNoti(false)}>HỦY</button>
            <button onClick={() => onSetFrame(false)}>TẠO ĐOẠN CHAT</button>
          </div>
          <i
            className='fa-solid fa-xmark createofnoti__pos__i'
            onClick={() => setShowNoti(false)}></i>
        </div>
      </div>
    </>
  )
}

export default CreateOfNoti
