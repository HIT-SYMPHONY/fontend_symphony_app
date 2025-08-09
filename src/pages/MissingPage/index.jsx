import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import useAuth from '../../hooks/useAuth'

const MissingPage = () => {
    const { user } = useAuth()
const userRole = user?.authorities?.[0]?.authority
  return (
    <div className='missing-page-container'>
      <h1 className='missing-page__title'>404</h1>
      <h2 className='missing-page__subtitle'>Không tìm thấy trang</h2>
      <p className='missing-page__text'>
        Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Đường dẫn có thể đã bị hỏng
        hoặc trang đã được di chuyển.
      </p>
      <Link to={userRole === 'ADMIN' ? '/admin/home' : '/home'} className='missing-page__home-link'>
        Quay về trang chủ
      </Link>
    </div>
  )
}

export default MissingPage
