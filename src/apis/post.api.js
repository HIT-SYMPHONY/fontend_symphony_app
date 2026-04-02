import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const postApi = () => ({
  getPostsByClassroomId: async (classroomId, params) => {
    if (!classroomId) {
      return Promise.reject(new Error('Classroom ID is required.'))
    }
    const url = ApiConstant.posts.getByClassroomId(classroomId)

    return api.get(url, { params })
  },

  getMyPosts: async () => api.get(ApiConstant.users.getMyPosts),

  createPost: async (payload) => api.post(ApiConstant.posts.base, payload),

  getPostById: async (postId) => api.get(ApiConstant.posts.getById(postId)),

  updatePost: async (postId, payload) => api.put(ApiConstant.posts.getById(postId), payload),

  deletePost: async (postId) => api.delete(ApiConstant.posts.getById(postId)),
})

export const {
  getPostsByClassroomId,
  getMyPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} = postApi()
