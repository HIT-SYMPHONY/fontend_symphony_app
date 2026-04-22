import React from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import TiptapEditor from 'components/TiptapEditor'
import { useQuery } from '@tanstack/react-query'
import { getMyCommentInCompetition } from 'apis/commentCompetition.api'
import { get } from 'react-hook-form'
import { getCompetitionById } from 'apis/competition.api'
import SubmissionPageSkeleton from 'components/SubmissionPageSkeleton'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { commentCompetitionKeys, competitionKeys } from 'constants/queryKeys'

const ComeptitionScorePage = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const {
    data: competitionData,
    isLoading: loadingCompetition,
    error: isCompetitionError,
  } = useQuery({
    queryKey: competitionKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId),
    enabled: !!competitionId,
    select: (response) => response?.data || response,
  })

  const {
    data: myComment,
    isLoading: loadingComment,
    error: isMyCommentError,
  } = useQuery({
    queryKey: commentCompetitionKeys.myComment(competitionId),
    queryFn: () => getMyCommentInCompetition(competitionId),
    enabled: !!competitionId,
    retry: false,
    select: (response) => response?.data || response,
  })

  if (loadingCompetition || loadingComment) {
    return <SubmissionPageSkeleton />
  }

  if (isCompetitionError || isMyCommentError) {
    return <ApiErrorDisplay></ApiErrorDisplay>
  }

  return (
    <>
      <div className='flex justify-between box-border'>
        <div className='flex flex-col gap-[10px] flex-1'>
          <div className='flex items-center gap-[15px]'>
            <i
              className='fa-solid fa-arrow-left text-[#ff6911] text-[30px] cursor-pointer'
              onClick={() => navigate(-1)}></i>
            <h2 className='text-xl font-bold'>{competitionData?.name || 'Tên lớp học'}</h2>
          </div>

          <div className='flex items-center gap-[20px]'>
            <strong>{competitionData?.name || 'Bài kiểm tra'}</strong>
          </div>

          <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] w-full'>
            <strong>Nội dung: </strong>
            <div className='mt-2'>
              <TiptapEditor value={competitionData?.content} editable={false} />
            </div>
          </div>

          <div className='border-2 border-[#eeecec] rounded-[10px] p-[10px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] w-full mt-[20px]'>
            <strong>Nhận xét: </strong>
            <div className='mt-2'>
              <TiptapEditor value={myComment?.feedback} editable={false} />
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-end px-4 pt-4 gap-[20px]'>
          <div className='p-[12px] bg-[#ff6911] rounded-[10px] text-[#fdfdfd] flex flex-col items-center'>
            <span>Điểm</span>
            <h2 className='text-2xl font-bold m-0'>
              {myComment?.score !== undefined && myComment?.score !== null ? myComment.score : '-'}
            </h2>
          </div>

          <h3 className='text-center bg-[#a2a2a2] rounded-[10px] text-[#fdfdfd] flex flex-col justify-center items-center p-2 m-0'>
            <span className='text-xl font-bold'>ĐÃ</span>
            <span className='text-xl font-bold'>NỘP</span>
          </h3>
        </div>
      </div>
    </>
  )
}

export default ComeptitionScorePage
