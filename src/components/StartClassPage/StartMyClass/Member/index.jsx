// import React, { useState, useEffect, useRef, useContext } from 'react'
// import { Outlet } from 'react-router-dom'
// import { Route, Routes, Link } from 'react-router-dom'
// import { Icon } from '@iconify/react'
// import { getMembersInClassroom } from '../../../../apis/classroom.api'

// import './style.scss'
// const list = [
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
//   {
//     id: 1,
//     name: 'nguyen van A',
//     class: '2023DAPT01',
//     time: '30/06/2025',
//   },
// ]
// const Member = () => {
//   return (
//     <div className='member-contain'>
//       <div className='member-contain__title'>
//         <div className='member-contain__title__muc'>
//           <h2>PRIVATE: Đồ họa - 2025</h2>
//           <h3>Danh sách thành viên</h3>
//           <p>Số lượng thanh viên: {list.length}</p>
//         </div>
//         <div className='member-contain__title__icon'>
//           <h3>Nhóm chat</h3>
//           <div className='icon'></div>
//         </div>
//       </div>
//       <div className='member-contain__table'>
//         <div className='member-contain__table__begin'>
//           <span>Tên thành viên</span>
//           <span>Lớp hành chính </span>
//           <span>Ngày vào lớp </span>
//         </div>
//         <div className='member-contain__table__end'>
//           {list.map((item, index) => (
//             <div className='end' key={index}>
//               <div className='end__id'>
//                 <span>{item.id}</span>
//                 <p>{item.name}</p>
//               </div>
//               <span>{item.class}</span>
//               <div className='end__time'>
//                 <span>{item.time}</span>
//                 <div className='end__time__eclip'></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Member

// import React, { useState, useEffect, useCallback } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getClassroomById } from '../../../../apis/classroom.api'
// // --- Core Tools from our Architecture ---
// import { getMembersInClassroom } from '../../../../apis/classroom.api'
// import { formatDate } from '../../../../utils/formatters'

// // --- Styles ---
// import './style.scss' // Assuming the stylesheet is in the same folder

// const AdminClassMembersPage = () => {
//   const navigate = useNavigate()
//   const { classId } = useParams() // Get the classroom ID from the URL

//   // --- State Management ---
//   const [members, setMembers] = useState([])
//   const [pagination, setPagination] = useState({ totalElements: 0 })
//   const [loading, setLoading] = useState(true)

//   // You would also fetch classroom details to get the name, but we'll use a placeholder for now.
//   const [classroomName, setClassroomName] = useState('Đang tải...')

//   // --- Data Fetching ---
//   const fetchMembers = useCallback(async () => {
//     if (!classId) {
//       toast.error('Không tìm thấy ID lớp học.')
//       navigate('/admin/manage') // Redirect if no ID is present
//       return
//     }

//     try {
//       setLoading(true)
//       const params = { pageNum: 1, pageSize: 100 } // Fetch a large number of members
//       const response = await getMembersInClassroom(classId, params)
//       const content = response.data

//       if (content && content.items) {
//         setMembers(content.items)
//       }
//       if (content && content.meta) {
//         setPagination({ totalElements: content.meta.totalElements })
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message)
//       } else {
//         toast.error('Có lỗi xảy ra khi tải danh sách thành viên.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }, [classId, navigate])

//   useEffect(() => {
//     fetchMembers()
//     // In a real app, you'd also fetch the classroom details here to set the name
//   }, [fetchMembers])

//   return (
//     <div className='member-contain'>
//       <div className='member-contain__title'>
//         <div className='member-contain__title__muc'>
//           <h2>{classroomName}</h2>
//           <h3>Danh sách thành viên</h3>
//           <p>Số lượng thành viên: {loading ? '...' : pagination.totalElements}</p>
//         </div>
//         <div className='member-contain__title__icon'>
//           <h3>Nhóm chat</h3>
//           <div className='icon'></div>
//         </div>
//       </div>
//       <div className='member-contain__table'>
//         <div className='member-contain__table__begin'>
//           <span>Tên thành viên</span>
//           <span>Khóa</span>
//           <span>Ngày vào lớp</span>
//         </div>
//         <div className='member-contain__table__end'>
//           {loading && <div style={{ textAlign: 'center', padding: '1rem' }}>Đang tải...</div>}

//           {!loading &&
//             members.map((item, index) => (
//               <div className='end' key={item.id}>
//                 <div className='end__id'>
//                   {/* Your mock data had a number, we can use the index */}
//                   <span>{index + 1}</span>
//                   {/* The API returns `fullName` */}
//                   <p>{item.fullName}</p>
//                 </div>
//                 {/* The API returns `intake` */}
//                 <span>{item.intake}</span>
//                 <div className='end__time'>
//                   {/* The API doesn't provide a join date, using `lastLogin` as a placeholder */}
//                   <span>{formatDate(item.lastLogin) || 'Chưa đăng nhập'}</span>
//                   <div className='end__time__eclip'>
//                     {item.imageUrl && <img src={item.imageUrl} alt={`${item.fullName}'s avatar`} />}
//                   </div>
//                 </div>
//               </div>
//             ))}

//           {!loading && members.length === 0 && (
//             <div style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
//               Lớp học này chưa có thành viên.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminClassMembersPage

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getClassroomById, getMembersInClassroom } from '../../../../apis/classroom.api'
import { formatDate } from '../../../../utils/formatters'
import './style.scss'

const AdminClassMembersPage = ({ setOpenChat }) => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [members, setMembers] = useState([])
  const [classroom, setClassroom] = useState(null)
  const [pagination, setPagination] = useState({ totalElements: 0 })
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    if (!classId) {
      toast.error('Không tìm thấy ID lớp học.')
      navigate('/admin/manage')
      return
    }

    try {
      setLoading(true)

      const memberParams = { pageNum: 1, pageSize: 100 }

      // Fetch classroom details and member list concurrently
      const [classroomResponse, membersResponse] = await Promise.all([
        getClassroomById(classId),
        getMembersInClassroom(classId, memberParams),
      ])

      const classroomData = classroomResponse.data
      const membersContent = membersResponse.data

      if (classroomData) {
        setClassroom(classroomData)
      }

      if (membersContent && membersContent.items) {
        setMembers(membersContent.items)
      }
      if (membersContent && membersContent.meta) {
        setPagination({ totalElements: membersContent.meta.totalElements })
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải dữ liệu lớp học.')
      }
    } finally {
      setLoading(false)
    }
  }, [classId, navigate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className='member-contain'>
      <div className='member-contain__title'>
        <div className='member-contain__title__muc'>
          <h1>{loading ? 'Đang tải...' : classroom?.name || 'Không có tên'}</h1>
          <div className='member-contain__title__muc__title'>
            <i className='fa-solid fa-arrow-left' onClick={() => setOpenChat(false)}></i>
            <h2>Danh sách thành viên</h2>
          </div>

          <p>Số lượng thành viên: {loading ? '...' : pagination.totalElements}</p>
        </div>
        <div className='member-contain__title__icon'>
          <h3>Nhóm chat</h3>
          <div className='icon'></div>
        </div>
      </div>
      <div className='member-contain__table'>
        <div className='member-contain__table__begin'>
          <span>Tên thành viên</span>
          <span>Khóa</span>
          <span>Ngày vào lớp</span>
        </div>
        <div className='member-contain__table__end'>
          {loading && <div style={{ textAlign: 'center', padding: '1rem' }}>Đang tải...</div>}

          {!loading &&
            members.map((item, index) => (
              <div className='end' key={item.id}>
                <div className='end__id'>
                  <span>{index + 1}</span>
                  <p>{item.fullName}</p>
                </div>
                <span>{item.intake}</span>
                <div className='end__time'>
                  <span>{formatDate(item.createdAt)}</span> {/* Using createdAt for join date */}
                  <div className='end__time__eclip'>
                    {item.imageUrl && <img src={item.imageUrl} alt={`${item.fullName}'s avatar`} />}
                  </div>
                </div>
              </div>
            ))}

          {!loading && members.length === 0 && (
            <div style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
              Lớp học này chưa có thành viên.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminClassMembersPage
