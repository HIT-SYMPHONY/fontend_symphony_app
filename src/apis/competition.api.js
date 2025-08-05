import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const competitionApi = () => ({
  getAllCompetitions: async (params) => api.get(ApiConstant.competitions.base, { params }),

  getCompetitionById: async (competitionId) =>
    api.get(`${ApiConstant.competitions.getById}${competitionId}`),

  createCompetition: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.competitions.base, formDataPayload),

  updateCompetition: async (competitionId, formDataPayload) =>
    apiDefaultUpload.patch(`${ApiConstant.competitions.getById}${competitionId}`, formDataPayload),

  addMultipleMembers: async (payload) =>
    api.post(ApiConstant.competitions.addMultipleMembers, payload),

  removeMultipleMembers: async (payload) =>
    api.delete(ApiConstant.competitions.removeMultipleMembers, { data: payload }),

  getMembers: async (competitionId, params) =>
    api.get(`${ApiConstant.competitions.getMembers}${competitionId}/members`, { params }),

  getNonMembers: async (competitionId, params) =>
    api.get(`${ApiConstant.competitions.getNonMembers}${competitionId}/non-members`, { params }),
})

export const {
  getAllCompetitions,
  getCompetitionById,
  createCompetition,
  updateCompetition,
  addMultipleMembers,
  removeMultipleMembers,
  getMembers,
  getNonMembers,
} = competitionApi()
