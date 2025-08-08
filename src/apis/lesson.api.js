import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const lessonApi = () => ({
  getMyLessons: async () => api.get(ApiConstant.lessons.getMyLessons),
  createLesson: async (payload) => api.post(ApiConstant.lessons.base, payload),
  getLessonsByClassId: async (classId) =>
    api.get(`${ApiConstant.lessons.getByClassroomId}${classId}`),
  getLessonsByClassroomId: async (classroomId) => {
    if (!classroomId) return Promise.reject(new Error('Classroom ID is required.'))
    return api.get(`${ApiConstant.lessons.getByClassroomId}${classroomId}`)
  },
  deleteLesson: async (lessonId) => api.delete(`${ApiConstant.lessons.base}/${lessonId}`),
  updateLesson: async (lessonId, payload) =>
    api.put(`${ApiConstant.lessons.base}/${lessonId}`, payload),
  getLessonById: async (lessonId) => api.get(`${ApiConstant.lessons.base}/${lessonId}`),
})

export const {
  getMyLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByClassId,
  getLessonById,
  getLessonsByClassroomId
} = lessonApi()
