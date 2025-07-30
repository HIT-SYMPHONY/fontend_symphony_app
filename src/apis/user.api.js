import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const userApi = () => ({
  getAllUsers: async () => api.get(ApiConstant.users.base),
  getUserById: async (userId) => {
    return api.get(`${ApiConstant.users.getById}${userId}`)
  },
  updateUser: async (userId, formDataPayload) => {
    return apiDefaultUpload.patch(`${ApiConstant.users.update}${userId}`, formDataPayload)
  },
  createUser: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.users.base, formDataPayload),
})

export const { getAllUsers, getUserById, updateUser, createUser } = userApi()
