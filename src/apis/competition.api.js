import { api, apiDefaultUpload } from '.'
import { ApiConstant } from '../constants/api.constant'

const competitionApi = () => ({
  getAllCompetitions: async (params) => api.get(ApiConstant.competitions.base, { params }),

  getCompetitionById: async (competitionId) =>
    api.get(`${ApiConstant.competitions.getById}${competitionId}`),

  createCompetition: async (formDataPayload) =>
    apiDefaultUpload.post(ApiConstant.competitions.base, formDataPayload),
  updateCompetition: async (competitionId, formDataPayload) =>
    apiDefaultUpload.patch(`${ApiConstant.competitions.base}/${competitionId}`, formDataPayload),
})

export const { getAllCompetitions, getCompetitionById, createCompetition, updateCompetition } =
  competitionApi()
