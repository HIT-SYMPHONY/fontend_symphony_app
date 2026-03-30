import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
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
    refetch,
  } = useQuery({
    queryKey: ['competition', competitionId],
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
  })

  if (isError) {
    return <ApiErrorDisplay title='Lỗi tải thông tin cuộc thi' refetchQueries={[refetch]} />
  }

  if (isLoading) {
    return (
      <div className='border-3 border-[#F0F0F0] shadow-[0px_0px_4px_2px_#0000000D] rounded-[32px] px-4 py-4'>
        <div className='flex items-center font-semibold text-2xl gap-2 mb-4'>
          <i className='fa-solid fa-circle-info text-primary'></i>
          <span>Giới thiệu</span>
        </div>

        <div className='font-semibold text-xl pl-8 grid grid-cols-2 gap-6'>
          <div>
            <p className={labelClass}>Tên cuộc thi</p>
            <Skeleton.Input active size='small' style={{ width: '80%' }} />
          </div>
          <div>
            <p className={labelClass}>Leader</p>
            <p>{currentUserFullName || <Skeleton.Input active size='small' />}</p>
          </div>
          <div>
            <p className={labelClass}>Thời gian bắt đầu</p>
            <Skeleton.Input active size='small' style={{ width: '60%' }} />
          </div>
          <div>
            <p className={labelClass}>Thời gian kết thúc</p>
            <Skeleton.Input active size='small' style={{ width: '60%' }} />
          </div>
          <div className='col-span-2 mt-2'>
            <p className={labelClass}>Nội dung</p>
            <div className='border border-gray-200 rounded-lg p-4 bg-gray-50 mt-1'>
              <Skeleton active title={false} paragraph={{ rows: 5 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='border-3 border-[#F0F0F0] shadow-[0px_0px_4px_2px_#0000000D] rounded-[32px] px-4 py-4'>
      <div className='flex items-center font-semibold text-2xl gap-2 mb-4'>
        <i className='fa-solid fa-circle-info text-primary'></i>
        <span>Giới thiệu</span>
      </div>

      <div className='font-semibold text-xl pl-8 grid grid-cols-2 gap-6'>
        <div>
          <p className={labelClass}>Tên cuộc thi</p>
          <p>{competition?.name}</p>
        </div>
        <div>
          <p className={labelClass}>Leader</p>
          <p>{currentUserFullName}</p>
        </div>
        <div>
          <p className={labelClass}>Thời gian bắt đầu</p>
          <p>{competition?.startTime ? formatDate(competition.startTime) : 'N/A'}</p>
        </div>
        <div>
          <p className={labelClass}>Thời gian kết thúc</p>
          <p>{competition?.endTime ? formatDate(competition.endTime) : 'N/A'}</p>
        </div>
        <div className='col-span-2 mt-2'>
          <p className={labelClass}>Nội dung</p>
          <TiptapEditor value={safeParse(competition?.content)} editable={false} />
        </div>
      </div>
    </div>
  )
}

export default LeaderCompetitionInfosPage
