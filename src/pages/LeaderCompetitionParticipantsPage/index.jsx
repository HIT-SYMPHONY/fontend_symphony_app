import { useInfiniteQuery } from '@tanstack/react-query'
import { getMembers } from 'apis/competitionUser.api'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import {
  formatDate,
  getDisplayName,
} from 'utils/formatters'
import { Skeleton } from 'antd'
import { competitionUserKeys } from 'constants/queryKeys'

function LeaderCompetitionParticipantsPage() {
  const navigate = useNavigate()
  const { competitionId } = useParams()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('keyword') || ''
  const listParams = { keyword: searchTerm }

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: competitionUserKeys.members(competitionId, listParams),

    queryFn: async ({ pageParam = 1 }) => {
      const response = await getMembers(competitionId, {
        ...listParams,
        pageNum: pageParam,
      })
      return response.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage?.meta?.pageNum < lastPage?.meta?.totalPages
      ) {
        return lastPage.meta.pageNum + 1
      }
      return undefined
    },
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ])

  const tableHeader = (
    <div className='mb-2 grid shrink-0 grid-cols-[54px_2fr_1fr_1fr_72px] items-center gap-2 border-b border-gray-200 pb-3'>
      <p></p>
      <p>Tên thí sinh</p>
      <p>Mã sinh viên</p>
      <p>Thời gian đăng kí</p>
      <p>Avatar</p>
    </div>
  )

  if (isError) {
    return (
      <ApiErrorDisplay
        title='Lỗi tải danh sách thí sinh'
        refetchQueries={[refetch]}
      />
    )
  }

  if (isLoading) {
    return (
      <div className='font-semibold'>
        <p className='mb-1 text-2xl'>Danh sách thí sinh</p>
        <div className='mb-2 flex items-center gap-2 text-xl'>
          Số lượng thí sinh:
          <Skeleton.Input
            active
            size='small'
            style={{ width: 40 }}
          />
        </div>

        <div className='flex max-h-[500px] flex-col rounded-[20px] px-6 pb-2 pt-4 text-xl shadow-custom'>
          {tableHeader}
          <div className='flex-1 overflow-hidden'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                className='grid grid-cols-[54px_2fr_1fr_1fr_72px]  mb-2 items-center gap-2'
                key={`skeleton-${index}`}>
                <Skeleton.Button
                  active
                  size='small'
                  shape='circle'
                  style={{ width: 20, minWidth: 20 }}
                />
                <Skeleton.Input active size='small' block />
                <Skeleton.Input active size='small' block />
                <Skeleton.Input active size='small' block />
                <Skeleton.Avatar active size='default' />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const members =
    data?.pages.flatMap((page) => page.items) || []
  const totalMembers =
    data?.pages[0]?.meta?.totalElements || 0

  return (
    <div className='font-semibold'>
      <p className='mb-1 text-2xl'>Danh sách thí sinh</p>
      <p className='mb-2 text-xl'>
        Số lượng thí sinh: {totalMembers}
      </p>

      <div className='flex max-h-[500px] flex-col rounded-[20px] px-6 pb-2 pt-4 text-xl shadow-custom'>
        {tableHeader}
        <div className='flex-1 overflow-y-auto pr-2'>
          {members.length == 0 ? (
            <p className='py-4 text-center text-gray-500'>
              Chưa có thí sinh nào.
            </p>
          ) : (
            members.map((member, index) => (
              <div
                className='mb-2 grid grid-cols-[54px_2fr_1fr_1fr_54px] items-center gap-2 rounded-xl border-b border-t border-primary-medium bg-neutral-light'
                key={member.id}>
                <p className='flex aspect-square items-center justify-center rounded-xl bg-secondary-light text-white'>
                  {index + 1}
                </p>
                <p>{getDisplayName(member)}</p>
                <p>{member.studentCode}</p>
                <p>{formatDate(member.joinedAt)}</p>
                <div className='aspect-square h-[48px] w-[48px] overflow-hidden rounded-full bg-gray-200'>
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt='avatar'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <i className='fa-solid fa-user flex h-full w-full items-center justify-center text-gray-400'></i>
                  )}
                </div>
              </div>
            ))
          )}

          {/* INFINITE SCROLL TRIGGER DIV */}
          <div ref={ref} className='w-full py-2'>
            {isFetchingNextPage && (
              <div className='my-2 grid grid-cols-[54px_2fr_1fr_1fr_54px] items-center gap-2 opacity-60'>
                <Skeleton.Button
                  active
                  size='small'
                  shape='circle'
                  style={{ width: 20, minWidth: 20 }}
                />
                <Skeleton.Input active size='small' block />
                <Skeleton.Input active size='small' block />
                <Skeleton.Input active size='small' block />
                <Skeleton.Avatar active size='default' />
              </div>
            )}
            {!hasNextPage && members.length > 0 && (
              <p className='mt-4 text-center text-sm text-neutral-grey'>
                Đã hiển thị tất cả thí sinh.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaderCompetitionParticipantsPage
