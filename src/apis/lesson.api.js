import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const lessonApi = () => ({
  getMyLessons: async () => api.get(ApiConstant.lessons.getMyLessons),

  createLesson: async (payload) => api.post(ApiConstant.lessons.base, payload),

  getLessonsByClassId: async (classId, params) =>
    api.get(ApiConstant.lessons.getByClassroomId(classId), {params}),

  getLessonsByClassroomId: async (classroomId) => {
    if (!classroomId) return Promise.reject(new Error('Classroom ID is required.'))
    return api.get(ApiConstant.lessons.getByClassroomId(classroomId))
  },

  deleteLesson: async (lessonId) =>
    api.delete(ApiConstant.lessons.getById(lessonId)),

  updateLesson: async (lessonId, payload) =>
    api.put(ApiConstant.lessons.getById(lessonId), payload),

  getLessonById: async (lessonId) =>
    api.get(ApiConstant.lessons.getById(lessonId)),
})

export const {
  getMyLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByClassId,
  getLessonById,
  getLessonsByClassroomId,
} = lessonApi()
