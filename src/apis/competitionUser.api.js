// src/apis/competitionUser.api.js

import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const competitionUserApi = () => ({
  joinCompetition: async (payload) => api.post(ApiConstant.competitionUsers.join, payload),
})

export const { joinCompetition } = competitionUserApi()
