// import React, { useState, useRef, useEffect, useMemo, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// import './style.scss'

// const member = [
//   { id: 1, name: 'Nguyễn Văn A', msv: '2023001001', age: 'HIT 15' },
//   { id: 2, name: 'Nguyễn Văn B', msv: '2023001002', age: 'HIT 16' },
//   { id: 3, name: 'Trần Thị C', msv: '2023001003', age: 'HIT 15' },
//   { id: 4, name: 'Lê Văn D', msv: '2023001004', age: 'HIT 17' },
//   { id: 5, name: 'Phạm Thị E', msv: '2023001005', age: 'HIT 15' },
//   { id: 6, name: 'Đỗ Văn F', msv: '2023001006', age: 'HIT 16' },
//   { id: 7, name: 'Hoàng Thị G', msv: '2023001007', age: 'HIT 17' },
//   { id: 8, name: 'Ngô Văn H', msv: '2023001008', age: 'HIT 18' },
//   { id: 9, name: 'Vũ Thị I', msv: '2023001009', age: 'HIT 16' },
//   { id: 10, name: 'Bùi Văn K', msv: '2023001010', age: 'HIT 15' },
// ]

// const MemberOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
//   const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
//   const [selectedClassRight, setSelectedClassRight] = useState('Tất cả lớp')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [classOptions] = useState(['Tất cả', 'USER', 'LEADER', 'ADMIN'])
//   const [selectedMembers, setSelectedMembers] = useState([])
//   const [addedMembers, setAddedMembers] = useState([])
//   const dropdownRefLeft = useRef(null)
//   const dropdownRefRight = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target)) {
//         setIsDropdownOpenLeft(false)
//       }
//       if (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target)) {
//         setIsDropdownOpenRight(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const filteredMembers = useMemo(() => {
//     return member.filter(
//       (item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.msv.includes(searchQuery),
//     )
//   }, [searchQuery])

//   const handleSelectLeft = (item) => {
//     setSelectedClassLeft(item)
//     setIsDropdownOpenLeft(false)
//   }

//   const handleSelectRight = (item) => {
//     setSelectedClassRight(item)
//     setIsDropdownOpenRight(false)
//   }

//   const handleRadioChange = (item) => {
//     setSelectedMembers((prev) =>
//       prev.includes(item.msv) ? prev.filter((msv) => msv !== item.msv) : [...prev, item.msv],
//     )
//   }

//   const handleSelectAll = () => {
//     setSelectedMembers(filteredMembers.map((item) => item.msv))
//   }

//   const handleAddMembers = () => {
//     const membersToAdd = filteredMembers.filter((item) => selectedMembers.includes(item.msv))
//     setAddedMembers((prev) => [
//       ...prev,
//       ...membersToAdd.filter((item) => !prev.some((added) => added.msv === item.msv)),
//     ])
//     setSelectedMembers([])
//   }

//   const handleRemoveMembers = () => {
//     setAddedMembers((prev) => prev.filter((item) => !selectedMembers.includes(item.msv)))
//     setSelectedMembers([])
//   }

//   return (
//     <div className='member-compet-admin'>
//       <div className='member-compet-admin__left'>
//         <div className='member-compet-admin__left-title'>
//           <Icon
//             icon='mdi:book-account'
//             width='24'
//             height='24'
//             className='member-compet-admin__left-title-icon'
//           />
//           <h3>Quản lý cuộc thi</h3>
//           <i className='fa-solid fa-angles-right'></i>
//           <h3>HIT Contest Series - 2025</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate('/admin/manage/information')}></i>
//           <div
//             className='member-compet-admin__filter'
//             onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
//             ref={dropdownRefLeft}>
//             <Icon
//               icon='stash:filter-solid'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-icon'
//             />
//             <div className='member-compet-admin__filter-label'>{selectedClassLeft}</div>
//             <Icon
//               icon='mdi:chevron-down'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-arrow'
//             />
//             {isDropdownOpenLeft && (
//               <div className='member-compet-admin__dropdown'>
//                 {classOptions.map((item, index) => (
//                   <div
//                     key={index}
//                     className='member-compet-admin__dropdown-item'
//                     onClick={() => handleSelectLeft(item)}>
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className='member-compet-admin__search'>
//             <input
//               type='text'
//               placeholder='Tìm kiếm...'
//               className='member-compet-admin__search-input'
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//           </div>
//         </div>
//         <div className='member-compet-admin__left-context'>
//           <div className='member-compet-admin__left-context__title'>
//             <h5>Tên thí sinh</h5>
//             <h5>Mã sinh viên</h5>
//             <h5>Khóa học</h5>
//           </div>
//           <div className='member-compet-admin__left-context__list'>
//             {filteredMembers.map((item) => (
//               <div className='member-compet-admin__left-context__list-item' key={item.msv}>
//                 <div className='member-compet-admin__left-context__list-item-box'>
//                   <h5 className='member-compet-admin__left-context__list-item-box-h5'>{item.id}</h5>
//                   <h5>{item.name}</h5>
//                 </div>
//                 <h5>{item.msv}</h5>
//                 <div className='member-compet-admin__left-context__list-item-box'>
//                   <h5>{item.age}</h5>
//                   <input
//                     type='radio'
//                     id={item.msv}
//                     checked={selectedMembers.includes(item.msv)}
//                     onChange={() => handleRadioChange(item)}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={handleSelectAll}>Chọn tất cả</span>
//           <button onClick={handleAddMembers}>Thêm</button>
//         </div>
//       </div>
//       <div className='member-compet-admin__among'></div>
//       <div className='member-compet-admin__right'>
//         <div className='member-compet-admin__left-title'>
//           <Icon
//             icon='fluent:people-24-filled'
//             width='24'
//             className='member-compet-admin__left-title-icon'
//           />
//           <h3>Danh sách thí sinh</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <div className='member-compet-admin__search'>
//             <input
//               type='text'
//               placeholder='Tìm kiếm...'
//               className='member-compet-admin__search-input-second'
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//           </div>
//           <div
//             className='member-compet-admin__filter'
//             onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
//             ref={dropdownRefRight}>
//             <Icon
//               icon='stash:filter-solid'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-icon'
//             />
//             <div className='member-compet-admin__filter-label'>{selectedClassRight}</div>
//             <Icon
//               icon='mdi:chevron-down'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-arrow'
//             />
//             {isDropdownOpenRight && (
//               <div className='member-compet-admin__dropdown'>
//                 {classOptions.map((item, index) => (
//                   <div
//                     key={index}
//                     className='member-compet-admin__dropdown-item'
//                     onClick={() => handleSelectRight(item)}>
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-context'>
//           <div className='member-compet-admin__left-context__title'>
//             <h5>Tên thí sinh</h5>
//             <h5>Mã sinh viên</h5>
//           </div>
//           <div className='member-compet-admin__left-context__list'>
//             {addedMembers.map((item) => (
//               <div className='member-compet-admin__left-context__list-item' key={item.msv}>
//                 <div className='member-compet-admin__left-context__list-item-box'>
//                   <h5 className='member-compet-admin__left-context__list-item-box-h5'>{item.id}</h5>
//                   <h5>{item.name}</h5>
//                 </div>
//                 <h5>{item.msv}</h5>
//                 <input
//                   type='radio'
//                   id={item.msv}
//                   checked={selectedMembers.includes(item.msv)}
//                   onChange={() => handleRadioChange(item)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={handleSelectAll}>Chọn tất cả</span>
//           <button onClick={handleRemoveMembers}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfClassAdmin

// export default MemberOfClassAdmin

// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getAllUsers } from '../../../../apis/user.api'
// import {
//   getMembersInClassroom,
//   addMembersToClassroom,
//   removeMembersFromClassroom,
// } from '../../../../apis/classroom.api'
// import './style.scss'

// const MemberOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const { classId } = useParams()

//   const [allUsers, setAllUsers] = useState([])
//   const [classMembers, setClassMembers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedUserIds, setSelectedUserIds] = useState([])

//   // --- State for LEFT panel controls ---
//   const [searchQueryLeft, setSearchQueryLeft] = useState('')
//   const [selectedRoleLeft, setSelectedRoleLeft] = useState('Tất cả lớp')
//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const dropdownRefLeft = useRef(null)

//   // --- State for RIGHT panel controls ---
//   const [searchQueryRight, setSearchQueryRight] = useState('')

//   const roleOptions = ['USER', 'LEADER', 'ADMIN']

//   // --- Data Fetching ---
//   const fetchData = useCallback(async () => {
//     setLoading(true)
//     try {
//       const [usersResponse, membersResponse] = await Promise.all([
//         getAllUsers(),
//         getMembersInClassroom(classId),
//       ])
//       setAllUsers(usersResponse.data || [])
//       setClassMembers(membersResponse.data?.items || [])
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi tải dữ liệu thành viên.')
//     } finally {
//       setLoading(false)
//     }
//   }, [classId])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   // --- Filtering Logic ---
//   const availableUsers = useMemo(() => {
//     const memberIds = new Set(classMembers.map((m) => m.id))
//     let users = allUsers.filter((user) => !memberIds.has(user.id))

