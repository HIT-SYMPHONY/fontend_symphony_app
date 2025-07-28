import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../../../dataContext'
import { Icon } from '@iconify/react'
import './style.scss'

const ReplaceOfAdmin = ({ onSetSub }) => {
  const { showMain, setShowMain } = useContext(GlobalContext)
  const [frame, setFrame] = useState({
    change: true,
    new: false,
    result: false,
  })
  const [error, setError] = useState('')

  const handleFrame = (frameName) => {
    const frames = {
      change: { change: true, new: false, result: false },
      new: { change: false, new: true, result: false },
      result: { change: false, new: false, result: true },
    }
    setFrame(frames[frameName] || frames.change)
    setError('') // Reset lỗi khi chuyển frame
  }

  const AccountResult = () => (
    <div className='accountframe__relate'>
      <h1 className='accountframe__relate__h1'>NỘP BÀI THÀNH CÔNG!</h1>
      <div className='accountframe__relate__button'>
        <button onClick={() => setShowMain(false)}>QUAY LẠI</button>
      </div>
      <i
        className='fa-solid fa-xmark accountframe__relate__i'
        onClick={() => setShowMain(false)}></i>
    </div>
  )

  const AccountNew = () => {
    const [passNew, setPassNew] = useState('')
    const [repeat, setRepeat] = useState('')

    const validatePassword = (password) => {
      return password.length >= 8 // Yêu cầu mật khẩu ít nhất 8 ký tự
    }

    const handleSubmit = () => {
      if (!passNew || !repeat) {
        setError('Vui lòng nhập đầy đủ mật khẩu!')
      } else if (passNew !== repeat) {
        setError('Mật khẩu không khớp!')
      } else if (!validatePassword(passNew)) {
        setError('Mật khẩu phải có ít nhất 8 ký tự!')
      } else {
        setError('')
        handleFrame('result') // Sửa lỗi: gọi trực tiếp handleFrame
      }
    }

    return (
      <div className='accountframe__pos'>
        <h4 className='accountframe__pos__h1'>NHẬP MẬT KHẨU MỚI</h4>
        <input
          type='password'
          value={passNew}
          onChange={(e) => setPassNew(e.target.value)}
          placeholder='Nhập mật khẩu mới...'
          className='accountframe__pos__input'
        />
        <h4 className='accountframe__pos__h1'>NHẬP LẠI MẬT KHẨU MỚI</h4>
        <input
          type='password'
          value={repeat}
          onChange={(e) => setRepeat(e.target.value)}
          placeholder='Nhập lại mật khẩu mới...'
          className='accountframe__pos__input'
        />
        {error && <p className='accountframe__error'>{error}</p>}
        <div className='accountframe__pos__button'>
          <button onClick={handleSubmit}>XÁC NHẬN</button>
          <button onClick={() => handleFrame('change')}>QUAY LẠI</button>
        </div>
        <i
          className='fa-solid fa-xmark accountframe__pos__i'
          onClick={() => setShowMain(false)}></i>
      </div>
    )
  }

  const AccountChange = () => {
    const [password, setPassword] = useState('')

    const handleCheck = () => {
      if (!password) {
        setError('Vui lòng nhập mật khẩu hiện tại!')
      } else {
        setError('')
        handleFrame('new') // Sửa tương tự: gọi trực tiếp handleFrame
      }
    }

    return (
      <div className='accountframe__pos'>
        <h1 className='accountframe__pos__h1'>NHẬP MẬT KHẨU CŨ CỦA BẠN!</h1>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Nhập mật khẩu hiện tại...'
          className='accountframe__pos__input'
        />
        {error && <p className='accountframe__error'>{error}</p>}
        <div className='accountframe__pos__button'>
          <button onClick={handleCheck}>KIỂM TRA</button>
          <button onClick={() => setShowMain(false)}>QUAY LẠI</button>
        </div>
        <i
          className='fa-solid fa-xmark accountframe__pos__i'
          onClick={() => setShowMain(false)}></i>
      </div>
    )
  }

  return (
    <div className='accountframe'>
      {frame.change && <AccountChange />}
      {frame.new && <AccountNew />}
      {frame.result && <AccountResult />}
    </div>
  )
}

export default ReplaceOfAdmin
