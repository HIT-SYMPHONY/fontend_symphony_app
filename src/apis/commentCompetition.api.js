import { comment } from 'postcss'
import { api } from '.'
import { ApiConstant } from '../constants/api.constant'

const commentCompetitionApi = () => ({
  createCommentCompetition: async (competitionId, payload) =>
    api.post(ApiConstant.commentCompetitions.getCommentsBycompetitionId(competitionId), payload),
  getAllCommentsOfCompetition: async (competitionId) =>
    api.get(ApiConstant.commentCompetitions.getCommentsBycompetitionId(competitionId)),
  getMyCommentInCompetition: async (competitionId) =>
    api.get(ApiConstant.commentCompetitions.getMyCommentInCompetition(competitionId)),
  markCommentCompetiton: async (commentId, payload) =>
    api.patch(ApiConstant.commentCompetitions.getById(commentId), payload),
  updateMyComment: async (competitionId, payload) =>
    api.patch(ApiConstant.commentCompetitions.getMyCommentInCompetition(competitionId), payload),
  getCommentCompetitionById: async (commentId) =>
    api.get(ApiConstant.commentCompetitions.getById(commentId)),
})

export const {
  createCommentCompetition,
  getAllCommentsOfCompetition,
  getMyCommentInCompetition,
  markCommentCompetiton,
  updateMyComment,
  getCommentCompetitionById,
} = commentCompetitionApi()