//     if (selectedRoleLeft !== 'Tất cả lớp') {
//       users = users.filter((user) => user.role === selectedRoleLeft)
//     }
//     if (searchQueryLeft) {
//       const query = searchQueryLeft.toLowerCase()
//       users = users.filter(
//         (user) => user.fullName?.toLowerCase().includes(query) || user.studentCode?.includes(query),
//       )
//     }
//     return users
//   }, [allUsers, classMembers, selectedRoleLeft, searchQueryLeft])

//   const filteredClassMembers = useMemo(() => {
//     let members = [...classMembers]
//     if (searchQueryRight) {
//       const query = searchQueryRight.toLowerCase()
//       members = members.filter(
//         (user) => user.fullName?.toLowerCase().includes(query) || user.studentCode?.includes(query),
//       )
//     }
//     return members
//   }, [classMembers, searchQueryRight])

//   // --- Event Handlers ---
//   const handleAddMembers = async () => {
//     if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
//     const toastId = toast.loading('Đang thêm thành viên...')
//     try {
//       await addMembersToClassroom(classId, { memberIds: selectedUserIds })
//       await fetchData()
//       setSelectedUserIds([])
//       toast.success('Thêm thành viên thành công!', { id: toastId })
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
//     }
//   }

//   const handleRemoveMembers = async () => {
//     if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
//     const toastId = toast.loading('Đang xóa thành viên...')
//     try {
//       await removeMembersFromClassroom(classId, { memberIds: selectedUserIds })
//       await fetchData()
//       setSelectedUserIds([])
//       toast.success('Xóa thành viên thành công!', { id: toastId })
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
//     }
//   }

//   // This function correctly toggles selection, matching your requirement.
//   const handleSelectionChange = (userId) => {
//     setSelectedUserIds((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   }

//   const handleSelectAll = (list) => {
//     setSelectedUserIds(list.map((item) => item.id))
//   }

//   const handleSelectRole = (item) => {
//     setSelectedRoleLeft(item)
//     setIsDropdownOpenLeft(false)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target)) {
//         setIsDropdownOpenLeft(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   return (
//     <div className='member-compet-admin'>
//       {/* ======================= LEFT PANEL ======================= */}
//       <div className='member-compet-admin__left'>
//         <div className='member-compet-admin__left-title'>
//           <Icon
//             icon='mdi:book-account'
//             width='24'
//             height='24'
//             className='member-compet-admin__left-title-icon'
//           />
//           <h3>Quản lý thành viên lớp</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/manage/information/${classId}`)}></i>
//           <div
//             className='member-compet-admin__filter'
//             onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
//             ref={dropdownRefLeft}>
//             <Icon
//               icon='stash:filter-solid'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-icon'
//             />
//             <div className='member-compet-admin__filter-label'>{selectedRoleLeft}</div>
//             <Icon
//               icon='mdi:chevron-down'
//               width='20'
//               height='20'
//               className='member-compet-admin__filter-arrow'
//             />
//             {isDropdownOpenLeft && (
//               <div className='member-compet-admin__dropdown'>
//                 {['Tất cả lớp', ...roleOptions].map((item, index) => (
//                   <div
//                     key={index}
//                     className='member-compet-admin__dropdown-item'
//                     onClick={() => handleSelectRole(item)}>
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className='member-compet-admin__search'>
//             <input
//               type='text'
//               placeholder='Tìm kiếm...'
//               className='member-compet-admin__search-input'
//               value={searchQueryLeft}
//               onChange={(e) => setSearchQueryLeft(e.target.value)}
//             />
//             <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//           </div>
//         </div>
//         <div className='member-compet-admin__left-context'>
//           <div className='member-compet-admin__left-context__title'>
//             <h5>Tên thành viên</h5>
//             <h5>Mã sinh viên</h5>
//             <h5>Khóa</h5>
//           </div>
//           <div className='member-compet-admin__left-context__list'>
//             {loading ? (
//               <p>Đang tải...</p>
//             ) : (
//               availableUsers.map((item, index) => (
//                 <div className='member-compet-admin__left-context__list-item' key={item.id}>
//                   <div className='member-compet-admin__left-context__list-item-box'>
//                     <h5 className='member-compet-admin__left-context__list-item-box-h5'>
//                       {index + 1}
//                     </h5>
//                     <h5>{item.fullName}</h5>
//                   </div>
//                   <h5>{item.studentCode}</h5>
//                   <div className='member-compet-admin__left-context__list-item-box'>
//                     <h5>{item.intake}</h5>
//                     <input
//                       type='radio'
//                       checked={selectedUserIds.includes(item.id)}
//                       onChange={() => handleSelectionChange(item.id)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         {/* Preserving the original bottom bar structure and functionality */}
//         <div className='member-compet-admin__left-button'>
//           <span
//             onClick={() => handleSelectAll(availableUsers)}
//             className='member-compet-admin__left-button-span'>
//             Chọn tất cả
//           </span>
//           <button onClick={handleAddMembers}>Thêm</button>
//           {roleOptions.map((role) => (
//             <span
//               key={role}
//               onClick={() => setSelectedRoleLeft(role)}
//               className={
//                 selectedRoleLeft === role
//                   ? 'member-compet-admin__left-button-span active'
//                   : 'member-compet-admin__left-button-span'
//               }>
//               {role}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className='member-compet-admin__among'></div>

