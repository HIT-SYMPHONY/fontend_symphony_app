import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const notificationApi = () => ({
  getAllNotifications: async () => api.get(ApiConstant.notifications.base),

  getNotificationsForCurrentUser: async (params) =>
    api.get(ApiConstant.notifications.base, { params }),

  createNotification: async (payload) => api.post(ApiConstant.notifications.base, payload),

  getNotificationsByClassId: async (classroomId, params) => {
    return api.get(ApiConstant.notifications.getByClassroomId(classroomId), { params })
  },

  deleteNotification: async (notificationId) => {
    return api.delete(ApiConstant.notifications.getById(notificationId))
  },
})

export const {
  getAllNotifications,
  getNotificationsForCurrentUser,
  getNotificationsByClassId,
  createNotification,
  deleteNotification,
} = notificationApi()
