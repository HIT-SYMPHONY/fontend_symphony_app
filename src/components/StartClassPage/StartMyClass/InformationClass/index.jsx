// import React, { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Icon } from '@iconify/react'
// import { work } from '../../../../data/app'
// import icon from './../../../../assets/img/Ellipse.png'
// import logo from './../../../../assets/img/logo.png'
// import Member from '../Member'
// import Exam from '../Exam'
// import Frame from '../Frame'
// import './style.scss'
// import { getClassroomById } from '../../../../apis/classroom.api'
// import Logout from '../../../Logout'

// const HomeInformation = () => {
//   const [open, setOpen] = useState(false)
//   const navigate = useNavigate()
//   const today = new Date()
//   const day = String(today.getDate()).padStart(2, '0')
//   const month = String(today.getMonth() + 1).padStart(2, '0')
//   const formattedDate = `${day}/${month}`
//   const lop = [1, 2, 3, 4, 5, 6, 7]

//   const [hwork, setHWork] = useState(false)
//   const [expandedItems, setExpandedItems] = useState({})
//   const toggleLessonBox = (index) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }))
//   }
//   return (
//     <>
//       {open ? (
//         <Member />
//       ) : (
//         <div className='informationclass'>
//           <div className='informationclass__gioithieu'>
//             <div className='informationclass__gioithieu__context'>
//               <div className='informationclass__gioithieu__context__name'>
//                 <h1>PRIVATE: Đồ họa - 2025</h1>
//                 <span>ĐANG HỌC</span>
//               </div>
//               <div className='informationclass__gioithieu__context__error'>
//                 <Icon icon='streamline-plump:information-circle-solid' width='26' height='26' />
//                 <h4>Thông tin lớp học</h4>
//               </div>
//               <div className='informationclass__gioithieu__context__noidung'>
//                 <strong>Mô tả: </strong>
//                 <p>
//                   dfjagoigjojawjefkmasdlfnoadsijfdpofjkfgsiogjosjgosigosdgsijgogjsoidgẹhigaeojpoatpigogjrijgoonafoweigaogego
//                 </p>
//                 <div className='informationclass__gioithieu__context__noidung__row'>
//                   <strong>Leader: ljknyfytfyihoijpy</strong>
//                   <strong>Lịch học: 18h - 20h Thứ 4 hàng tuần</strong>
//                 </div>
//                 <div className='informationclass__gioithieu__context__noidung__row'>
//                   <strong>Ngày bắt đầu: 12/01/2025</strong>
//                   <strong>Độ dài lớp học: 8 buổi</strong>
//                 </div>
//               </div>
//             </div>
//             <div className='informationclass__gioithieu__image'>
//               <div className='image'>
//                 <Icon
//                   icon='streamline-flex:mail-send-email-message-circle-solid'
//                   width='24'
//                   height='24'
//                   className='image__icon'
//                   onClick={() => setOpen(true)}
//                 />
//                 <span>Chat room</span>
//               </div>
//             </div>
//           </div>
//           <div className='informationclass__lesson'>
//             <div className={`informationclass__lesson__left ${hwork ? 'all' : ''}`}>
//               <div className='informationclass__lesson__left__begin'>
//                 <div className='informationclass__lesson__left__begin__icon'>
//                   <div className='informationclass__lesson__left__begin__book'>
//                     <Icon icon='material-symbols:book-2-rounded' width='26' height='26' />
//                     <p>Bài Học</p>
//                   </div>
//                 </div>
//                 <div className='informationclass__lesson__left__begin__pair'>
//                   <div className='informationclass__lesson__left__begin__pair__tap'>
//                     <button>Sắp xếp theo</button>
//                   </div>
//                   <Icon
//                     icon='material-symbols:menu-book-rounded'
//                     width='26'
//                     height='26'
//                     className={`informationclass__lesson__left__begin__pair__${
//                       hwork ? 'no' : 'have'
//                     }`}
//                     onClick={() => setHWork(!hwork)}
//                   />
//                 </div>
//               </div>
//               <div className='informationclass__lesson__left__end'>
//                 {lop && Array.isArray(lop) ? (
//                   lop.map((_, index) => (
//                     <div className='end' key={index}>
//                       <div className='lesson-item'>
//                         <span>{index + 1}</span>
//                         <div className='lesson-details'>
//                           <p>
//                             Bài {index + 1}:{' '}
//                             {index % 2 != 0
//                               ? 'Làm quen với phần mềm Adobe Photoshopvà Adobe Illustrator'
//                               : 'Kiểm tra'}
//                           </p>
//                         </div>
//                         <div className='lesson-date' onClick={() => toggleLessonBox(index)}>
//                           <p>30/06/2025</p>
//                           <i
//                             className={`fa-solid ${
//                               expandedItems[index] ? 'fa-caret-down' : 'fa-caret-up'
//                             }`}></i>
//                         </div>
//                       </div>
//                       <div
//                         className='lesson-box'
//                         style={{
//                           display: expandedItems[index] ? 'block' : 'none',
//                         }}>
//                         {index % 2 !== 0 ? (
//                           <>
//                             <p onClick={() => navigate('/information/lesson')}>Đề cương bài học</p>
//                             <p>Tài liệu tham khảo</p>
//                           </>
//                         ) : (
//                           <p onClick={() => navigate('/information/exam')}>Bài kiểm tra</p>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div>Không có dữ liệu bài học!</div>
//                 )}
//               </div>
//             </div>
//             {hwork && (
//               <div className='informationclass__lesson__right'>
//                 <h3>Bài Tập</h3>
//                 <div className='scroll'>
//                   {work && Array.isArray(work) ? (
//                     work.map((item, index) => (
//                       <div className='right' key={index}>
//                         <div className='right__tap'>
//                           <div className='right__tap__tinhtrang'>
//                             <span
//                               className={
//                                 item.style === 1
//                                   ? 'ngay back-one'
//                                   : item.style === 2
//                                   ? 'ngay back-two'
//                                   : 'ngay back-three'
//                               }>
//                               {formattedDate}
//                             </span>
//                             <div
//                               className={
//                                 item.style === 1
//                                   ? 'color-one'
//                                   : item.style === 2
//                                   ? 'color-two'
//                                   : 'color-three'
//                               }>
//                               <h4>{item.work}</h4>
//                               <p>Tình trạng: {item.hientrang}</p>
//                             </div>
//                           </div>
//                           <div className='right__tap__noidung'>
//                             <div
//                               className={
//                                 item.style === 1
//                                   ? 'right__tap__noidung__colum back-one'
//                                   : item.style === 2
//                                   ? 'right__tap__noidung__colum back-two'
//                                   : 'right__tap__noidung__colum back-three'
//                               }></div>
//                             <div className='right__tap__noidung__contextclass'>
//                               <h4>{item.classname}</h4>
//                               <div className='contextclass'>
//                                 <span>Tên bài tập: </span>
//                                 <p>{item.name}</p>
//                               </div>
//                               <div className='contextclass'>
//                                 <span>Người giao bài: </span>
//                                 <p>{item.teacher}</p>
//                               </div>
//                               <div className='contextclass'>
//                                 <span>Thời gian giao: </span>
//                                 <p>{item.start}</p>
//                               </div>
//                               <div className='contextclass'>
//                                 <span>Hạn nộp: </span>
//                                 <p>{item.begin}</p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div>Không có dữ liệu bài tập!</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default HomeInformation

