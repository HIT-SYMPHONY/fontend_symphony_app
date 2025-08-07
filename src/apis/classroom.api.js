import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const classroomApi = () => ({
  getAllClassrooms: async (params) => api.get(ApiConstant.classrooms.base, { params }),

  getClassroomById: async (classroomId) =>
    api.get(`${ApiConstant.classrooms.getById}${classroomId}`),

  createClassroom: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.classrooms.base, formDataPayload),

  updateClassroom: async (classroomId, formDataPayload) =>
    apiDefaultUpload.patch(`${ApiConstant.classrooms.getById}${classroomId}`, formDataPayload),

  getMembersInClassroom: async (classroomId, params) =>
    api.get(ApiConstant.classrooms.members.replace('{id}', classroomId), { params }),

  addMembersToClassroom: async (classroomId, payload) =>
    api.post(ApiConstant.classrooms.members.replace('{id}', classroomId), payload),

  removeMembersFromClassroom: async (classroomId, payload) =>
    api.delete(ApiConstant.classrooms.members.replace('{id}', classroomId), { data: payload }),

  getManagedClasses: async () => api.get(ApiConstant.classrooms.getManaged),
})

export const {
  getAllClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  addMembersToClassroom,
  getMembersInClassroom,
  removeMembersFromClassroom,
  getManagedClasses,
} = classroomApi()
