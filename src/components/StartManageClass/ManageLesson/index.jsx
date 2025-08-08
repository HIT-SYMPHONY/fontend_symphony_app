// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import { Outlet } from "react-router-dom";
// import "./style.scss";

// const ManageLesson = () => {
//   const [expandedItems, setExpandedItems] = useState({});

//   const member = [
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },

//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },

//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },

//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },

//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//     {
//       id: 1,
//       name: "Buổi 1: Làm quen với phần mềm Adobe Photoshop và Adobe Illustration",
//       time: "30/06/2025",
//       class: "Đề cương bài học",
//     },
//   ];

//   const toggleExpand = (index) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   return (
//     <>
//       <h3>Tất cả bài học</h3>
//       <div className="managelesson">
//         <div className="managelesson__title">
//           <h4>Tên bài học</h4>
//           <h4>Ngày tạo</h4>
//         </div>
//         <div className="managelesson__table">
//           {member.map((item, index) => (
//             <div key={index}>
//               <div className="managelesson__table__box">
//                 <div className="managelesson__table__box__start">
//                   <h5 className="managelesson__table__box__start__h5">
//                     {item.id}
//                   </h5>
//                   <h5>{item.name}</h5>
//                 </div>
//                 <h5>{item.time}</h5>
//                 <i
//                   className={
//                     expandedItems[index]
//                       ? "fa-solid fa-chevron-up"
//                       : "fa-solid fa-chevron-down"
//                   }
//                   onClick={() => toggleExpand(index)}
//                 ></i>
//               </div>
//               {expandedItems[index] && (
//                 <div className="managelesson__table__item">
//                   <span>{item.class}</span>
//                   <span>{item.time}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageLesson;

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getLessonsByClassroomId } from '../../../apis/lesson.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'

const ManageLesson = () => {
  const navigate = useNavigate()
  // Get the classroom ID from the URL, e.g., /admin/manage/lessons/:classId
  const { classId } = useParams()

  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState({})

  useEffect(() => {
    if (!classId) {
      toast.error('Lỗi: Không tìm thấy ID của lớp học trong URL.')
      return
    }
    const fetchLessons = async () => {
      try {
        setLoading(true)
        const response = await getLessonsByClassroomId(classId)
        // The API returns the array directly in the `data` property
        setLessons(response.data || [])
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Có lỗi xảy ra khi tải danh sách bài học.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [classId]) // Re-fetch whenever the classId from the URL changes

  const toggleExpand = (lessonId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }))
  }

  if (loading) {
    return <div>Đang tải danh sách bài học...</div>
  }

  return (
    <>
      <h3>Tất cả bài học ({lessons.length})</h3>
      <div className='managelesson'>
        <div className='managelesson__title'>
          <h4>Tên bài học</h4>
          <h4>Ngày tạo</h4>
        </div>
        <div className='managelesson__table'>
          {lessons.length > 0 ? (
            lessons.map((item, index) => (
              <div key={item.id}>
                <div className='managelesson__table__box'>
                  <div className='managelesson__table__box__start'>
                    <h5 className='managelesson__table__box__start__h5'>{index + 1}</h5>
                    {/* Assuming the API provides a 'title' or 'content' field for the lesson name */}
                    <h5>{item.title || item.content}</h5>
                  </div>
                  <h5>{formatDate(item.createdAt)}</h5>
                  <i
                    className={
                      expandedItems[item.id] ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'
                    }
                    onClick={() => toggleExpand(item.id)}></i>
                </div>
                {expandedItems[item.id] && (
                  <div
                    className='managelesson__table__item'
                    onClick={() => navigate(`/manage/classes/${classId}/lessons/${item.id}`)}>
                    {/* Display more details here, e.g., location, timeSlot */}
                    <span>Topic: {item.title}</span>
                    <span>Thời gian: {item.createdAt}</span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', padding: '1rem' }}>Chưa có bài học nào cho lớp này.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageLesson
