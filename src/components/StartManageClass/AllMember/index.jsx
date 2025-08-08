// import React, { useState, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { GlobalContext } from '../../../dataContext'
// import icon from './../../../assets/img/Ellipse.png'
// import { Outlet } from 'react-router-dom'
// import logo from './../../../assets/img/logo.png'
// import Logout from '../../Logout'
// import './style.scss'

// const AllMember = () => {
//   const member = [
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//     {
//       id: 1,
//       name: 'Nguyễn Văn A',
//       class: '2023DAPT01',
//       time: '30/06/2025',
//     },
//   ]
//   return (
//     <>
//       <h3>Danh sách thành viên </h3>
//       <div className='soluong'>
//         <h4>Số lượng thành viên: </h4>
//         <span>{member.length}</span>
//       </div>
//       <div className='tablemember'>
//         <div className='tablemember__title'>
//           <h5>Tên thành viên </h5>
//           <h5>Lớp hành chính </h5>
//           <h5>Ngày vào lớp </h5>
//         </div>
//         <div className='tablemember__table'>
//           {member.map((item, index) => (
//             <div className='tablemember__table__item' key={index}>
//               <h5 className='tablemember__table__item__h5'>{item.id}</h5>
//               <h5>{item.name}</h5>
//               <h5>{item.class}</h5>
//               <h5>{item.time}</h5>
//               <span className='tablemember__table__item__span'></span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default AllMember

import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // 1. Import useParams
import toast from 'react-hot-toast'
import { getClassroomMembers } from '../../../apis/classroom.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'

// The component no longer accepts props.
const AllMember = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [members, setMembers] = useState([])
  const [pagination, setPagination] = useState({ pageNum: 1, totalElements: 0 })
  const [loading, setLoading] = useState(true)

  const fetchMembers = useCallback(
    async (page = 1) => {
      if (!classId) {
        toast.error('Lỗi: Không tìm thấy ID của lớp học trong URL.')
        return
      }
      try {
        setLoading(true)
        const params = { pageNum: page, pageSize: 10 }
        const response = await getClassroomMembers(classId, params)
        const content = response.data

        if (content && content.items) {
          setMembers(content.items)
        }
        if (content && content.meta) {
          setPagination((prev) => ({ ...prev, totalElements: content.meta.totalElements }))
        }
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Có lỗi xảy ra khi tải danh sách thành viên.')
        }
      } finally {
        setLoading(false)
      }
    },
    [classId],
  ) // The function now depends on classId

  useEffect(() => {
    fetchMembers(pagination.pageNum)
  }, [fetchMembers, pagination.pageNum])

  if (loading) {
    return <div>Đang tải danh sách thành viên...</div>
  }

  return (
    <>
      <h3>Danh sách thành viên</h3>
      <div className='soluong'>
        <h4>Số lượng thành viên: </h4>
        <span>{pagination.totalElements}</span>
      </div>
      <div className='tablemember'>
        <div className='tablemember__title'>
          <h5>Tên thành viên</h5>
          <h5>Lớp hành chính (Khóa)</h5>
          <h5>Ngày vào lớp (Last Login)</h5>
        </div>
        <div className='tablemember__table'>
          {members.map((item, index) => (
            <div className='tablemember__table__item' key={item.id}>
              <h5 className='tablemember__table__item__h5'>{index + 1}</h5>
              <h5>{item.fullName}</h5>
              <h5>{item.intake}</h5>
              <h5>{formatDate(item.lastLogin)}</h5>
              <span className='tablemember__table__item__span'></span>
            </div>
          ))}
          {members.length === 0 && (
            <p style={{ textAlign: 'center', padding: '1rem' }}>Lớp này chưa có thành viên.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default AllMember
