import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const lessonApi = () => ({
  getMyLessons: async () => api.get(ApiConstant.lessons.getMyLessons),
  getLessonsByClassroomId: async (classroomId) => {
    if (!classroomId) return Promise.reject(new Error('Classroom ID is required.'))
    return api.get(`${ApiConstant.lessons.getByClassroomId}${classroomId}`)
  },
})

export const { getMyLessons, getLessonsByClassroomId } = lessonApi()