//       {/* ======================= RIGHT PANEL ======================= */}
//       <div className='member-compet-admin__right'>
//         <div className='member-compet-admin__left-title'>
//           <Icon
//             icon='fluent:people-24-filled'
//             width='24'
//             className='member-compet-admin__left-title-icon'
//           />
//           <h3>Danh sách thành viên lớp</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <div className='member-compet-admin__search'>
//             <input
//               type='text'
//               placeholder='Tìm kiếm...'
//               className='member-compet-admin__search-input'
//               value={searchQueryRight}
//               onChange={(e) => setSearchQueryRight(e.target.value)}
//             />
//             <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//           </div>
//         </div>
//         <div className='member-compet-admin__left-context'>
//           <div className='member-compet-admin__left-context__title'>
//             <h5>Tên thành viên</h5>
//             <h5>Mã sinh viên</h5>
//           </div>
//           <div className='member-compet-admin__left-context__list'>
//             {loading ? (
//               <p>Đang tải...</p>
//             ) : (
//               filteredClassMembers.map((item, index) => (
//                 <div className='member-compet-admin__left-context__list-item' key={item.id}>
//                   <div className='member-compet-admin__left-context__list-item-box'>
//                     <h5 className='member-compet-admin__left-context__list-item-box-h5'>
//                       {index + 1}
//                     </h5>
//                     <h5>{item.fullName}</h5>
//                   </div>
//                   <h5>{item.studentCode}</h5>
//                   <input
//                     type='radio'
//                     checked={selectedUserIds.includes(item.id)}
//                     onChange={() => handleSelectionChange(item.id)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={() => handleSelectAll(filteredClassMembers)}>Chọn tất cả</span>
//           <button onClick={handleRemoveMembers}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfClassAdmin

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../apis/user.api'
import {
  getMembersInClassroom,
  addMembersToClassroom,
  removeMembersFromClassroom,
} from '../../../../apis/classroom.api'
import './style.scss'

