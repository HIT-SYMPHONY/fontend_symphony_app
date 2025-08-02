// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate, useParams } from 'react-router-dom'
// import './style.scss'

// const CheckOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const [member, setMember] = useState({
//     className: 'jbojklm;kkkkkkkkkkkkkkkkk',
//     leader: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkk',
//     startDay: '12/02/2025',
//     endDay: '12/02/2025',
//     length: '8 buổi',
//     time: '18:00 Thứ 2 hàng tuần',
//     moTa: 'jbojklm;kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
//   })
//   const [isEditing, setIsEditing] = useState(false)
//   const [tempMember, setTempMember] = useState(member) // Lưu trữ dữ liệu tạm thời khi chỉnh sửa
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông tin lớp học')
//   const [classOptions, setClassOptions] = useState([
//     {
//       option: 'Thông tin lớp học',
//       link: '/admin/manage/information',
//     },
//     {
//       option: 'Quản lý lớp học',
//       link: '/admin/class/{}/members',
//     },
//   ])

//   const dropdownRef = useRef(null)

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
//   }

//   const handleEditToggle = () => {
//     if (!isEditing) {
//       setTempMember(member) // Lưu dữ liệu hiện tại vào tempMember khi bắt đầu chỉnh sửa
//     }
//     setIsEditing(!isEditing)
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setTempMember((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSave = () => {
//     setMember(tempMember) // Cập nhật dữ liệu member với dữ liệu tạm thời
//     setIsEditing(false)
//   }

//   const handleCancel = () => {
//     setTempMember(member) // Khôi phục dữ liệu ban đầu
//     setIsEditing(false)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleOption = (item) => {
//     if (item?.link) {
//       handleSelect(item.option)
//       navigate(item.link)
//     }
//   }

//   return (
//     <div className='check-class-admin'>
//       <div className='check-class-admin__header'>
//         <i
//           className='check-class-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/manage')}></i>

//         <div
//           className='check-class-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='check-class-admin__filter-icon'
//           />
//           <div className='check-class-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='check-class-admin__filter-arrow'
//           />

//           {isDropdownOpen && (
//             <div className='check-class-admin__dropdown'>
//               {classOptions.map((item, index) => (
//                 <div
//                   key={index}
//                   className='check-class-admin__dropdown-item'
//                   onClick={() => handleOption(item)}>
//                   {item.option}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className='check-class-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='check-class-admin__search-input'
//           />
//           <i className='check-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='check-class-admin__create-button'>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='check-class-admin__content'>
//         <div className='check-class-admin__content-header'>
//           <div className='check-class-admin__content-header-title'>
//             <i className='fa-solid fa-circle-info'></i>
//             <h3>Thông tin lớp học</h3>
//           </div>
//           <div className='check-class-admin__content-header-body'>
//             <div className='check-class-admin__content-header-body__infor'>
//               <Icon icon='ic:round-upload' width='24' height='24' />
//               <p>Tải ảnh lên</p>
//             </div>
//             <form className='check-class-admin__content-header-body__form'>
//               <div className='check-class-admin__content-header-body__form-item'>
//                 <div>
//                   <span>Tên lớp học</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='className'
//                       value={tempMember.className}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.className}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Leader</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='leader'
//                       value={tempMember.leader}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.leader}</h5>
//                   )}
//                 </div>
//               </div>
//               <div className='check-class-admin__content-header-body__form-table'>
//                 <div>
//                   <span>Ngày ban đầu</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='startDay'
//                       value={tempMember.startDay}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.startDay}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Ngày kết thúc</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='endDay'
//                       value={tempMember.endDay}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.endDay}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Độ dài lớp học</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='length'
//                       value={tempMember.length}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.length}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Lịch lớp học</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='time'
//                       value={tempMember.time}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{member.time}</h5>
//                   )}
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className='check-class-admin__content-header-mota'>
//             <span>Mô tả:</span>
//             {isEditing ? (
//               <textarea
//                 name='moTa'
//                 value={tempMember.moTa}
//                 onChange={handleInputChange}
//                 className='check-class-admin__content-header-mota__textarea'
//               />
//             ) : (
//               <h5>{member.moTa}</h5>
//             )}
//           </div>
//         </div>
//         <div className='check-class-admin__content-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleSave}>Lưu</button>
//               <button onClick={handleCancel}>Hủy</button>
//             </>
//           ) : (
//             <button onClick={handleEditToggle}>Chỉnh sửa</button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CheckOfClassAdmin

// import React, { useState, useRef, useEffect, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getClassroomById, updateClassroom } from '../../../../apis/classroom.api'
// import { getAllUsers } from '../../../../apis/user.api'
// import { formatDate } from '../../../../utils/formatters'
// import './style.scss'

// const CheckOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const { classId } = useParams()

//   const [classroom, setClassroom] = useState(null)
//   const [editForm, setEditForm] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isEditing, setIsEditing] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const fileInputRef = useRef(null)

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông tin lớp học')
//   const dropdownRef = useRef(null)

//   const classOptions = [
//     { option: 'Thông tin lớp học', link: `/admin/class/${classId}` },
//     { option: 'Quản lý thành viên', link: `/admin/class/${classId}/members` },
//   ]

//   const processFetchedData = useCallback((classData, allUsers) => {
//     const leaderList = allUsers.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN')
//     setLeaders(leaderList)
//     setClassroom(classData)
//     setPreviewUrl(classData.image)

//     setEditForm({
//       name: classData.name || '',
//       leaderId: classData.leaderId || '',
//       startTime: classData.startTime ? classData.startTime.split('T')[0] : '',
//       duration: classData.duration || '',
//       description: classData.description || '',
//     })
//   }, [])

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const [classRes, usersRes] = await Promise.all([getClassroomById(classId), getAllUsers()])

//       const classData = classRes.data.data
//       const allUsers = usersRes.data || []

//       processFetchedData(classData, allUsers)
//     } catch (err) {
//       toast.error('Không thể tải dữ liệu lớp học.')
//       // navigate('/admin/class')
//     } finally {
//       setLoading(false)
//     }
//   }, [classId, navigate, processFetchedData])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setEditForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   const handleSave = async () => {
//     const saveToast = toast.loading('Đang lưu...')
//     const payload = {
//       name: editForm.name,
//       leaderId: editForm.leaderId,
//       startTime: `${editForm.startTime}T00:00:00Z`,
//       duration: parseInt(editForm.duration),
//       description: editForm.description,
//     }

//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
//     if (imageFile) {
//       formData.append('image', imageFile)
//     }

//     try {
//       await updateClassroom(classId, formData)
//       toast.success('Cập nhật thành công!', { id: saveToast })
//       setIsEditing(false)
//       fetchData()
//     } catch (err) {
//       const message = err.response?.data?.message || 'Cập nhật thất bại.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: saveToast,
//       })
//     }
//   }

//   const handleCancel = () => {
//     setEditForm({
//       name: classroom.name,
//       leaderId: classroom.leaderId,
//       startTime: classroom.startTime.split('T')[0],
//       duration: classroom.duration,
//       description: classroom.description,
//     })
//     setPreviewUrl(classroom.image)
//     setImageFile(null)
//     setIsEditing(false)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target))
//         setIsDropdownOpen(false)
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleOption = (item) => {
//     if (item?.link) {
//       setSelectedClass(item.option)
//       setIsDropdownOpen(false)
//       navigate(item.link)
//     }
//   }

//   if (loading || !classroom) {
//     return <div>Đang tải thông tin lớp học...</div>
//   }

//   return (
//     <div className='check-class-admin'>
//       <div className='check-class-admin__header'>
//         <i
//           className='check-class-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/class')}></i>
//         <div
//           className='check-class-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='check-class-admin__filter-icon'
//           />
//           <div className='check-class-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='check-class-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='check-class-admin__dropdown'>
//               {classOptions.map((item, index) => (
//                 <div
//                   key={index}
//                   className='check-class-admin__dropdown-item'
//                   onClick={() => handleOption(item)}>
//                   {item.option}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className='check-class-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='check-class-admin__search-input'
//           />
//           <i className='check-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button
//           className='check-class-admin__create-button'
//           onClick={() => navigate('/admin/class/create')}>
//           <i className='fa-solid fa-plus'></i> Tạo mới
//         </button>
//       </div>
//       <div className='check-class-admin__content'>
//         <div className='check-class-admin__content-header'>
//           <div className='check-class-admin__content-header-title'>
//             <i className='fa-solid fa-circle-info'></i>
//             <h3>Thông tin lớp học</h3>
//           </div>
//           <div className='check-class-admin__content-header-body'>
//             <div
//               className='check-class-admin__content-header-body__infor'
//               onClick={() => isEditing && fileInputRef.current.click()}>
//               {previewUrl ? (
//                 <img src={previewUrl} alt='Preview' className='class-image-preview' />
//               ) : (
//                 <Icon icon='ic:round-upload' width='24' height='24' />
//               )}
//               <p>{isEditing ? 'Thay đổi ảnh' : 'Ảnh lớp'}</p>
//               <input
//                 type='file'
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 accept='image/*'
//               />
//             </div>
//             <form className='check-class-admin__content-header-body__form'>
//               <div className='check-class-admin__content-header-body__form-item'>
//                 <div>
//                   <span>Tên lớp học</span>
//                   {isEditing ? (
//                     <input
//                       type='text'
//                       name='name'
//                       value={editForm.name}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{classroom.name}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Leader</span>
//                   {isEditing ? (
//                     <select
//                       name='leaderId'
//                       value={editForm.leaderId}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'>
//                       <option value=''>-- Chọn Leader --</option>
//                       {leaders.map((leader) => (
//                         <option key={leader.id} value={leader.id}>
//                           {leader.fullName}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <h5>{classroom.leaderName}</h5>
//                   )}
//                 </div>
//               </div>
//               <div className='check-class-admin__content-header-body__form-table'>
//                 <div>
//                   <span>Ngày bắt đầu</span>
//                   {isEditing ? (
//                     <input
//                       type='date'
//                       name='startTime'
//                       value={editForm.startTime}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{formatDate(classroom.startTime)}</h5>
//                   )}
//                 </div>
//                 <div>
//                   <span>Độ dài lớp học (tuần)</span>
//                   {isEditing ? (
//                     <input
//                       type='number'
//                       name='duration'
//                       value={editForm.duration}
//                       onChange={handleInputChange}
//                       className='check-class-admin__input'
//                     />
//                   ) : (
//                     <h5>{classroom.duration}</h5>
//                   )}
//                 </div>
//                 <div style={{ visibility: 'hidden' }}></div>
//                 <div style={{ visibility: 'hidden' }}></div>
//               </div>
//             </form>
//           </div>
//           <div className='check-class-admin__content-header-mota'>
//             <span>Mô tả:</span>
//             {isEditing ? (
//               <textarea
//                 name='description'
//                 value={editForm.description}
//                 onChange={handleInputChange}
//                 className='check-class-admin__content-header-mota__textarea'
//               />
//             ) : (
//               <h5>{classroom.description || 'Chưa có mô tả.'}</h5>
//             )}
//           </div>
//         </div>
//         <div className='check-class-admin__content-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleSave}>Lưu</button>
//               <button onClick={handleCancel}>Hủy</button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CheckOfClassAdmin

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getClassroomById, updateClassroom } from '../../../../apis/classroom.api'
import { getAllUsers } from '../../../../apis/user.api'
import { formatDate } from '../../../../utils/formatters'
import './style.scss'

const CheckOfClassAdmin = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [classroom, setClassroom] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông tin lớp học')
  const dropdownRef = useRef(null)

  const classOptions = [
    { option: 'Thông tin lớp học', link: `/admin/class/${classId}` },
    { option: 'Quản lý thành viên', link: `/admin/class/${classId}/members` },
  ]

  const processFetchedData = useCallback((classData, allUsersData) => {
    const leaderList = allUsersData.filter(
      (user) => user.role === 'LEADER' || user.role === 'ADMIN',
    )
    setLeaders(leaderList)
    setClassroom(classData)
    setPreviewUrl(classData.image)

    setEditForm({
      name: classData.name || '',
      leaderId: classData.leaderId || '',
      startTime: classData.startTime ? classData.startTime.split('T')[0] : '',
      duration: classData.duration || '',
      description: classData.description || '',
    })
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [classRes, usersRes] = await Promise.all([getClassroomById(classId), getAllUsers()])

      const classData = classRes.data
      const allUsers = usersRes.data || []

      processFetchedData(classData, allUsers)
    } catch (err) {
      toast.error('Không thể tải dữ liệu lớp học.')
      navigate('/admin/class')
    } finally {
      setLoading(false)
    }
  }, [classId, navigate, processFetchedData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    const saveToast = toast.loading('Đang lưu...')
    const payload = {
      name: editForm.name,
      leaderId: editForm.leaderId,
      startTime: `${editForm.startTime}T00:00:00Z`,
      duration: parseInt(editForm.duration),
      description: editForm.description,
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      await updateClassroom(classId, formData)
      toast.success('Cập nhật thành công!', { id: saveToast })
      setIsEditing(false)
      fetchData()
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: saveToast,
      })
    }
  }

  const handleCancel = () => {
    setEditForm({
      name: classroom.name,
      leaderId: classroom.leaderId,
      startTime: classroom.startTime.split('T')[0],
      duration: classroom.duration,
      description: classroom.description,
    })
    setPreviewUrl(classroom.image)
    setImageFile(null)
    setIsEditing(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
        setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  if (loading || !classroom) {
    return <div>Đang tải thông tin lớp học...</div>
  }

  return (
    <div className='check-class-admin'>
      <div className='check-class-admin__header'>
        <i
          className='check-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/class')}></i>
        <div
          className='check-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='check-class-admin__filter-icon'
          />
          <div className='check-class-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='check-class-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='check-class-admin__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='check-class-admin__dropdown-item'
                  onClick={() => handleOption(item)}>
                  {item.option}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='check-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='check-class-admin__search-input'
          />
          <i className='check-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='check-class-admin__create-button'
          onClick={() => navigate('/admin/class/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='check-class-admin__content'>
        <div className='check-class-admin__content-header'>
          <div className='check-class-admin__content-header-title'>
            <i className='fa-solid fa-circle-info'></i>
            <h3>Thông tin lớp học</h3>
          </div>
          <div className='check-class-admin__content-header-body'>
            <div
              className='check-class-admin__content-header-body__infor'
              onClick={() => isEditing && fileInputRef.current.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt='Class preview' className='class-image-preview' />
              ) : (
                <Icon icon='ic:round-upload' width='24' height='24' />
              )}
              <p>{isEditing ? 'Thay đổi ảnh' : 'Ảnh lớp'}</p>
              <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept='image/*'
              />
            </div>
            <form className='check-class-admin__content-header-body__form'>
              <div className='check-class-admin__content-header-body__form-item'>
                <div>
                  <span>Tên lớp học</span>
                  {isEditing ? (
                    <input
                      type='text'
                      name='name'
                      value={editForm.name}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{classroom.name}</h5>
                  )}
                </div>
                <div>
                  <span>Leader</span>
                  {isEditing ? (
                    <select
                      name='leaderId'
                      value={editForm.leaderId}
                      onChange={handleInputChange}
                      className='check-class-admin__input'>
                      <option value=''>-- Chọn Leader --</option>
                      {leaders.map((leader) => (
                        <option key={leader.id} value={leader.id}>
                          {leader.fullName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <h5>{classroom.leaderName}</h5>
                  )}
                </div>
              </div>
              <div className='check-class-admin__content-header-body__form-table'>
                <div>
                  <span>Ngày bắt đầu</span>
                  {isEditing ? (
                    <input
                      type='date'
                      name='startTime'
                      value={editForm.startTime}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{formatDate(classroom.startTime)}</h5>
                  )}
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  <h5>{/* This field does not exist in the API response */}</h5>
                </div>
                <div>
                  <span>Độ dài lớp học (tuần)</span>
                  {isEditing ? (
                    <input
                      type='number'
                      name='duration'
                      value={editForm.duration}
                      onChange={handleInputChange}
                      className='check-class-admin__input'
                    />
                  ) : (
                    <h5>{classroom.duration}</h5>
                  )}
                </div>
                <div>
                  <span>Lịch lớp học</span>
                  <h5>{/* This field does not exist in the API response */}</h5>
                </div>
              </div>
            </form>
          </div>
          <div className='check-class-admin__content-header-mota'>
            <span>Mô tả:</span>
            {isEditing ? (
              <textarea
                name='description'
                value={editForm.description}
                onChange={handleInputChange}
                className='check-class-admin__content-header-mota__textarea'
              />
            ) : (
              <h5>{classroom.description || 'Chưa có mô tả.'}</h5>
            )}
          </div>
        </div>
        <div className='check-class-admin__content-button'>
          {isEditing ? (
            <>
              <button onClick={handleSave}>Lưu</button>
              <button onClick={handleCancel}>Hủy</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckOfClassAdmin
