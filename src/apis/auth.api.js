import { apiDefault } from './axios'
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
})

export const { login, refreshToken, forgotPassword, verifyTempPassword } = authApi()
