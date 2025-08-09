import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const userRole = user?.authorities?.[0]?.authority
  const isAuthenticated = !!user
  const isAuthorized = allowedRoles ? allowedRoles.includes(userRole) : true

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location }, replace: true })
      return
    }
    if (!isAuthorized) {
      navigate('/unauthorized', { replace: true })
    }
  }, [isAuthenticated, isAuthorized, userRole, navigate, location])
  if (isAuthenticated && isAuthorized) {
    return children
  }
  return null
}

export default ProtectedRoute
