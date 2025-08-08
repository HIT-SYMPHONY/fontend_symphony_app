import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom' // Use useNavigate instead of <Navigate> for this pattern
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  const navigate = useNavigate() // Get the navigate function
  const location = useLocation()

  const userRole = user?.authorities?.[0]?.authority
  const isAuthenticated = !!user
  const isAuthorized = allowedRoles ? allowedRoles.includes(userRole) : true // Assume authorized if no roles are specified

  useEffect(() => {
    // Case 1: User is not logged in at all
    if (!isAuthenticated) {
      // No toast needed here, just redirect
      navigate('/login', { state: { from: location }, replace: true })
      return // Stop the effect
    }

    // Case 2: User is logged in but does not have the required role
    if (!isAuthorized) {
      // FIRST, show the toast notification
      toast.error('Xin lỗi, bạn không có quyền truy cập trang này.')

      // THEN, navigate away. We check the role to redirect admins to their dashboard.
      if (userRole === 'ADMIN') {
        navigate('/admin/home', { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [isAuthenticated, isAuthorized, userRole, navigate, location])

  // If the user is authenticated AND authorized, render the children.
  // Otherwise, render null while the useEffect redirects.
  if (isAuthenticated && isAuthorized) {
    return children
  }

  // Render nothing while the useEffect determines where to redirect.
  return null
}

export default ProtectedRoute