// import React, { useState, useEffect, useCallback } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { Icon } from '@iconify/react'
// import toast from 'react-hot-toast'

// // --- Core Tools from our Architecture ---
// import { getClassroomById } from '../../../../apis/classroom.api'
// import { getLessonsByClassroomId } from '../../../../apis/lesson.api.js'
// import { getPostsByClassroomId } from '../../../../apis/post.api.js'
// import { formatDate, translateStatus } from '../../../../utils/formatters'
// import { getHomeworkStatus } from '../../../../utils/formatters'

// // --- UI Components ---
// import Member from '../Member'
// // --- Styles ---
// import './style.scss'

// const HomeInformation = () => {
//   const navigate = useNavigate()
//   const { classId } = useParams()

//   // --- State Management ---
//   const [classroom, setClassroom] = useState(null)
//   const [lessons, setLessons] = useState([])
//   const [posts, setPosts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [openChat, setOpenChat] = useState(false)
//   const [showHomework, setShowHomework] = useState(false)
//   const [expandedLessons, setExpandedLessons] = useState({})

//   // --- Data Fetching ---
//   const fetchClassroomData = useCallback(async () => {
//     if (!classId) {
//       toast.error('Không tìm thấy ID lớp học.')
//       navigate(-1) // Go back to the previous page
//       return
//     }

