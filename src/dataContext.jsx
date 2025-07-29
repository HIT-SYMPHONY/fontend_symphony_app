import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Khởi tạo GlobalContext
export const GlobalContext = createContext()

const path = [
  {
    home: true,
    classroom: false,
    myclass: false,
    myresult: false,
    competition: false,
    account: false,
    logout: false,
    show: false,
    manage: false,
  },
  {
    home: false,
    classroom: true,
    myclass: true,
    myresult: false,
    competition: false,
    account: false,
    logout: false,
    show: true,
    manage: false,
  },
  {
    home: false,
    classroom: true,
    myclass: false,
    myresult: true,
    competition: false,
    account: false,
    logout: false,
    show: true,
    manage: false,
  },
  {
    home: false,
    classroom: false,
    myclass: false,
    myresult: false,
    competition: true,
    account: false,
    logout: false,
    show: false,
    manage: false,
  },
  {
    home: false,
    classroom: false,
    myclass: false,
    myresult: false,
    competition: false,
    account: true,
    logout: false,
    show: false,
    manage: false,
  },
  {
    home: false,
    classroom: false,
    myclass: false,
    myresult: false,
    competition: false,
    account: false,
    logout: true,
    show: false,
    manage: false,
  },
  {
    home: false,
    classroom: false,
    myclass: false,
    myresult: false,
    competition: false,
    account: false,
    logout: false,
    show: false,
    manage: true,
  },
]

// Khởi tạo GlobalProvider
export const GlobalProvider = ({ children }) => {
  const submit =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNTc2ZDJmZS04OTI4LTQ4N2UtOTkwNC0wNDI5M2UzYzlkNzMiLCJzY29wZSI6IkFETUlOIiwiaXNzIjoiaGl0c3ltcGhvbnkuY29tIiwiZXhwIjoxNzUzODA4MzU0LCJpYXQiOjE3NTM4MDQ3NTQsImp0aSI6IjA4YjIyYTUwLWIxNjctNGUyMi04NDM1LWEyMTlmMmM5MTFlNiIsInVzZXJuYW1lIjoiMjAyMzYwMDY2NiJ9.IAtNToh4w8KddsYnhrgs1E1BJituxAfJjTS7afPqa5q2xxFBAOIVV3Iq7ExkeI7giq4lVvUy9ESumUYxzTBXaw'

  const [token, setToken] = useState(submit)
  //localStorage.getItem('accessToken') || null
  const [aspect, setAspect] = useState(localStorage.getItem('aspect') || 'USER')
  const [responseData, setResponseData] = useState(
    JSON.parse(localStorage.getItem('responseData')) || null,
  )
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null)

  useEffect(() => {
    localStorage.setItem('aspect', aspect)
  }, [aspect])

  useEffect(() => {
    localStorage.setItem('responseData', JSON.stringify(responseData))
  }, [responseData])

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  const routes = {
    1: { path: '/home' },
    2: { path: '/myclass' },
    3: { path: '/myresult' },
    4: { path: '/competition' },
    5: { path: '/account' },
    6: { path: '/' },
    7: { path: '/manage' },
    8: { path: '/dashboard' },
  }

  const handleAspectChange = (newAspect) => {
    switch (newAspect) {
      case 'ADMIN':
        setAspect('ADMIN')
        break
      case 'LEADER':
        setAspect('LEADER')
        break
      default:
        setAspect('USER')
        break
    }
  }

  const navigate = useNavigate()

  const updateGlobalState = (index) => {
    if (!routes[index]) {
      console.warn(`Invalid route index: ${index}`)
      return
    }
    navigate(routes[index].path)
  }

  const [showMain, setShowMain] = useState(false)
  const [showNoti, setShowNoti] = useState(false)
  return (
    <GlobalContext.Provider
      value={{
        updateGlobalState,
        path,
        token,
        setToken,
        aspect,
        handleAspectChange,
        responseData,
        setResponseData,
        userData,
        setUserData,
        showMain,
        setShowMain,
        showNoti,
        setShowNoti,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}
