import React, { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMembersInClassroom } from '../../../apis/classroom.api'
import LoadMoreButton from '../../LoadMoreButton'
import EndOfListMessage from '../../EndOfListMessage'
import TextMessage from '../../TextMessage'
import placeholderImage from '../../../assets/img/Ellipse.png'
import { getDisplayName } from '../../../utils/formatters'
import { PAGE_SIZE } from 'constants/commonConstant'
import './style.scss'
import useDebounce from 'hooks/useDebounce'

const AllMember = () => {
  const { classId } = useParams()
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['classroomMembers', classId, keyword],
      queryFn: async ({ pageParam = 1 }) => {
        if (!classId) return { items: [], meta: {} }
        const params = {
          pageNum: pageParam,
          pageSize: PAGE_SIZE,
          keyword: keyword || null,
        }
        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(([, v]) => v != null),
        )
        const response = await getMembersInClassroom(classId, filteredParams)
        return response.data
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const meta = lastPage?.meta
        if (meta && meta.pageNum < meta.totalPages) {
          return meta.pageNum + 1
        }
        return undefined
      },
      enabled: !!classId,
      onError: () => {
        toast.error('Không thể tải danh sách thành viên.')
      },
    })
  const members = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data])
  const totalElements = data?.pages?.[0]?.meta?.totalElements || 0

  return (
    <div className='all-member-container'>
      <h3>Danh sách thành viên</h3>
      <div className='all-member-container__summary'>
        <h4>Số lượng thành viên:</h4>
        <span>{isLoading ? '...' : totalElements}</span>
      </div>

      <div className='all-member__grid'>
        <div className='all-member__grid-header'>
          <h5>STT</h5>
          <h5>Tên thành viên</h5>
          <h5>Mã sinh viên</h5>
          <h5 className='all-member__grid-header__intake'>Khóa</h5>
          <h5>Avatar</h5>
        </div>
        <div className='all-member__grid-body'>
          {isLoading ? (
            <TextMessage text='Đang tải...' />
          ) : isError ? (
            <TextMessage text='Lỗi tải dữ liệu.' />
          ) : members.length > 0 ? (
            members.map((item, index) => (
              <div className='all-member__grid-row' key={item.id}>
                <h5 className='all-member__grid-row__number'>{index + 1}</h5>
                <h5>{getDisplayName(item)}</h5>
                <h5>{item.studentCode}</h5>
                <h5>{item.intake}</h5>
                <img
                  src={item.imageUrl || placeholderImage}
                  alt='profile'
                  className='all-member__grid-img'
                />
              </div>
            ))
          ) : (
            <TextMessage text='Lớp học này chưa có thành viên nào.' />
          )}
        </div>
        <LoadMoreButton
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage}
          onClick={() => fetchNextPage()}
        />
        <EndOfListMessage
          isLoading={isLoading}
          hasMore={hasNextPage}
          itemCount={members.length}
          itemName='thành viên'
        />
      </div>
    </div>
  )
}

export default AllMember