//     try {
//       setLoading(true)
//       const [classroomResponse, lessonsResponse, postsResponse] = await Promise.all([
//         getClassroomById(classId),
//         getLessonsByClassroomId(classId),
//         getPostsByClassroomId(classId, { pageNum: 1, pageSize: 100 }),
//       ])

//       setClassroom(classroomResponse.data)
//       setLessons(lessonsResponse.data || [])
//       setPosts(postsResponse.data?.items || [])
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message)
//       } else {
//         toast.error('Có lỗi xảy ra khi tải thông tin lớp học.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }, [classId, navigate])

//   useEffect(() => {
//     fetchClassroomData()
//   }, [fetchClassroomData])

//   const toggleLessonBox = (lessonId) => {
//     setExpandedLessons((prev) => ({
//       ...prev,
//       [lessonId]: !prev[lessonId],
//     }))
//   }

//   if (loading) {
//     return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải thông tin lớp học...</div>
//   }

//   if (!classroom) {
//     return (
//       <div style={{ padding: '2rem', textAlign: 'center' }}>Không tìm thấy dữ liệu lớp học.</div>
//     )
//   }

//   return (
//     <>
//       {openChat ? (
//         <Member />
//       ) : (
//         <div className='informationclass'>
//           <div className='informationclass__gioithieu'>
//             <div className='informationclass__gioithieu__context'>
//               <div className='informationclass__gioithieu__context__name'>
//                 <h1>{classroom.name}</h1>
//                 <span>{translateStatus(classroom.status)}</span>
//               </div>
//               <div className='informationclass__gioithieu__context__error'>
//                 <Icon icon='streamline-plump:information-circle-solid' width='26' height='26' />
//                 <h4>Thông tin lớp học</h4>
//               </div>
//               <div className='informationclass__gioithieu__context__noidung'>
//                 <strong>Mô tả: </strong>
//                 <p>{classroom.description || 'Chưa có mô tả.'}</p>
//                 <div className='informationclass__gioithieu__context__noidung__row'>
//                   <strong>Leader: {classroom.leaderName}</strong>
//                   <strong>Lịch học: {lessons[0]?.timeSlot || 'Chưa cập nhật'}</strong>
//                 </div>
//                 <div className='informationclass__gioithieu__context__noidung__row'>
//                   <strong>Ngày bắt đầu: {formatDate(classroom.startTime)}</strong>
//                   <strong>Độ dài lớp học: {classroom.duration} tuần</strong>
//                 </div>
//               </div>
//             </div>
//             <div className='informationclass__gioithieu__image'>
//               <div className='image'>
//                 <Icon
//                   icon='streamline-flex:mail-send-email-message-circle-solid'
//                   width='24'
//                   height='24'
//                   className='image__icon'
//                   onClick={() => setOpenChat(true)}
//                 />
//                 <span>Chat room</span>
//               </div>
//             </div>
//           </div>
//           <div className='informationclass__lesson'>
//             <div className={`informationclass__lesson__left ${showHomework ? 'all' : ''}`}>
//               <div className='informationclass__lesson__left__begin'>
//                 <div className='informationclass__lesson__left__begin__icon'>
//                   <div className='informationclass__lesson__left__begin__book'>
//                     <Icon icon='material-symbols:book-2-rounded' width='26' height='26' />
//                     <p>Bài Học ({lessons.length})</p>
//                   </div>
//                 </div>
//                 <div className='informationclass__lesson__left__begin__pair'>
//                   <div className='informationclass__lesson__left__begin__pair__tap'>
//                     <button>Sắp xếp theo</button>
//                   </div>
//                   <Icon
//                     icon='material-symbols:menu-book-rounded'
//                     width='26'
//                     height='26'
//                     className={`informationclass__lesson__left__begin__pair__${
//                       showHomework ? 'no' : 'have'
//                     }`}
//                     onClick={() => setShowHomework(!showHomework)}
//                   />
//                 </div>
//               </div>
//               <div className='informationclass__lesson__left__end'>
//                 {lessons.length > 0 ? (
//                   lessons.map((lesson, index) => (
//                     <div className='end' key={lesson.id}>
//                       <div className='lesson-item'>
//                         <span>{index + 1}</span>
//                         <div className='lesson-details'>
//                           <p>
//                             Bài {index + 1}: {lesson.content}
//                           </p>
//                         </div>
//                         <div className='lesson-date' onClick={() => toggleLessonBox(lesson.id)}>
//                           <p>{formatDate(lesson.createdAt)}</p>
//                           <i
//                             className={`fa-solid ${
//                               expandedLessons[lesson.id] ? 'fa-caret-down' : 'fa-caret-up'
//                             }`}></i>
//                         </div>
//                       </div>
//                       <div
//                         className='lesson-box'
//                         style={{ display: expandedLessons[lesson.id] ? 'block' : 'none' }}>
//                         <p onClick={() => navigate(`lessons/${lesson.id}`)}>Đề cương bài học</p>
//                         <p>Bài Tập</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div style={{ textAlign: 'center', padding: '1rem' }}>
//                     Không có bài học nào trong lớp này.
//                   </div>
//                 )}
//               </div>
//             </div>
//             {showHomework && (
//               <div className='informationclass__lesson__right'>
//                 <h3>Bài Tập ({posts.length})</h3>
//                 <div className='scroll'>
//                   {posts.length > 0 ? (
//                     posts.map((post) => {
//                       const status = getHomeworkStatus(post.deadline)
//                       return (
//                         <div className='right' key={post.id}>
//                           <div className='right__tap'>
//                             <div className='right__tap__tinhtrang'>
//                               <span
//                                 className={
//                                   status.style === 1
//                                     ? 'ngay back-one'
//                                     : status.style === 2
//                                     ? 'ngay back-two'
//                                     : 'ngay back-three'
//                                 }>
//                                 {formatDate(post.deadline)}
//                               </span>
//                               <div
//                                 className={
//                                   status.style === 1
//                                     ? 'color-one'
//                                     : status.style === 2
//                                     ? 'color-two'
//                                     : 'color-three'
//                                 }>
//                                 <h4>{status.text}</h4>
//                                 <p>Tình trạng: {status.text}</p>
//                               </div>
//                             </div>
//                             <div className='right__tap__noidung'>
//                               <div
//                                 className={
//                                   status.style === 1
//                                     ? 'right__tap__noidung__colum back-one'
//                                     : status.style === 2
//                                     ? 'right__tap__noidung__colum back-two'
//                                     : 'right__tap__noidung__colum back-three'
//                                 }></div>
//                               <div className='right__tap__noidung__contextclass'>
//                                 <h4>{classroom.name}</h4>
//                                 <div className='contextclass'>
//                                   <span>Tên bài tập: </span>
//                                   <p>{post.title}</p>
//                                 </div>
//                                 <div className='contextclass'>
//                                   <span>Người giao bài: </span>
//                                   <p>{post.createdBy}</p>
//                                 </div>
//                                 <div className='contextclass'>
//                                   <span>Thời gian giao: </span>
//                                   <p>{formatDate(post.createdAt)}</p>
//                                 </div>
//                                 <div className='contextclass'>
//                                   <span>Hạn nộp: </span>
//                                   <p>{formatDate(post.deadline)}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )
//                     })
//                   ) : (
//                     <div style={{ textAlign: 'center', padding: '1rem' }}>Chưa có bài tập nào.</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   )
// }

