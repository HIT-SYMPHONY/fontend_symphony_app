import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const userApi = () => ({
  getAllUsers: async () => api.get(ApiConstant.users.base),

  getUserById: async (userId) => {
    if (!userId) return Promise.reject(new Error('User ID is required.'))
    return api.get(`${ApiConstant.users.getById}${userId}`)
  },

  getCurrentUser: async () => api.get(ApiConstant.users.getCurrentUser),

  getMyClassrooms: async (status) => {
    const params = status ? { status } : {}
    return api.get(ApiConstant.users.getMyClassrooms, { params })
  },

  updateUser: async (userId, formDataPayload) => {
    if (!userId) return Promise.reject(new Error('User ID is required for update.'))
    return apiDefaultUpload.patch(`${ApiConstant.users.update}${userId}`, formDataPayload)
  },

  createUser: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.users.base, formDataPayload),

  updateUserRoles: async (payload) => api.patch(ApiConstant.users.updateRole, payload),
  getUserClasses: async (userId) =>
    api.get(`${ApiConstant.users.baseId}${userId}${ApiConstant.classrooms.base}`),
  getMyClasses: async () => api.get(ApiConstant.users.getMyClassrooms),
})

export const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  getMyClassrooms, // The new function is now exported
  updateUser,
  createUser,
  updateUserRoles,
  getUserClasses,
  getMyClasses,
} = userApi()
