import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const lessonApi = () => ({
  getMyLessons: async () => api.get(ApiConstant.lessons.getMyLessons),
  createLesson: async (payload) => api.post(ApiConstant.lessons.base, payload),
  getLessonsByClassId: async (classId) =>
    api.get(`${ApiConstant.lessons.getByClassroomId}${classId}`),
  deleteLesson: async (lessonId) => api.delete(`${ApiConstant.lessons.base}/${lessonId}`),
  updateLesson: async (lessonId, payload) =>
    api.put(`${ApiConstant.lessons.base}/${lessonId}`, payload),
})

export const { getMyLessons, createLesson, updateLesson, deleteLesson, getLessonsByClassId } =
  lessonApi()
