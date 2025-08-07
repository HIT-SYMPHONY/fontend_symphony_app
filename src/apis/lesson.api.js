import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const lessonApi = () => ({
  getMyLessons: async () => api.get(ApiConstant.lessons.getMyLessons),
})

export const { getMyLessons } = lessonApi()
