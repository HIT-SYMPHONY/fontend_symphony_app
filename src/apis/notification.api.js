import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const notificationApi = () => ({
  getMyNotifications: async (params) =>
    api.get(ApiConstant.notifications.getMyNotifications, { params }),

  deleteNotification: async (notificationId) => {
    return api.delete(ApiConstant.notifications.getById(notificationId))
  },
})

export const { getMyNotifications, deleteNotification } = notificationApi()