// export default HomeInformation

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

import { getClassroomById } from '../../../../apis/classroom.api'
import { getLessonsByClassroomId } from '../../../../apis/lesson.api.js'
import { formatDate, translateStatus } from '../../../../utils/formatters'
import { getPostsByClassroomId } from '../../../../apis/post.api.js'

import Member from '../Member'
import './style.scss'

const getHomeworkStatus = (deadline) => {
  const now = new Date()
  const deadlineDate = new Date(deadline)
  if (deadlineDate < now) return { text: 'Đã hết hạn', style: 3 }
  return { text: 'Chưa hoàn thành', style: 1 }
}

const HomeInformation = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  // --- State Management ---
  const [classroom, setClassroom] = useState(null)
  const [lessons, setLessons] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [openChat, setOpenChat] = useState(false)
  const [showHomework, setShowHomework] = useState(false)
  const [expandedLessons, setExpandedLessons] = useState({})

  // --- Data Fetching ---
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

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải...</div>
  }

  if (!classroom) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>Không tìm thấy dữ liệu lớp học.</div>
    )
  }

  return (
    <>
      {openChat ? (
        <Member setOpenChat={setOpenChat} />
      ) : (
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
                  <strong>Lịch học: {classroom.timeSlot || 'Chưa cập nhật'}</strong>
                </div>
                <div className='informationclass__gioithieu__context__noidung__row'>
                  <strong>Ngày bắt đầu: {formatDate(classroom.startTime)}</strong>
                  <strong>Độ dài lớp học: {classroom.duration} tuần</strong>
                </div>
              </div>
            </div>
            <div className='informationclass__gioithieu__image'>
              <div className='image'>
                <Icon
                  icon='streamline-flex:mail-send-email-message-circle-solid'
                  width='24'
                  height='24'
                  className='image__icon'
                  onClick={() => setOpenChat(true)}
                />
                <span>Chat room</span>
              </div>
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
                        <p onClick={() => navigate(`lessons/${lesson.id}`)}>Đề cương bài học</p>
                        <p onClick={() => navigate('exams/examId')}>Bài Tập</p>
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
                      const status = getHomeworkStatus(post.deadline)
                      return (
                        <div className='right' key={post.id}>
                          <div className='right__tap'>
                            <div className='right__tap__tinhtrang'>
                              <span
                                className={
                                  status.style === 1
                                    ? 'ngay back-one'
                                    : status.style === 2
                                    ? 'ngay back-two'
                                    : 'ngay back-three'
                                }>
                                {formatDate(post.deadline)}
                              </span>
                              <div
                                className={
                                  status.style === 1
                                    ? 'color-one'
                                    : status.style === 2
                                    ? 'color-two'
                                    : 'color-three'
                                }>
                                <h4>{status.text}</h4>
                                <p>Tình trạng: {status.text}</p>
                              </div>
                            </div>
                            <div className='right__tap__noidung'>
                              <div
                                className={
                                  status.style === 1
                                    ? 'right__tap__noidung__colum back-one'
                                    : status.style === 2
                                    ? 'right__tap__noidung__colum back-two'
                                    : 'right__tap__noidung__colum back-three'
                                }></div>
                              <div className='right__tap__noidung__contextclass'>
                                <h4>{classroom.name}</h4>
                                <div className='contextclass'>
                                  <span>Tên bài tập: </span>
                                  <p>{post.title}</p>
                                </div>
                                <div className='contextclass'>
                                  <span>Người giao bài: </span>
                                  <p>{post.createdBy}</p>
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
      )}
    </>
  )
}

export default HomeInformation