const MemberOfClassAdmin = () => {
  const navigate = useNavigate()
  const { classId } = useParams()

  const [allUsers, setAllUsers] = useState([])
  const [classMembers, setClassMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUserIds, setSelectedUserIds] = useState([])

  // --- State for LEFT panel controls ---
  const [searchQueryLeft, setSearchQueryLeft] = useState('')
  const [selectedIntakeLeft, setSelectedIntakeLeft] = useState('Tất cả lớp')
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const dropdownRefLeft = useRef(null)
  const intakeOptions = ['Tất cả lớp', 'K16', 'K17', 'K18', 'K19', 'K20']

  // --- State for RIGHT panel controls ---
  const [searchQueryRight, setSearchQueryRight] = useState('')

  // --- State for the NEW role filter in the bottom bar ---
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('Tất cả')
  const roleFilterOptions = ['Tất cả', 'USER', 'LEADER', 'ADMIN']

  // --- Data Fetching ---
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [usersResponse, membersResponse] = await Promise.all([
        getAllUsers(),
        getMembersInClassroom(classId),
      ])
      setAllUsers(usersResponse.data || [])
      setClassMembers(membersResponse.data?.items || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi tải dữ liệu thành viên.')
    } finally {
      setLoading(false)
    }
  }, [classId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // --- Filtering Logic ---
  const availableUsers = useMemo(() => {
    const memberIds = new Set(classMembers.map((m) => m.id))
    let users = allUsers.filter((user) => !memberIds.has(user.id))

    if (selectedIntakeLeft !== 'Tất cả lớp') {
      users = users.filter((user) => user.intake === selectedIntakeLeft)
    }
    if (selectedRoleFilter !== 'Tất cả') {
      users = users.filter((user) => user.role === selectedRoleFilter)
    }
    if (searchQueryLeft) {
      const query = searchQueryLeft.toLowerCase()
      users = users.filter(
        (user) => user.fullName?.toLowerCase().includes(query) || user.studentCode?.includes(query),
      )
    }
    return users
  }, [allUsers, classMembers, selectedIntakeLeft, searchQueryLeft, selectedRoleFilter])

  const filteredClassMembers = useMemo(() => {
    let members = [...classMembers]
    if (searchQueryRight) {
      const query = searchQueryRight.toLowerCase()
      members = members.filter(
        (user) => user.fullName?.toLowerCase().includes(query) || user.studentCode?.includes(query),
      )
    }
    return members
  }, [classMembers, searchQueryRight])

  // --- Event Handlers ---
  const handleAddMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
    const toastId = toast.loading('Đang thêm thành viên...')
    try {
      await addMembersToClassroom(classId, { memberIds: selectedUserIds })
      await fetchData()
      setSelectedUserIds([])
      toast.success('Thêm thành viên thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
    }
  }

  const handleRemoveMembers = async () => {
    if (selectedUserIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
    const toastId = toast.loading('Đang xóa thành viên...')
    try {
      await removeMembersFromClassroom(classId, { memberIds: selectedUserIds })
      await fetchData()
      setSelectedUserIds([])
      toast.success('Xóa thành viên thành công!', { id: toastId })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
    }
  }

  const handleSelectionChange = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAll = (list) => {
    setSelectedUserIds(list.map((item) => item.id))
  }

  const handleSelectIntake = (item) => {
    setSelectedIntakeLeft(item)
    setIsDropdownOpenLeft(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target)) {
        setIsDropdownOpenLeft(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className='member-compet-admin'>
      <div className='member-compet-admin__left'>
        <div className='member-compet-admin__left-title'>
          <Icon
            icon='mdi:book-account'
            width='24'
            height='24'
            className='member-compet-admin__left-title-icon'
          />
          <h3>Quản lý thành viên lớp</h3>
        </div>
        <div className='member-compet-admin__header'>
          <i
            className='member-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate(`/admin/class/${classId}`)}></i>
          <div
            className='member-compet-admin__filter'
            onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
            ref={dropdownRefLeft}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='member-compet-admin__filter-icon'
            />
            <div className='member-compet-admin__filter-label'>{selectedIntakeLeft}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenLeft && (
              <div className='member-compet-admin__dropdown'>
                {intakeOptions.map((item, index) => (
                  <div
                    key={index}
                    className='member-compet-admin__dropdown-item'
                    onClick={() => handleSelectIntake(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='member-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='member-compet-admin__search-input'
              value={searchQueryLeft}
              onChange={(e) => setSearchQueryLeft(e.target.value)}
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>Tên thành viên</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              availableUsers.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5>{item.intake}</h5>
                    <input
                      type='checkbox'
                      checked={selectedUserIds.includes(item.id)}
                      onChange={() => handleSelectionChange(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span onClick={() => handleSelectAll(availableUsers)}>Chọn tất cả</span>
          <button onClick={handleAddMembers}>Thêm</button>
          {roleFilterOptions.slice(1).map((role) => (
            <span
              key={role}
              onClick={() => setSelectedRoleFilter(role)}
              className={selectedRoleFilter === role ? 'active-filter' : ''}>
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className='member-compet-admin__among'></div>

      <div className='member-compet-admin__right'>
        <div className='member-compet-admin__left-title'>
          <Icon
            icon='fluent:people-24-filled'
            width='24'
            className='member-compet-admin__left-title-icon'
          />
          <h3>Danh sách thành viên lớp</h3>
        </div>
        <div className='member-compet-admin__header'>
          <div className='member-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='member-compet-admin__search-input'
              value={searchQueryRight}
              onChange={(e) => setSearchQueryRight(e.target.value)}
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>Tên thành viên</h5>
            <h5>Mã sinh viên</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              filteredClassMembers.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <input
                    type='checkbox'
                    checked={selectedUserIds.includes(item.id)}
                    onChange={() => handleSelectionChange(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span onClick={() => handleSelectAll(filteredClassMembers)}>Chọn tất cả</span>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfClassAdmin
