import React from 'react'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton, Button } from 'antd'
import { getCompetitionById } from 'apis/competition.api'
import { getCurrentUser } from 'apis/user.api'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate, translateStatus } from 'utils/formatters'

import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { competitionKeys, userKeys } from 'constants/queryKeys'

function CompetitionTestsPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const {
    data: competition,
    isLoading: isLoadingCompetition,
    isError: isErrorCompetition,
    refetch: refetchCompetition,
  } = useQuery({
    queryKey: competitionKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId).then((res) => res.data),
    enabled: !!competitionId,
  })

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: userKeys.currentUser(),
    queryFn: () => getCurrentUser().then((res) => res.data),
    enabled: true,
  })

  const handleTestButtonClick = () => {
    if (!isLoadingCompetition && competition?.status !== 'ONGOING') {
      toast.error('Cuộc thi chưa bắt đầu hoặc đã kết thúc.')
      return
    }
    navigate(`/competitions/${competitionId}/test`)
  }

  const isAnyLoading = isLoadingCompetition || isLoadingUser
  const isAnyError = isErrorCompetition || isErrorUser

  if (isAnyError) {
    return <ApiErrorDisplay refetchQueries={[refetchCompetition, refetchUser]} />
  }

  return (
    <div className='shadow-[0px_0px_4px_2px_#00000040] rounded-[20px] h-full p-4'>
      <h1 className='font-semibold text-2xl mb-4 flex items-center gap-2'>
        Phần thi:
        {isLoadingCompetition ? (
          <Skeleton.Input active size='small' />
        ) : (
          <span className='font-normal'>{competition?.name}</span>
        )}
      </h1>

      {isLoadingUser ? (
        <Skeleton avatar={{ size: 84 }} paragraph={{ rows: 2 }} active />
      ) : (
        user && (
          <div className='flex gap-4 items-center'>
            <div className='w-[84px] h-[84px] bg-[#D9D9D9] rounded-full overflow-hidden ml-4 flex-shrink-0'>
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'Avatar'}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-500'>
                  <i className='fa-solid fa-user text-3xl'></i>
                </div>
              )}
            </div>

            <div className='flex flex-col gap-1 font-semibold text-xl justify-center flex-1'>
              <p>
                Họ và tên: <span className='font-normal'>{user?.fullName || 'Chưa cập nhật'}</span>
              </p>
              <p>
                Mã sinh viên:
                <span className='font-normal'>{user?.studentCode || 'Chưa cập nhật'}</span>
              </p>
            </div>

            <div className='flex flex-col gap-1 font-semibold text-xl justify-center flex-1'>
              <p>
                Khóa: <span className='font-normal'>{user?.intake || 'Chưa cập nhật'}</span>
              </p>
              <p>
                Ngày sinh:
                <span className='font-normal'>
                  {user?.dateBirth ? formatDate(user.dateBirth) : 'Chưa cập nhật'}
                </span>
              </p>
            </div>
          </div>
        )
      )}

      <div className='shadow-[0px_0px_4px_2px_#00000033] rounded-[20px] mt-4 flex p-3 items-center gap-2 font-semibold'>
        <div className='bg-primary rounded-xl w-[48px] aspect-square flex items-center justify-center'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            className='text-[#fff]'
            width={32}
            height={32}
          />
        </div>

        {isLoadingCompetition ? (
          <Skeleton.Input active size='small' />
        ) : (
          <>
            <p className='text-xl'>{competition?.name || 'Chưa cập nhật'}</p>
            <p className='bg-neutral-light text-primary rounded-lg p-1 text-lg mr-auto'>
              {translateStatus(competition?.status) || 'Chưa cập nhật'}
            </p>
            <p
              className='text-primary text-lg mr-8 cursor-pointer hover:underline'
              onClick={handleTestButtonClick}>
              Làm bài
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default CompetitionTestsPage
