import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const classroomApi = () => ({
  getAllClassrooms: async () => api.get(ApiConstant.classrooms.base),
  createClassroom: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.classrooms.base, formDataPayload),
  getClassroomById: async (classroomId) =>
    api.get(`${ApiConstant.classrooms.getById}${classroomId}`),
  updateClassroom: async (classroomId, formDataPayload) =>
    apiDefaultUpload.patch(`${ApiConstant.classrooms.update}${classroomId}`, formDataPayload),
})

export const { getAllClassrooms, getClassroomById, updateClassroom, createClassroom } =
  classroomApi()
