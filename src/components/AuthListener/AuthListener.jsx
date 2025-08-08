// src/components/AuthListener.jsx

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const AuthListener = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const wasLoggedIn = useRef(!!user)

  useEffect(() => {
    if (wasLoggedIn.current && !user) {
      navigate('/login', { replace: true })
    }
    wasLoggedIn.current = !!user
  }, [user, navigate])
  return null
}

export default AuthListener
