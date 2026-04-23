import React, { useState, Suspense } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { classroomKeys, lessonKeys, postKeys } from 'constants/queryKeys' 
import { getClassroomById } from '../../../../apis/classroom.api'
import { getLessonsByClassroomId } from '../../../../apis/lesson.api.js'
import { getPostsByClassroomId } from '../../../../apis/post.api.js'
import {
  formatDate,
  formatDateTime,
  translateStatus,
  getPostStatus,
  safeParse,
  formatDateForBox,
} from '../../../../utils/formatters'
import EditorPlaceholder from 'components/EditorPlaceHolder/index.jsx'

import './style.scss'

const TiptapEditor = React.lazy(() => import('../../../TiptapEditor'))

const HomeInformation = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [showHomework, setShowHomework] = useState(false)
  const [expandedLessons, setExpandedLessons] = useState({})

  const {
    data: classroom,
    isLoading: isLoadingClassroom,
    isError: isErrorClassroom,
  } = useQuery({
    queryKey: classroomKeys.detail(classId), 
    queryFn: () => getClassroomById(classId).then((res) => res.data),
    enabled: !!classId,
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải thông tin lớp học.')
      navigate(-1)
    },
  })

  const { data: lessons = [], isLoading: isLoadingLessons } = useQuery({
    queryKey: lessonKeys.byClassroom(classId), 
    queryFn: () => getLessonsByClassroomId(classId).then((res) => res.data || []),
    enabled: !!classId,
  })

  const { data: posts = [], isLoading: isLoadingPosts } = useQuery({
    queryKey: postKeys.byClassroom(classId, { pageNum: 1, pageSize: 100 }), 
    queryFn: () =>
      getPostsByClassroomId(classId, { pageNum: 1, pageSize: 100 }).then((res) => res.data || []),
    enabled: !!classId,
  })

  const toggleLessonBox = (lessonId) => {
    setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  const isLoading = isLoadingClassroom || isLoadingLessons || isLoadingPosts
  const descriptionContent = safeParse(classroom?.description)

  if (isLoading) {
    return (
      <div className='informationclass' style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
          <div style={{ flex: 3 }}>
            <Skeleton.Input active style={{ width: '70%', height: 32, marginBottom: '1rem' }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
          <div style={{ flex: 1 }}>
            <Skeleton.Image style={{ width: 200, height: 150, borderRadius: 10 }} />
          </div>
        </div>
        <Skeleton active paragraph={{ rows: 10 }} style={{ marginTop: '2rem' }} />
      </div>
    )
  }

  if (isErrorClassroom || !classroom)
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>Không tìm thấy dữ liệu lớp học.</div>
    )

  return (
    <div className='informationclass'>
      <div className='informationclass__gioithieu'>
        <div className='informationclass__gioithieu__context'>
          <div className='informationclass__gioithieu__context__name'>
            <h1 className='text-4xl font-bold'>{classroom.name}</h1>
            <span>{translateStatus(classroom.status)}</span>
          </div>
          <div className='informationclass__gioithieu__context__error'>
            <Icon icon='streamline-plump:information-circle-solid' width='26' height='26' />
            <h4>Thông tin lớp học</h4>
          </div>
          <div className='informationclass__gioithieu__context__noidung'>
            <strong>Mô tả: </strong>
            {classroom.description ? (
              <Suspense fallback={<EditorPlaceholder />}>
                <TiptapEditor
                  value={descriptionContent}
                  editable={false}
                  editorClassName='!max-h-[150px]'
                />
              </Suspense>
            ) : (
              <p>Chưa có mô tả.</p>
            )}
            <div className='informationclass__gioithieu__context__noidung__row'>
              <strong>Leader: {classroom.leaderName}</strong>
              <strong>Lịch học: {lessons[0]?.timeSlot || 'Chưa cập nhật'}</strong>
            </div>
            <div className='informationclass__gioithieu__context__noidung__row'>
              <strong>Ngày bắt đầu: {formatDate(classroom.startTime)}</strong>
              <strong>Độ dài lớp học: {classroom.duration} tuần</strong>
            </div>
          </div>
        </div>
        <div className='informationclass__gioithieu__image'>
          {classroom.image && (
            <img
              src={classroom.image}
              alt={classroom.name}
              style={{ width: '200px', height: '150px', borderRadius: '10px', objectFit: 'cover' }}
            />
          )}
        </div>
      </div>
      <div className='informationclass__lesson'>
        <div className={`informationclass__lesson__left ${showHomework ? 'all' : ''}`}>
          <div className='informationclass__lesson__left__begin'>
            <div className='informationclass__lesson__left__begin__icon'>
              <div className='informationclass__lesson__left__begin__book'>
                <Icon icon='material-symbols:book-2-rounded' width='26' height='26' />
                <p>Bài Học ({lessons.length})</p>
              </div>
            </div>
            <div className='informationclass__lesson__left__begin__pair'>
              <Icon
                icon='material-symbols:menu-book-rounded'
                width='26'
                height='26'
                className={`informationclass__lesson__left__begin__pair__${
                  showHomework ? 'no' : 'have'
                }`}
                onClick={() => setShowHomework(!showHomework)}
              />
            </div>
          </div>
          <div className='informationclass__lesson__left__end'>
            <div className='informationclass__lesson-table-header'>
              <h1 className='text-lg'>Tên bài học</h1>
              <h1 className='text-lg'>Ngày tạo</h1>
            </div>
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <div className='end' key={lesson.id}>
                  <div className='lesson-item'>
                    <span className='text-2xl'>{index + 1}</span>
                    <div className='lesson-details'>
                      <p className='text-xl !text-[#000000] font-semibold'>
                        Bài {index + 1}: {lesson.title}
                      </p>
                    </div>
                    <div className='lesson-date' onClick={() => toggleLessonBox(lesson.id)}>
                      <p className='text-xl !text-[#000000] font-semibold'>
                        {formatDateTime(lesson.createdAt)}
                      </p>
                      <i
                        className={`fa-solid ${
                          expandedLessons[lesson.id] ? 'fa-caret-up' : 'fa-caret-down'
                        }`}></i>
                    </div>
                  </div>
                  <div
                    className='lesson-box text-xl'
                    style={{ display: expandedLessons[lesson.id] ? 'block' : 'none' }}>
                    <p onClick={() => navigate(`/my-classes/${classId}/lessons/${lesson.id}`)}>
                      Đề cương bài học
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                Không có bài học nào trong lớp này.
              </div>
            )}
          </div>
        </div>
        {showHomework && (
          <div className='informationclass__lesson__right'>
            <h3>Bài Tập ({posts.length})</h3>
            <div className='scroll'>
              {posts.length > 0 ? (
                posts.map((post) => {
                  const status = getPostStatus(post.deadline)
                  return (
                    <div
                      className='right'
                      key={post.id}
                      onClick={() => navigate(`/my-classes/${classId}/exams/${post.id}`)}>
                      <div className='right__tap'>
                        <div className='right__tap__tinhtrang'>
                          <span className={`ngay ${status.backgroundClass}`}>
                            {formatDateForBox(post.deadline)}
                          </span>
                          <div className={`${status.colorClass}`}>
                            <h4>{status.text}</h4>
                          </div>
                        </div>
                        <div className='right__tap__noidung'>
                          <div
                            className={`right__tap__noidung__colum ${status.backgroundClass}`}></div>
                          <div className='right__tap__noidung__contextclass'>
                            <h4>{classroom.name}</h4>
                            <div className='contextclass'>
                              <span>Tên bài tập: </span>
                              <p>{post.title}</p>
                            </div>
                            <div className='contextclass'>
                              <span>Người giao bài: </span>
                              <p>{post.creatorName}</p>
                            </div>
                            <div className='contextclass'>
                              <span>Thời gian giao: </span>
                              <p>{formatDate(post.createdAt)}</p>
                            </div>
                            <div className='contextclass'>
                              <span>Hạn nộp: </span>
                              <p>{formatDate(post.deadline)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem' }}>Chưa có bài tập nào.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeInformation
