import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  const userRole = user.authorities?.[0]?.authority
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    toast.error('Xin lỗi, bạn không có quyền để thực hiện hành động này')
    return <Navigate to='/home' replace />
  }
  return children
}
export default ProtectedRoute
