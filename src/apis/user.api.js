import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const userApi = () => ({
  getAllUsers: async () => api.get(ApiConstant.users.base),

  getUserById: async (userId) => {
    return api.get(`${ApiConstant.users.baseId}${userId}`)
  },

  getCurrentUser: async () => api.get(ApiConstant.users.getCurrentUser),

  getMyClassrooms: async (status) => {
    const params = status ? { status } : {}
    return api.get(ApiConstant.users.getMyClassrooms, { params })
  },

  updateUser: async (userId, formDataPayload) => {
    return apiDefaultUpload.patch(`${ApiConstant.users.baseId}${userId}`, formDataPayload)
  },

  createUser: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.users.base, formDataPayload),

  getLeaderList: async () => api.get(ApiConstant.users.getLeaders),

  getCurrentUserWithToken: async (token) =>
    api.get(ApiConstant.users.getCurrentUser, { headers: { Authorization: `Bearer ${token}` } }),

  updateUserRoles: async (payload) => api.patch(ApiConstant.users.updateRole, payload),
  getUserClasses: async (userId) =>
    api.get(`${ApiConstant.users.baseId}${userId}${ApiConstant.classrooms.base}`),
  getMyClasses: async () => api.get(ApiConstant.users.getMyClassrooms),
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
  getCurrentUserWithToken,
  getUserClasses,
  getMyClasses,
} = userApi()
