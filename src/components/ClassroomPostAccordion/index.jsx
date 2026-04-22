import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { getClassroomPostsWithScore } from 'apis/post.api'
import { postKeys } from 'constants/queryKeys'
import { useNavigate } from 'react-router-dom'
import { formatDate } from 'utils/formatters'

const ClassroomPostsAccordion = ({ classroomId }) => {
  const navigate = useNavigate()

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: postKeys.byClassroom(classroomId),
    queryFn: () =>
      getClassroomPostsWithScore(classroomId).then((res) => res.data),
    enabled: !!classroomId,
  })

  if (isLoading) {
    return (
      <div className='body__thongtin p-4'>
        <Skeleton active paragraph={{ rows: 3 }} />
      </div>
    )
  }

  if (isError) {
    return <p className='p-4 text-red-500'>Không thể tải danh sách bài tập.</p>
  }

  if (posts.length === 0) {
    return (
      <p className='p-4 text-center text-gray-500'>
        Lớp học này chưa có bài tập nào.
      </p>
    )
  }

  return (
    <div className='body__thongtin'>
      <hr />
      <div className='body__thongtin__title'>
        <span>Tên bài</span>
        <span>Điểm</span>
        <span>Thông tin chi tiết</span>
      </div>

      <div className='body__thongtin__table'>
        {posts.map((post) => (
          <div className='list-table' key={post.id}>
            <div className='list-table__title'>
              <Icon
                icon='material-symbols:menu-book-rounded'
                width='24'
                height='24'
                className='list-table__title__icon'
              />
              <h4>{post.title}</h4>
            </div>

            {/* Điểm (Score) */}
            <h3 className={`list-table__h3 whitespace-nowrap`}>
              {post.commentPostScore !== null
                ? post.commentPostScore
                : 'Chưa chấm'}
            </h3>

            {/* Thông tin chi tiết */}
            <div className='list-table__thongtin'>
              <p>Ngày giao: {formatDate(post.createdAt)}</p>
              <p>
                Hạn nộp:{' '}
                {post.deadline ? formatDate(post.deadline) : 'Không có hạn'}
              </p>
            </div>

            <div className='list-table__thongtin'>
              {post.commentPostUpdatedAt ? (
                <p>Đã nộp: {formatDate(post.commentPostUpdatedAt)}</p>
              ) : (
                <p className='text-orange-500'>Chưa nộp bài</p>
              )}
            </div>

            <Icon
              icon='duo-icons:message-3'
              width='40'
              height='40'
              className='list-table__icon cursor-pointer hover:opacity-70'
              onClick={() => navigate(`/my-classes/${classroomId}/exams/${post.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClassroomPostsAccordion
