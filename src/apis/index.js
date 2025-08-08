import toast from 'react-hot-toast'
import { store } from '../store/configureStore'
import { save as saveAuthAction, clear as logoutAction } from '../store/auth.store'
import { LocalStorage } from '../constants/localStorage.constant'
import { refreshToken as refreshTokenApi } from './auth.api'
import { api, apiDefault, apiDefaultUpload, apiUpload } from './axios'
import { getCurrentUserWithToken } from './user.api'
const privateRequestInterceptor = (config) => {
  if (!config.headers?.Authorization) {
    const authData = JSON.parse(localStorage.getItem(LocalStorage.auth))
    const accessToken = authData?.accessToken

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
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
      toast.error('Xin lỗi, bạn cần cung cấp thông tin xác thực để thực hiện hành động này')
      return Promise.reject(error)
    }
    try {
      const refreshResponse = await refreshTokenApi({ refreshToken: currentRefreshToken })
      const newAccessToken = refreshResponse.data.accessToken
      const userProfileResponse = await getCurrentUserWithToken(newAccessToken)
      const { fullName, imageUrl } = userProfileResponse.data

      const newAuthData = {
        ...authData,
        accessToken: newAccessToken,
        fullName, 
        imageUrl, 
      }
      store.dispatch(saveAuthAction(newAuthData))
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return api(originalRequest)
    } catch (_error) {
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
      store.dispatch(logoutAction())
      return Promise.reject(_error)
    }
  }
  return Promise.reject(error)
}

//axios cho các api không cần truyền token
apiDefault.interceptors.response.use((response) => response.data)

//axios cho các request cần truyền token
api.interceptors.request.use(privateRequestInterceptor, Promise.reject)
api.interceptors.response.use((response) => response.data, privateResponseInterceptor)

//axios cho các request cần truyền token và upload file
apiDefaultUpload.interceptors.request.use(privateRequestInterceptor, Promise.reject)
apiDefaultUpload.interceptors.response.use((response) => response.data, privateResponseInterceptor)

//axios cho các request cần truyền token và upload file
apiUpload.interceptors.request.use(privateRequestInterceptor, Promise.reject)
apiUpload.interceptors.response.use((response) => response.data, privateResponseInterceptor)

export { api, apiDefault, apiDefaultUpload, apiUpload }
