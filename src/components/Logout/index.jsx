import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './style.scss'

const Logout = ({ onSetFrame }) => {
  const navigate = useNavigate()
  const { clearUser } = useAuth()

  const handleLogout = () => {
    clearUser()
    navigate('/login')
    if (onSetFrame) {
      onSetFrame(false)
    }
  }

  return (
    <>
      <div className='xmark'>
        <div className='xmark__pos'>
          <h1 className='xmark__pos__h1'>BẠN CHẮC CHẮN MUỐN ĐĂNG XUẤT?</h1>
          <div className='xmark__pos__button'>
            <button onClick={handleLogout}>ĐĂNG XUẤT</button>
            <button onClick={() => onSetFrame(false)}>QUAY LẠI</button>
          </div>
          <i className='fa-solid fa-xmark xmark__pos__i' onClick={() => onSetFrame(false)}></i>
        </div>
      </div>
    </>
  )
}

export default Logout
