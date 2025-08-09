import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const commentPostApi = () => ({
  createCommentPost: async (payload) => api.post(ApiConstant.commentPosts.base, payload),
})

export const { createCommentPost } = commentPostApi()
