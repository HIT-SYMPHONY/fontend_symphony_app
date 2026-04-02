import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { Skeleton } from 'antd'
import { getAllCompetitions } from 'apis/competition.api'
import TextMessage from 'components/TextMessage'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { formatDate, translateStatus } from 'utils/formatters'
import useAuth from 'hooks/useAuth'
import './style.scss'

const ManageCompetitions = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const globalSearch = searchParams.get('q') || ''
  const { user } = useAuth()
  const currentUserId = user?.id
  const listParams = { keyword: globalSearch, leaderId: currentUserId }

  const { ref, inView } = useInView({ threshold: 0, rootMargin: '100px' })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey: ['competitions', 'manage-list', listParams],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getAllCompetitions({ ...listParams, pageNum: pageParam })
        return response.data
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage?.meta?.pageNum < lastPage?.meta?.totalPages) {
          return lastPage.meta.pageNum + 1
        }
        return undefined
      },
      enabled: !!currentUserId,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const competitions = data?.pages.flatMap((page) => page.items) || []

  const headerSection = (
    <div className='flex gap-1 items-center mb-4'>
      <Icon
        icon='mdi:book-account'
        className='manage-competition__start__Icon'
        width='40'
        height='40'
        color='#F06C25'
      />
      <h2 className='text-2xl font-bold'>Quản lý cuộc thi</h2>
    </div>
  )

  if (isError) {
    return <ApiErrorDisplay title='Lỗi tải danh sách cuộc thi' refetchQueries={[refetch]} />
  }

  if (isLoading) {
    return (
      <div>
        {headerSection}
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`skeleton-${idx}`}
            className='flex gap-4 mb-6 rounded-[20px] p-4 items-center shadow-[0px_0px_4px_2px_#00000033]'>
            <Skeleton.Image active style={{ width: 292, height: 94, borderRadius: 12 }} />
            <div className='mr-auto w-full max-w-[400px] flex flex-col justify-center'>
              <Skeleton
                active
                title={{ width: '80%' }}
                paragraph={{ rows: 2, width: ['40%', '60%'] }}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {headerSection}

      {competitions.length === 0 && <TextMessage text='Không tìm thấy cuộc thi nào.' />}

      {competitions.map((competition) => (
        <div key={competition.id} onClick={() => navigate(`${competition.id}`)}>
          <div className='flex gap-4 mb-6 rounded-[20px] p-4 items-center shadow-[0px_0px_4px_2px_#00000033] cursor-pointer transition-shadow'>
            <div className='w-[292px] h-[94px] bg-[#D9D9D9] overflow-hidden rounded-xl'>
              {competition.image && (
                <img
                  src={competition.image}
                  alt={competition.name}
                  className='w-full h-full object-cover'
                />
              )}
            </div>
            <div className='mr-auto font-semibold flex flex-col gap-1 items-start justify-center'>
              <p className='text-xl'>{competition?.name}</p>
              <p className='text-primary bg-neutral-light rounded-[4px] px-1'>
                {translateStatus(competition?.status)}
              </p>
              <p className='font-normal text-neutral-grey'>
                Ngày bắt đầu: {formatDate(competition?.startTime)}
              </p>
            </div>
            <i className='fa-solid fa-circle-info text-2xl text-primary hover:opacity-80'></i>
          </div>
        </div>
      ))}

      <div ref={ref} className='w-full py-4 flex flex-col items-center justify-center'>
        {isFetchingNextPage && (
          <div className='flex gap-4 mb-6 rounded-[20px] p-4 items-center w-full shadow-[0px_0px_4px_2px_#00000033] opacity-60'>
            <Skeleton.Image active style={{ width: 292, height: 94, borderRadius: 12 }} />
            <div className='mr-auto w-full max-w-[400px]'>
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          </div>
        )}

        {!hasNextPage && competitions.length > 0 && (
          <p className='text-neutral-grey text-sm mt-4'>Đã hiển thị tất cả cuộc thi.</p>
        )}
      </div>
    </div>
  )
}

export default ManageCompetitions
