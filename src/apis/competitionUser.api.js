// src/apis/competitionUser.api.js

import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const competitionUserApi = () => ({
  registerCompetition: async (competitionId) => api.post(ApiConstant.competitionUsers.register(competitionId)),
  addMultipleMembers: async (payload) =>
    api.post(ApiConstant.competitionUsers.addMultipleMembers, payload),
  removeMultipleMembers: async (payload) =>
    api.delete(ApiConstant.competitionUsers.removeMultipleMembers, { data: payload }),
  getMembers: async (competitionId, params) =>
    api.get(ApiConstant.competitionUsers.getMembers(competitionId), { params }),
  getNonMembers: async (competitionId, params) =>
    api.get(ApiConstant.competitionUsers.getNonMembers(competitionId), { params }),
})
export const {
  registerCompetition,
  addMultipleMembers,
  removeMultipleMembers,
  getMembers,
  getNonMembers,
} = competitionUserApi()
