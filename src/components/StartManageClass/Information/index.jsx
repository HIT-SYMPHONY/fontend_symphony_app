// import React from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet, useParams, useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import useFetch from '../../../hooks/useFetch'
// import { ApiConstant } from '../../../constants/api.constant'
// import './style.scss'

// const InformationManage = () => {
//   const { classId } = useParams()
//   const navigate = useNavigate()

//   // 1. Fetch data for the specific classroom using its ID from the URL.
//   // The useFetch hook handles loading and error states for us.
//   const {
//     data: classroomResponse,
//     loading,
//     error,
//     refetch,
//   } = useFetch(`${ApiConstant.classrooms.getById}${classId}`)

//   // 2. Handle navigation when the user selects an option from the dropdown.
//   const handleNavigation = (e) => {
//     const path = e.target.value
//     if (path) {
//       // Navigate to the selected sub-page (relative to the current path).
//       navigate(path)
//     }
//   }

//   // 3. Render loading and error states while fetching data.
//   if (loading) {
//     return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải thông tin lớp học...</div>
//   }
//   if (error) {
//     toast.error('Không thể tải dữ liệu lớp học.')
//     return (
//       <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
//         Lỗi: Không thể tải dữ liệu lớp học.
//       </div>
//     )
//   }

//   // 4. Extract the actual classroom object from the API response.
//   const classroom = classroomResponse?.data

//   if (!classroom) {
//     return <div>Không tìm thấy thông tin cho lớp học này.</div>
//   }

//   return (
//     <div className='manage-infor'>
//       <div className='manage-infor__title'>
//         <Icon
//           icon='mdi:book-account'
//           width='30'
//           height='30'
//           className='manage-infor__title__icon'
//         />
//         {/* Display the dynamic classroom name */}
//         <h2>Quản lý lớp học: {classroom.name}</h2>
//       </div>

//       <div className='manage-infor__search'>
//         {/* Make the back button functional */}
//         <i className='fa-solid fa-arrow-left' onClick={() => navigate('/admin/manage')} />

//         {/* Wire up the dropdown to navigate between sub-pages */}
//         <select
//           className='manage-infor__search__select'
//           name='category'
//           onChange={handleNavigation}>
//           <option value=''>-- Danh mục --</option>
//           <option value=''>Thông tin lớp học</option>
//           <option value='notifications'>Thông báo</option>
//           <option value='lessons'>Bài học</option>
//           <option value='tests'>Kiểm Tra</option>
//           <option value='members'>Danh sách sinh viên</option>
//         </select>

//         <div className='manage-infor__search__container'>
//           <input
//             type='text'
//             placeholder='Nhập tìm kiếm...'
//             className='manage-infor__search__input'
//           />
//           <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
//         </div>

//         <button className='manage-infor__search__button'>+ Tạo mới</button>
//       </div>

//       <Outlet context={{ classroom, refetchClassroom: refetch }} />
//     </div>
//   )
// }

// export default InformationManage

import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { Outlet, useParams, useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { ApiConstant } from '../../../constants/api.constant'
import './style.scss'

const InformationManage = () => {
  const { classId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    data: classroomResponse,
    loading,
    error,
    refetch,
  } = useFetch(`${ApiConstant.classrooms.getById}${classId}`)

  useEffect(() => {
    if (error) {
      toast.error(error.response?.data?.message || 'Không thể tải dữ liệu lớp học.')
      navigate('/admin/manage')
    }
  }, [error, navigate])

  const getCurrentSection = () => {
    const path = location.pathname
    if (path.endsWith('/notifications')) return 'notifications'
    if (path.endsWith('/lessons')) return 'lessons'
    if (path.endsWith('/tests')) return 'tests'
    if (path.endsWith('/members')) return 'members'
    return ''
  }

  const handleNavigation = (e) => {
    const sectionPath = e.target.value
    const basePath = `/admin/manage/information/${classId}`
    navigate(sectionPath ? `${basePath}/${sectionPath}` : basePath)
  }

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Đang tải thông tin lớp học...</div>
  }

  if (error || !classroomResponse?.data) {
    return null
  }

  const classroom = classroomResponse.data

  return (
    <div className='manage-infor'>
      <div className='manage-infor__title'>
        <Icon
          icon='mdi:book-account'
          width='30'
          height='30'
          className='manage-infor__title__icon'
        />
        <h2>Quản lý lớp học: {classroom.name}</h2>
      </div>

      <div className='manage-infor__search'>
        <i className='fa-solid fa-arrow-left' onClick={() => navigate('/admin/manage')} />
        <select
          className='manage-infor__search__select'
          name='category'
          value={getCurrentSection()}
          onChange={handleNavigation}>
          <option value=''>Thông tin lớp học</option>
          <option value='notifications'>Thông báo</option>
          <option value='lessons'>Bài học</option>
          <option value='tests'>Kiểm Tra</option>
          <option value='members'>Danh sách sinh viên</option>
        </select>
        <div className='manage-infor__search__container'>
          <input
            type='text'
            placeholder='Nhập tìm kiếm...'
            className='manage-infor__search__input'
          />
          <i className='fa-solid fa-magnifying-glass manage-infor__search__icon' />
        </div>
        <button className='manage-infor__search__button'>+ Tạo mới</button>
      </div>

      <Outlet context={{ classroom, refetchClassroom: refetch }} />
    </div>
  )
}

export function useClassroomContext() {
  return useOutletContext()
}

export default InformationManage
