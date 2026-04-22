import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { useInView } from 'react-intersection-observer'
import { getAllClassroomSummaries } from 'apis/classroom.api'
import { classroomKeys } from 'constants/queryKeys'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import TextMessage from 'components/TextMessage'
import useAuth from 'hooks/useAuth'
import { translateStatus } from 'utils/formatters'
import './style.scss'
import ClassroomPostsAccordion from 'components/ClassroomPostAccordion'
const TableResult = ({ onSetSub }) => {
  const { user } = useAuth()
  const currentUserId = user?.id

  const { ref, inView } = useInView({ threshold: 0, rootMargin: '100px' })

  const [expandedItems, setExpandedItems] = useState({})

  const {
    data: classrooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingClassrooms,
    isError: isErrorClassrooms,
    refetch,
  } = useInfiniteQuery({
    queryKey: classroomKeys.lists(),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllClassroomSummaries({ pageNum: pageParam })
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

  const classroomsData = classrooms?.pages.flatMap((page) => page.items) || []

  const toggleAccordion = (classroomId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [classroomId]: !prev[classroomId],
    }))
  }

  if (isErrorClassrooms) {
    return (
      <ApiErrorDisplay
        title='Lỗi tải danh sách lớp học'
        refetchQueries={[refetch]}
      />
    )
  }

  return (
    <div className='table-result'>
      <div className='table-result__head'>
        <div className='table-result__head__icon'>
          <Icon
            icon='fluent:clipboard-text-32-filled'
            width='30'
            height='30'
            className='table-result__head__icon__fill'
          />
          <h2>Bảng kết quả</h2>
        </div>
        <div className='table-result__head__toggle'>
          <p className='toggle cursor-pointer' onClick={() => onSetSub(true)}>
            Học tập
          </p>
          <p className='cursor-pointer' onClick={() => onSetSub(false)}>
            Cuộc thi
          </p>
        </div>
      </div>

      {isLoadingClassrooms && (
        <div className='p-4'>
          <Skeleton
            active
            avatar={{ size: 80, shape: 'square' }}
            paragraph={{ rows: 2 }}
          />
          <Skeleton
            active
            avatar={{ size: 80, shape: 'square' }}
            paragraph={{ rows: 2 }}
            className='mt-4'
          />
        </div>
      )}

      {!isLoadingClassrooms && classroomsData.length === 0 && (
        <TextMessage text='Bạn chưa tham gia lớp học nào.' />
      )}

      <div className='table-result__body'>
        {classroomsData.map((classroom) => {
          const isExpanded = !!expandedItems[classroom.id]
          return (
            <div className='body' key={classroom.id}>
              <div
                className='body__img cursor-pointer'
                onClick={() => toggleAccordion(classroom.id)}>
                <div className='body__img__hinhanh overflow-hidden'>
                  <img
                    src={classroom.image}
                    alt='classroom cover'
                    className='h-full w-full object-cover'
                  />
                </div>

                <div className='body__img__tieumuc'>
                  <h3>{classroom.name || 'Chưa cập nhật'}</h3>
                  <div className='body__img__tieumuc__space'>
                    <span>
                      {translateStatus(classroom.status) || 'Chưa cập nhật'}
                    </span>
                    <div className='space'>
                      <span>{`${classroom.numberOfPosts || 0} bài tập`}</span>
                      <Icon
                        icon={
                          isExpanded ? 'mingcute:up-fill' : 'mingcute:down-fill'
                        }
                        width='24'
                        height='24'
                        className='space__mau'
                      />
                    </div>
                  </div>
                  <p>Leader: {classroom.leaderName || 'Giảng viên chưa cập nhật'}</p>
                </div>
              </div>

              {isExpanded && (
                <ClassroomPostsAccordion classroomId={classroom.id} />
              )}
            </div>
          )
        })}

        <div ref={ref} className='flex w-full justify-center py-4'>
          {isFetchingNextPage && (
            <Skeleton
              active
              avatar={{ size: 80, shape: 'square' }}
              paragraph={{ rows: 2 }}
            />
          )}
          {!hasNextPage && classroomsData.length > 0 && (
            <p className='text-sm text-gray-500'>Đã hiển thị tất cả lớp học.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TableResult
