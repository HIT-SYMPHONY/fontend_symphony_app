import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'

import { getMyCommentInCompetition } from 'apis/commentCompetition.api'
import { commentCompetitionKeys } from 'constants/queryKeys'
import { formatDate } from 'utils/formatters'

const CompetitionCommentAccordion = ({ competition }) => {
  const navigate = useNavigate()

  const {
    data: myComment,
    isLoading,
    error: commentError,
  } = useQuery({
    queryKey: commentCompetitionKeys.myComment(competition.id),
    queryFn: () =>
      getMyCommentInCompetition(competition.id).then((res) => res.data),
    enabled: !!competition.id,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className='body__thongtin p-4'>
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    )
  }

  const isNotSubmitted =
    commentError &&
    (commentError.response?.status === 404 ||
      commentError.response?.status === 400)

  if (commentError && !isNotSubmitted) {
    return <p className='p-4 text-red-500'>Không thể tải kết quả bài làm.</p>
  }

  if (isNotSubmitted || !myComment) {
    return (
      <div className='body__thongtin flex items-center justify-between p-4'>
        <p className='font-semibold text-orange-500'>
          Bạn chưa nộp bài cho cuộc thi này.
        </p>
        <button
          className='rounded-lg bg-primary px-4 py-2 text-white transition-opacity hover:opacity-80'
          onClick={() => navigate(`/competitions/${competition.id}/test`)}>
          Làm bài ngay
        </button>
      </div>
    )
  }

  return (
    <div className='body__thongtin'>
      <hr />
      <div className='body__thongtin__title'>
        <span></span>
        <span>Điểm</span>
        <span>Thông tin chi tiết</span>
      </div>

      <div className='body__thongtin__table'>
        <div className='list-table'>
          <div className='list-table__title'>
            <Icon
              icon='streamline-ultimate:ranking-stars-ribbon-bold'
              className='list-table__title__icon text-primary'
              width='30'
              height='30'
            />
          </div>

          <h3
            className={`list-table__h3 ${myComment.score === null ? 'text-lg text-gray-400' : ''} whitespace-nowrap`}>
            {myComment.score !== null ? myComment.score : 'Chưa chấm'}
          </h3>

          <div className='list-table__thongtin'>
            <p>Bắt đầu: {formatDate(competition.startTime)}</p>
            <p>Kết thúc: {formatDate(competition.endTime)}</p>
          </div>

          <div className='list-table__thongtin'>
            <p>
              Đã nộp: {formatDate(myComment.updatedAt || myComment.createdAt)}
            </p>
          </div>

          {/* Action Icon */}
          <Icon
            icon='duo-icons:message-3'
            width='40'
            height='40'
            className='list-table__icon cursor-pointer hover:opacity-70'
            onClick={() => navigate(`/competitions/${competition.id}/test`)} // Go to submission page
          />
        </div>
      </div>
    </div>
  )
}

export default CompetitionCommentAccordion;
