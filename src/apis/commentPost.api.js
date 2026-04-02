import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const commentPostApi = () => ({
  createCommentPost: async (postId, payload) =>
    api.post(ApiConstant.commentPosts.getCommentsByPostId(postId), payload),
  getAllCommentsOfPost: async (postId, params) =>
    api.get(ApiConstant.commentPosts.getCommentsByPostId(postId), { params }),
  getMyCommentInPost: async (postId) =>
    api.get(ApiConstant.commentPosts.getMyCommentInPost(postId)),
  markCommentPost: async (commentId, payload) =>
    api.patch(ApiConstant.commentPosts.getById(commentId), payload),
  updateMyComment: async (postId, payload) =>
    api.patch(ApiConstant.commentPosts.getMyCommentInPost(postId), payload),
  getCommetPostById: async (commentId) => api.get(ApiConstant.commentPosts.getById(commentId)),
})

export const {
  createCommentPost,
  getAllCommentsOfPost,
  getMyCommentInPost,
  markCommentPost,
  updateMyComment,
  getCommetPostById,
} = commentPostApi()
