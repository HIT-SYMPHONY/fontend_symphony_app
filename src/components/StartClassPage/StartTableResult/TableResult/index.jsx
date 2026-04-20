import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query'
import { getAllClassroomSummaries } from 'apis/classroom.api'
import { getClassroomPostsWithScore } from 'apis/post.api'
import './style.scss'
import { classroomKeys, postKeys } from 'constants/queryKeys'
import ApiErrorDisplay from 'components/ApiErrorDisplay'
import { useInView } from 'react-intersection-observer'
import useAuth from 'hooks/useAuth'
import { translateStatus } from 'utils/formatters'

const TableResult = ({ onSetSub }) => {
  const navigate = useNavigate()
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '100px' })
  const { user } = useAuth()
  const currentUserId = user?.id
  const {
    data: classrooms,
    fetchNextPage: fetchMoreClassrooms,
    hasNextPage: hasMoreClassrooms,
    isFetchingNextPage: isFetchingMoreClassrooms,
    isLoading: isLoadingClassrooms,
    isError: isErrorClassrooms,
    refetch: refetchClassrooms,
  } = useInfiniteQuery({
    queryKey: classroomKeys.list(),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllClassroomSummaries({
        pageNum: pageParam,
      })
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
  const classroomsData = classrooms?.pages.flatMap((page) => page.items) || []
  if (isErrorClassrooms) {
    return (
      <ApiErrorDisplay
        title='Lỗi tải danh sách cuộc thi'
        refetchQueries={[refetch]}
      />
    )
  }
  if (!isLoadingClassrooms) {
    console.log(classroomsData)
  }
  const {
    data: classroomPosts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: postKeys.byClassroom(classroomsData[5]?.id),
    queryFn: () => getClassroomPostsWithScore(classroomsData[5]?.id).then((res) => res.data),
    enabled: !!classroomsData[5],
  })
  if (!isLoadingPosts) {
    console.log(classroomPosts)
  }

  // Dữ liệu mẫu
  const list = [1, 2, 3, 4, 5, 6, 7]
  const lop = [
    {
      name: 'Buổi 8: Kiểm tra',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 1,
    },
    {
      name: 'Bài tập buổi 1',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },
    {
      name: 'Bài tập buổi 2',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },
    {
      name: 'Bài tập buổi 3',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },
    {
      name: 'Bài tập buổi 4',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },
    {
      name: 'Bài tập buổi 4',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },

    {
      name: 'Bài tập buổi 4',
      timenop: 'Ngày kiểm tra: 30/06/2025',
      nguoigiao: 'Người giao: Nguyễn Thị N',
      timegiao: 'Thời gian làm bài: 01 : 30 : 00',
      diem: '80',
      style: 2,
    },
  ]

  // Khởi tạo trạng thái add cho từng mục trong list
  const [addStates, setAddStates] = useState(list.map(() => false))

  // Hàm toggle trạng thái add cho một mục cụ thể
  const toggleAdd = (index) => {
    setAddStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state)),
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
          <p className='toggle' onClick={() => onSetSub(true)}>
            Học tập
          </p>
          <p onClick={() => onSetSub(false)}>Cuộc thi</p>
        </div>
      </div>

      <div className='table-result__body'>
        {classroomsData.map((classroom, index) => (
          <div className='body' key={classroom.id}>
            <div className='body__img'>
              <div className='body__img__hinhanh overflow-hidden'>
                <img
                  src={classroom.image}
                  alt=''
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='body__img__tieumuc'>
                <h5>{classroom.name || 'Chưa cập nhật'}</h5>
                <div className='body__img__tieumuc__space'>
                  <span>{translateStatus(classroom.status) || 'Chưa cập nhật'}</span>
                  <div className='space'>
                    <span>{`${classroom.numberOfPosts} bài tập`}</span>
                    <Icon
                      icon={
                        addStates[index]
                          ? 'mingcute:up-fill'
                          : 'mingcute:down-fill'
                      }
                      width='24'
                      height='24'
                      className='space__mau'
                      onClick={() => toggleAdd(index)}
                    />
                  </div>
                </div>
                <p>{classroom.leaderName || 'Chưa cập nhật'}</p>
              </div>
            </div>
            {addStates[index] && (
              <div className='body__thongtin'>
                <hr />
                <div className='body__thongtin__title'>
                  <span>Tên bài</span>
                  <span>Điểm</span>
                  <span>Thông tin chi tiết</span>
                </div>
                <div className='body__thongtin__table'>
                  {lop.map((item, index) => (
                    <div className='list-table' key={index}>
                      <div className='list-table__title'>
                        <Icon
                          icon='material-symbols:menu-book-rounded'
                          width='24'
                          height='24'
                          className='list-table__title__icon'
                        />
                        <h5>{item.name}</h5>
                      </div>
                      <h3 className='list-table__h3'>{item.diem}</h3>
                      <div className='list-table__thongtin'>
                        <p>{item.nguoigiao}</p>
                        <p>{item.timenop}</p>
                      </div>
                      <div className='list-table__thongtin'>
                        <p>{item.timenop}</p>
                      </div>
                      <Icon
                        icon='duo-icons:message-3'
                        width='40'
                        height='40'
                        className='list-table__icon'
                        onClick={() => navigate('comment')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableResult
