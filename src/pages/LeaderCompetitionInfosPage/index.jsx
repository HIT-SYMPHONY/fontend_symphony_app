import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCompetitionById } from 'apis/competition.api'
import { useParams } from 'react-router-dom'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import useAuth from 'hooks/useAuth'
import { formatDate, safeParse } from 'utils/formatters'
import TiptapEditor from 'components/TiptapEditor'
function LeaderCompetitionInfosPage() {
  const { competitionId } = useParams()
  const { user } = useAuth()
  const currentUserFullName = user?.fullName || ''
  const labelClass = 'text-neutral-grey'
  const {
    data: competition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
  })
  if (isError) {
    return <ApiErrorDisplay title='Lỗi tải thông tin cuộc thi'></ApiErrorDisplay>
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className='border-3 border-[#F0F0F0] shadow-[0px_0px_4px_2px_#0000000D] rounded-[32px] px-4 py-2'>
      <div className='flex items-center font-semibold text-2xl gap-2 mb-4'>
        <i className='fa-solid fa-circle-info text-primary'></i>
        <span>Giới thiệu</span>
      </div>
      <div className='font-semibold text-xl pl-8 grid grid-cols-2 gap-4'>
        <div>
          <p className={labelClass}>Tên cuộc thi</p>
          <p>{competition.name}</p>
        </div>
        <div>
          <p className={labelClass}>Leader</p>
          <p>{currentUserFullName}</p>
        </div>
        <div>
          <p className={labelClass}>Thời gian bắt đầu</p>
          <p>{formatDate(competition.startTime)}</p>
        </div>
        <div>
          <p className={labelClass}>Thời gian kết thúc</p>
          <p>{formatDate(competition.endTime)}</p>
        </div>
        <div className='col-span-2'>
          <p className={labelClass}>Nội dung</p>
          <TiptapEditor value={safeParse(competition.content)} editable={false}></TiptapEditor>
        </div>
      </div>
    </div>
  )
}

export default LeaderCompetitionInfosPage
