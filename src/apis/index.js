import axios from 'axios'
import toast from 'react-hot-toast'
import { store } from '../store/configureStore'
import { clear as logoutAction } from '../store/auth.store'
import { LocalStorage } from '../constants/localStorage.constant'
import { refreshToken as refreshTokenApi } from './auth.api'

const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiDefault.interceptors.response.use((response) => response.data)

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

const privateRequestInterceptor = (config) => {
  const authData = JSON.parse(localStorage.getItem(LocalStorage.auth))
  const accessToken = authData?.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}

const privateResponseInterceptor = async (error) => {
  const originalRequest = error.config

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true

    const authData = JSON.parse(localStorage.getItem(LocalStorage.auth))
    const currentRefreshToken = authData?.refreshToken

    if (!currentRefreshToken) {
      store.dispatch(logoutAction())
      toast.error('Please log in to continue.')
      return Promise.reject(error)
    }

    try {
      const refreshResponse = await refreshTokenApi({ refreshToken: currentRefreshToken })
      const newAccessToken = refreshResponse.data.accessToken

      authData.accessToken = newAccessToken
      localStorage.setItem(LocalStorage.auth, JSON.stringify(authData))

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return api(originalRequest)
    } catch (_error) {
      toast.error('Your session has expired. Please log in again.')
      store.dispatch(logoutAction())
      return Promise.reject(_error)
    }
  }

  return Promise.reject(error)
}

api.interceptors.request.use(privateRequestInterceptor, Promise.reject)
api.interceptors.response.use((response) => response.data, privateResponseInterceptor)

const apiDefaultUpload = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

apiDefaultUpload.interceptors.request.use(privateRequestInterceptor, Promise.reject)
apiDefaultUpload.interceptors.response.use((response) => response.data, privateResponseInterceptor)

export { apiDefault, api, apiDefaultUpload }
