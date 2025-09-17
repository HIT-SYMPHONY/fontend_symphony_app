import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const userApi = () => ({
  getAllUsers: async (params) => api.get(ApiConstant.users.base, {params}),

  getUserById: async (userId) => {
    return api.get(ApiConstant.users.getById(userId))
  },

  getCurrentUser: async () => api.get(ApiConstant.users.getCurrentUser),

  getMyClassrooms: async (status) => {
    const params = status ? { status } : {}
    return api.get(ApiConstant.users.getMyClassrooms, { params })
  },

  updateUser: async (userId, formDataPayload) => {
    return apiDefaultUpload.patch(ApiConstant.users.getById(userId), formDataPayload)
  },

  createUser: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.users.base, formDataPayload),

  getLeaderList: async () => api.get(ApiConstant.users.getLeaders),

  getCurrentUserWithToken: async (token) =>
    api.get(ApiConstant.users.getCurrentUser, { headers: { Authorization: `Bearer ${token}` } }),

  updateUserRoles: async (payload) => api.patch(ApiConstant.users.updateRole, payload),

  getUserClasses: async (userId) => {
    return api.get(ApiConstant.users.getUserClasses(userId))
  },

  getMyClasses: async () => api.get(ApiConstant.users.getMyClassrooms),

  getMyCompetitions: async () => api.get(ApiConstant.users.getMyCompetitions),

  resetPassword: async (userId) => {
    return api.patch(ApiConstant.users.resetPassword(userId))
  },
})

export const {
  getAllUsers,
  getUserById,
  getMyClassrooms,
  updateUser,
  createUser,
  getLeaderList,
  getCurrentUser,
  updateUserRoles,
  getMyCompetitions,
  getCurrentUserWithToken,
  getUserClasses,
  getMyClasses,
  resetPassword,
} = userApi()
