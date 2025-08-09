import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const UnauthorizedPage = () => {
  const navigate = useNavigate()

  return (
    <div className='unauthorized-page-container'>
      <h1 className='unauthorized-page__title'>403</h1>
      <h2 className='unauthorized-page__subtitle'>Truy cập bị từ chối</h2>
      <p className='unauthorized-page__text'>
        Xin lỗi, bạn không có quyền để truy cập trang này. Vui lòng liên hệ quản trị viên nếu bạn
        cho rằng đây là một lỗi.
      </p>
      <button onClick={() => navigate(-1)} className='unauthorized-page__back-link'>
        Quay lại trang trước
      </button>
    </div>
  )
}

export default UnauthorizedPage
