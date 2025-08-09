import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const postApi = () => ({
  getPostsByClassroomId: async (classroomId, params) => {
    if (!classroomId) {
      return Promise.reject(new Error('Classroom ID is required.'))
    }
    const url = `${ApiConstant.posts.base}/${classroomId}`

    return api.get(url, { params })
  },
  getMyPosts: async () => api.get(ApiConstant.users.getMyPosts),
  createPost: async (payload) => api.post(ApiConstant.posts.base, payload),
  getPostById: async (postId) => api.get(`${ApiConstant.posts.base}/${postId}`),
})

export const { getPostsByClassroomId, getMyPosts, createPost , getPostById} = postApi()
