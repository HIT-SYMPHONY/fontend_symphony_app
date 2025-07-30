import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const classroomApi = () => ({
  getAllClassrooms: async () => api.get(ApiConstant.classrooms.base),
  createClassroom: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.classrooms.base, formDataPayload),
})

export const { getAllClassrooms, createClassroom } = classroomApi()
