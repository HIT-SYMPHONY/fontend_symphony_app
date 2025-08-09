import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

import { getClassroomById } from '../../../../apis/classroom.api'
import { getLessonsByClassroomId } from '../../../../apis/lesson.api.js'
import { getPostsByClassroomId } from '../../../../apis/post.api.js'
import {
  formatDate,
  formatDateTime,
  translateStatus,
  getPostStatus,
} from '../../../../utils/formatters'

import './style.scss'

const HomeInformation = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [classroom, setClassroom] = useState(null)
  const [lessons, setLessons] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showHomework, setShowHomework] = useState(false)
  const [expandedLessons, setExpandedLessons] = useState({})

  const fetchClassroomData = useCallback(async () => {
    if (!classId) {
      toast.error('Không tìm thấy ID lớp học.')
      navigate(-1)
      return
    }

    const loadingToast = toast.loading('Đang tải thông tin lớp học...')
    try {
      setLoading(true)
      const [classroomResponse, lessonsResponse, postsResponse] = await Promise.all([
        getClassroomById(classId),
        getLessonsByClassroomId(classId),
        getPostsByClassroomId(classId, { pageNum: 1, pageSize: 100 }),
      ])

      setClassroom(classroomResponse.data)
      setLessons(lessonsResponse.data || [])
      setPosts(postsResponse.data?.items || [])
      toast.dismiss(loadingToast)
    } catch (error) {
      toast.dismiss(loadingToast)
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải thông tin lớp học.')
      }
      navigate(-1)
    } finally {
      setLoading(false)
    }
  }, [classId, navigate])

  useEffect(() => {
    fetchClassroomData()
  }, [fetchClassroomData])

  const toggleLessonBox = (lessonId) => {
    setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải...</div>
  if (!classroom)
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>Không tìm thấy dữ liệu lớp học.</div>
    )

  return (
    <div className='informationclass'>
      <div className='informationclass__gioithieu'>
        <div className='informationclass__gioithieu__context'>
          <div className='informationclass__gioithieu__context__name'>
            <h1>{classroom.name}</h1>
            <span>{translateStatus(classroom.status)}</span>
          </div>
          <div className='informationclass__gioithieu__context__error'>
            <Icon icon='streamline-plump:information-circle-solid' width='26' height='26' />
            <h4>Thông tin lớp học</h4>
          </div>
          <div className='informationclass__gioithieu__context__noidung'>
            <strong>Mô tả: </strong>
            <p>{classroom.description || 'Chưa có mô tả.'}</p>
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
        {/* --- FIX #1: Removed the "Chat room" icon and its container --- */}
        <div className='informationclass__gioithieu__image'>
          {/* The image div is preserved for layout, but the chat icon is gone */}
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
              <div className='informationclass__lesson__left__begin__pair__tap'>
                <button>Sắp xếp theo</button>
              </div>
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
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <div className='end' key={lesson.id}>
                  <div className='lesson-item'>
                    <span>{index + 1}</span>
                    <div className='lesson-details'>
                      <p>
                        Bài {index + 1}: {lesson.title}
                      </p>
                    </div>
                    <div className='lesson-date' onClick={() => toggleLessonBox(lesson.id)}>
                      <p>{formatDate(lesson.createdAt)}</p>
                      <i
                        className={`fa-solid ${
                          expandedLessons[lesson.id] ? 'fa-caret-down' : 'fa-caret-up'
                        }`}></i>
                    </div>
                  </div>
                  <div
                    className='lesson-box'
                    style={{ display: expandedLessons[lesson.id] ? 'block' : 'none' }}>
                    <p onClick={() => navigate(`/my-classes/${classId}/lessons/${lesson.id}`)}>
                      Đề cương bài học
                    </p>
                    {/* --- FIX #2: Removed the static "Bài Tập" link --- */}
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
                    // --- FIX #3: Added the correct onClick handler to the post card ---
                    <div
                      className='right'
                      key={post.id}
                      onClick={() => navigate(`/my-classes/${classId}/exams/${post.id}`)}>
                      <div className='right__tap'>
                        <div className='right__tap__tinhtrang'>
                          <span className={`ngay back-one`}>{formatDateTime(post.deadline)}</span>
                          <div className={`color-one`}>
                            <h4>{status.text}</h4>
                            <p>Tình trạng: {status.text}</p>
                          </div>
                        </div>
                        <div className='right__tap__noidung'>
                          <div className={`right__tap__noidung__colum back-one`}></div>
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
                              <p>{formatDateTime(post.createdAt)}</p>
                            </div>
                            <div className='contextclass'>
                              <span>Hạn nộp: </span>
                              <p>{formatDateTime(post.deadline)}</p>
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
