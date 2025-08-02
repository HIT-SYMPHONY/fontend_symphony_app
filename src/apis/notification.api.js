// import { api, apiDefaultUpload } from '.'
// import { ApiConstant } from '../constants/api.constant'

// const notificationApi = () => ({
//   getAllNotifications: async () => api.get(ApiConstant.notifications.base),
// })

// export const { getAllNotifications } = notificationApi()

// import { api } from '.'
// import { ApiConstant } from '../constants/api.constant'

// const notificationApi = () => ({
//   getAllNotifications: async () => api.get(ApiConstant.notifications.base),

//   getNotificationsForCurrentUser: async (params) =>
//     api.get(ApiConstant.notifications.base, { params }),

//   getNotificationsByClassId: async (classId, params) =>
//     api.get(`${ApiConstant.notifications.getById}${classId}`, { params }),

//   createNotification: async (payload) => api.post(ApiConstant.notifications.base, payload),

//   deleteNotification: async (notificationId) =>
//     api.delete(`${ApiConstant.notifications.getById}${notificationId}`),
// })

// export const {
//   getAllNotifications,
//   getNotificationsForCurrentUser,
//   getNotificationsByClassId,
//   createNotification,
//   deleteNotification,
// } = notificationApi()

import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const notificationApi = () => ({
  getAllNotifications: async () => api.get(ApiConstant.notifications.base),

  getNotificationsForCurrentUser: async (params) =>
    api.get(ApiConstant.notifications.base, { params }),

  getNotificationsByClassId: async (classId, params) =>
    api.get(`${ApiConstant.notifications.getById}${classId}`, { params }),

  createNotification: async (payload) => api.post(ApiConstant.notifications.base, payload),

  deleteNotification: async (notificationId) =>
    api.delete(`${ApiConstant.notifications.getById}${notificationId}`),
})

export const {
  getAllNotifications,
  getNotificationsForCurrentUser,
  getNotificationsByClassId,
  createNotification,
  deleteNotification,
} = notificationApi()
