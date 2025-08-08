import { api } from '.'

const leaderApi = () => ({
  getLeaderClassrooms: async (status) => {
    const params = status ? { status } : {}
    return api.get('/classrooms/by-leader', { params })
  },
})

export const { getLeaderClassrooms } = leaderApi()
