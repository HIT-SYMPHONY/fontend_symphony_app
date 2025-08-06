import { apiDefault, api} from './axios'
import { ApiConstant } from '../constants/api.constant'

const authApi = () => ({
  login: async ({ studentCode, password }) =>
    apiDefault.post(ApiConstant.auth.login, {
      studentCode,
      password,
    }),
  refreshToken: async ({ refreshToken }) =>
    apiDefault.post(ApiConstant.auth.refreshToken, {
      refreshToken,
    }),

  forgotPassword: async ({ email }) =>
    apiDefault.post(ApiConstant.auth.forgotPassword, {
      email,
    }),
  verifyTempPassword: async ({ email, tempPassword }) =>
    apiDefault.post(ApiConstant.auth.verifyTempPassword, {
      email,
      tempPassword,
    }),
  changePassword: async (payload) => api.patch(ApiConstant.auth.changePassword, payload),

  verifyPassword: async (payload) => api.post(ApiConstant.auth.verifyPassword, payload),
})

export const {
  login,
  refreshToken,
  forgotPassword,
  verifyTempPassword,
  changePassword,
  verifyPassword,
} = authApi()
