import { useContext } from 'react'
import { GlobalContext } from '../dataContext'

const DataInitialState = async (data, setUserData, setToken, setAspect) => {
  try {
    if (!data || data.status === 'ERROR') {
      throw new Error(data?.message || 'Dữ liệu đầu vào không hợp lệ')
    }

    const { accessToken, id, authorities } = data.data || {}
    if (!accessToken || !id) {
      throw new Error('Không tìm thấy accessToken hoặc id')
    }

    localStorage.setItem('accessToken', accessToken)
    if (setToken) {
      setToken(accessToken)
    }

    if (setAspect && authorities?.length > 0) {
      const authority = authorities[0].authority
      setAspect(authority)
    }

    const response = await fetch(`http://localhost:8080/api/v1/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const userResponse = await response.json()

    if (!response.ok || userResponse.status === 'ERROR') {
      throw new Error(userResponse.message || 'Lấy dữ liệu người dùng thất bại')
    }

    const userData = userResponse.data
    if (setUserData) {
      setUserData(userData)
    }
    return userData
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error.message)
    throw error
  }
}

export default DataInitialState
