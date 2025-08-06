// import React, { useState, useRef, useEffect, useMemo, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate, useParams } from 'react-router-dom'
// import { getAllUsers } from '../../../../apis/user.api'

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

// const MemberOfCompetAdmin = () => {
//   const { competitionId } = useParams()
//   const navigate = useNavigate()
//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
//   const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
//   const [selectedClassRight, setSelectedClassRight] = useState('Tất cả lớp')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [classOptions] = useState(['Tất cả lớp', 'HIT 15', 'HIT 16', 'HIT 17', 'HIT 18'])
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
//             onClick={() => navigate('/admin/competition/information')}></i>
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

// export default MemberOfCompetAdmin

// export default MemberOfCompetAdmin

// import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getAllUsers } from '../../../../apis/user.api'
// import { getMembers, addMembers, removeMembers } from '../../../../apis/classroom.api'
// import './style.scss'

// const MemberOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const { classId } = useParams()

//   // --- State Management ---
//   const [allUsers, setAllUsers] = useState([])
//   const [classMembers, setClassMembers] = useState([])
//   const [loading, setLoading] = useState(true)

//   // UI State
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedUserIdsLeft, setSelectedUserIdsLeft] = useState([])
//   const [selectedUserIdsRight, setSelectedUserIdsRight] = useState([])

//   // These dropdowns are in your JSX but not functional in the original, so we'll keep them simple for now
//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
//   const dropdownRefLeft = useRef(null)
//   const dropdownRefRight = useRef(null)

//   // --- Data Fetching ---
//   const fetchAllData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const params = { pageNum: 1, pageSize: 200 } // Fetch a large number of members/users
//       const [usersResponse, membersResponse] = await Promise.all([
//         getAllUsers(),
//         getMembers(classId, params),
//       ])
//       setAllUsers(usersResponse.data || [])
//       setClassMembers(membersResponse.data?.items || [])
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Không thể tải dữ liệu thành viên.')
//     } finally {
//       setLoading(false)
//     }
//   }, [classId])

//   useEffect(() => {
//     fetchAllData()
//   }, [fetchAllData])

//   // --- Filtering Logic ---
//   const availableUsers = useMemo(() => {
//     const memberIds = new Set(classMembers.map((m) => m.id))
//     let users = allUsers.filter((user) => !memberIds.has(user.id))
//     if (searchQuery) {
//       const lowercasedQuery = searchQuery.toLowerCase()
//       users = users.filter(
//         (user) =>
//           user.fullName?.toLowerCase().includes(lowercasedQuery) ||
//           user.studentCode?.includes(lowercasedQuery),
//       )
//     }
//     return users
//   }, [allUsers, classMembers, searchQuery])

//   // --- Event Handlers ---
//   const handleAdd = async () => {
//     if (selectedUserIdsLeft.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
//     const toastId = toast.loading('Đang thêm thành viên...')
//     try {
//       await addMembers(classId, { memberIds: selectedUserIdsLeft })
//       toast.success('Thêm thành viên thành công!', { id: toastId })
//       setSelectedUserIdsLeft([])
//       await fetchAllData()
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
//     }
//   }

//   const handleRemove = async () => {
//     if (selectedUserIdsRight.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
//     const toastId = toast.loading('Đang xóa thành viên...')
//     try {
//       await removeMembers(classId, { memberIds: selectedUserIdsRight })
//       toast.success('Xóa thành viên thành công!', { id: toastId })
//       setSelectedUserIdsRight([])
//       await fetchAllData()
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
//     }
//   }

//   // Selection handlers
//   const handleSelectLeft = (userId) =>
//     setSelectedUserIdsLeft((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   const handleSelectRight = (userId) =>
//     setSelectedUserIdsRight((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   const handleSelectAllLeft = () => setSelectedUserIdsLeft(availableUsers.map((u) => u.id))
//   const handleSelectAllRight = () => setSelectedUserIdsRight(classMembers.map((u) => u.id))

//   // Dropdown handlers from your original code
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target))
//         setIsDropdownOpenLeft(false)
//       if (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target))
//         setIsDropdownOpenRight(false)
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

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
//           <h3>Thêm thành viên</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/manage/information/${classId}`)}></i>
//           <div
//             className='member-compet-admin__filter'
//             onClick={() => setIsDropdownOpenLeft(!isDropdownOpenLeft)}
//             ref={dropdownRefLeft}>
//             {/* ... dropdown JSX ... */}
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
//             <h5>Tên thành viên</h5>
//             <h5>Mã sinh viên</h5>
//             <h5>Khóa học</h5>
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
//                       checked={selectedUserIdsLeft.includes(item.id)}
//                       onChange={() => handleSelectLeft(item.id)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={handleSelectAllLeft} className='member-compet-admin__left-button-span'>
//             Chọn tất cả
//           </span>
//           <button onClick={handleAdd}>Thêm</button>
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
//           <h3>Danh sách thành viên</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <div className='member-compet-admin__search'>
//             <input
//               type='text'
//               placeholder='Tìm kiếm...'
//               className='member-compet-admin__search-input-second'
//             />
//             <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//           </div>
//           <div
//             className='member-compet-admin__filter'
//             onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
//             ref={dropdownRefRight}>
//             {/* ... dropdown JSX ... */}
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
//               classMembers.map((item, index) => (
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
//                     checked={selectedUserIdsRight.includes(item.id)}
//                     onChange={() => handleSelectRight(item.id)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={handleSelectAllRight} className='member-compet-admin__left-button-span'>
//             Chọn tất cả
//           </span>
//           <button onClick={handleRemove}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfClassAdmin

// import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import {
//   addMultipleMembers,
//   removeMultipleMembers,
//   getMembers,
//   getNonMembers,
// } from '../../../../apis/competition.api'
// import './style.scss'

// const MemberOfCompetAdmin = () => {
//   const { competitionId } = useParams()
//   const navigate = useNavigate()

//   const [nonMembers, setNonMembers] = useState([])
//   const [members, setMembers] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedMemberIds, setSelectedMemberIds] = useState([])

//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const dropdownRefLeft = useRef(null)
//   const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')

//   const classOptions = ['Tất cả lớp', 'K15', 'K16', 'K17', 'K18'] // Example intake options

//   const fetchAllData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const params = { pageNum: 1, pageSize: 200 } // Fetch up to 200 users for now

//       const [nonMembersRes, membersRes] = await Promise.all([
//         getNonMembers(competitionId, params),
//         getMembers(competitionId, params),
//       ])

//       setNonMembers(nonMembersRes.data?.items || [])
//       setMembers(membersRes.data?.items || [])
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Không thể tải dữ liệu thành viên.')
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId])

//   useEffect(() => {
//     fetchAllData()
//   }, [fetchAllData])

//   const filteredNonMembers = useMemo(() => {
//     let users = nonMembers
//     if (selectedClassLeft !== 'Tất cả lớp') {
//       users = users.filter((user) => user.intake === selectedClassLeft)
//     }
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       users = users.filter(
//         (u) => u.fullName.toLowerCase().includes(query) || u.studentCode.includes(query),
//       )
//     }
//     return users
//   }, [nonMembers, searchQuery, selectedClassLeft])

//   const handleSelectionChange = (userId) => {
//     setSelectedMemberIds((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   }

//   const handleAdd = async () => {
//     if (selectedMemberIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
//     const toastId = toast.loading('Đang thêm thành viên...')
//     try {
//       await addMultipleMembers({ competitionId, userIds: selectedMemberIds })
//       toast.success('Thêm thành viên thành công!', { id: toastId })
//       setSelectedMemberIds([])
//       await fetchAllData()
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
//     }
//   }

//   const handleRemove = async () => {
//     if (selectedMemberIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
//     const toastId = toast.loading('Đang xóa thành viên...')
//     try {
//       await removeMultipleMembers({ competitionId, userIds: selectedMemberIds })
//       toast.success('Xóa thành viên thành công!', { id: toastId })
//       setSelectedMemberIds([])
//       await fetchAllData()
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
//     }
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target))
//         setIsDropdownOpenLeft(false)
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSelectLeft = (item) => {
//     setSelectedClassLeft(item)
//     setIsDropdownOpenLeft(false)
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
//           <h3>Thêm thí sinh vào cuộc thi</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/competitions/${competitionId}`)}></i>
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
//             {loading ? (
//               <p>Đang tải...</p>
//             ) : (
//               filteredNonMembers.map((item, index) => (
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
//                       checked={selectedMemberIds.includes(item.id)}
//                       onChange={() => handleSelectionChange(item.id)}
//                     />
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span
//             onClick={() => setSelectedMemberIds(filteredNonMembers.map((m) => m.id))}
//             className='member-compet-admin__left-button-span'>
//             Chọn tất cả
//           </span>
//           <button onClick={handleAdd}>Thêm</button>
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
//           </div>
//           <div className='member-compet-admin__left-context__list'>
//             {loading ? (
//               <p>Đang tải...</p>
//             ) : (
//               members.map((item, index) => (
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
//                     checked={selectedMemberIds.includes(item.id)}
//                     onChange={() => handleSelectionChange(item.id)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span
//             onClick={() => setSelectedMemberIds(members.map((m) => m.id))}
//             className='member-compet-admin__left-button-span'>
//             Chọn tất cả
//           </span>
//           <button onClick={handleRemove}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfCompetAdmin

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  addMultipleMembers,
  removeMultipleMembers,
  getMembers,
  getNonMembers,
} from '../../../../apis/competition.api'
import './style.scss'

const MemberOfCompetAdmin = () => {
  const { competitionId } = useParams()
  const navigate = useNavigate()

  const [nonMembers, setNonMembers] = useState([])
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // State for UI Controls
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMemberIds, setSelectedMemberIds] = useState([])

  // Left panel state
  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const dropdownRefLeft = useRef(null)
  const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
  const classOptions = ['Tất cả lớp', 'K15', 'K16', 'K17', 'K18']

  // Right panel state
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const dropdownRefRight = useRef(null)
  const [selectedRoleRight, setSelectedRoleRight] = useState('Tất cả')
  const roleOptions = ['Tất cả', 'USER', 'LEADER', 'ADMIN']

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true)
      const params = { pageNum: 1, pageSize: 200 } // Fetch up to 200 users for now

      const [nonMembersRes, membersRes] = await Promise.all([
        getNonMembers(competitionId, params),
        getMembers(competitionId, params),
      ])

      setNonMembers(nonMembersRes.data?.items || [])
      setMembers(membersRes.data?.items || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể tải dữ liệu thành viên.')
    } finally {
      setLoading(false)
    }
  }, [competitionId])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  // Filtering Logic for Left Panel
  const filteredNonMembers = useMemo(() => {
    let users = [...nonMembers]
    if (selectedClassLeft !== 'Tất cả lớp') {
      users = users.filter((user) => user.intake === selectedClassLeft)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      users = users.filter(
        (u) => u.fullName.toLowerCase().includes(query) || u.studentCode.includes(query),
      )
    }
    return users
  }, [nonMembers, searchQuery, selectedClassLeft])

  // Filtering Logic for Right Panel
  const filteredMembers = useMemo(() => {
    let users = [...members]
    if (selectedRoleRight !== 'Tất cả') {
      users = users.filter((user) => user.role === selectedRoleRight)
    }
    return users
  }, [members, selectedRoleRight])

  // Event Handlers
  const handleSelectionChange = (userId) => {
    setSelectedMemberIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleAdd = async () => {
    if (selectedMemberIds.length === 0) return toast.error('Vui lòng chọn thành viên để thêm.')
    const toastId = toast.loading('Đang thêm thành viên...')
    try {
      await addMultipleMembers({ competitionId, userIds: selectedMemberIds })
      toast.success('Thêm thành viên thành công!', { id: toastId })
      setSelectedMemberIds([])
      await fetchAllData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi thêm thành viên.', { id: toastId })
    }
  }

  const handleRemove = async () => {
    if (selectedMemberIds.length === 0) return toast.error('Vui lòng chọn thành viên để xóa.')
    const toastId = toast.loading('Đang xóa thành viên...')
    try {
      await removeMultipleMembers({ competitionId, userIds: selectedMemberIds })
      toast.success('Xóa thành viên thành công!', { id: toastId })
      setSelectedMemberIds([])
      await fetchAllData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi xóa thành viên.', { id: toastId })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target))
        setIsDropdownOpenLeft(false)
      if (dropdownRefRight.current && !dropdownRefRight.current.contains(event.target))
        setIsDropdownOpenRight(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectLeft = (item) => {
    setSelectedClassLeft(item)
    setIsDropdownOpenLeft(false)
  }

  const handleSelectRight = (item) => {
    setSelectedRoleRight(item)
    setIsDropdownOpenRight(false)
  }

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
          <h3>Thêm thí sinh vào cuộc thi</h3>
        </div>
        <div className='member-compet-admin__header'>
          <i
            className='member-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate(`/admin/competition/${competitionId}/information`)}></i>
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
            <div className='member-compet-admin__filter-label'>{selectedClassLeft}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenLeft && (
              <div className='member-compet-admin__dropdown'>
                {classOptions.map((item, index) => (
                  <div
                    key={index}
                    className='member-compet-admin__dropdown-item'
                    onClick={() => handleSelectLeft(item)}>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>Tên thí sinh</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa học</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              filteredNonMembers.map((item, index) => (
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
                      type='radio'
                      checked={selectedMemberIds.includes(item.id)}
                      onChange={() => handleSelectionChange(item.id)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span
            onClick={() => setSelectedMemberIds(filteredNonMembers.map((m) => m.id))}
            className='member-compet-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={handleAdd}>Thêm</button>
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
          <h3>Danh sách thí sinh</h3>
        </div>
        <div className='member-compet-admin__header'>
          <div className='member-compet-admin__search'>
            <input
              type='text'
              placeholder='Tìm kiếm...'
              className='member-compet-admin__search-input-second'
            />
            <i className='member-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
          </div>
          <div
            className='member-compet-admin__filter'
            onClick={() => setIsDropdownOpenRight(!isDropdownOpenRight)}
            ref={dropdownRefRight}>
            <Icon
              icon='stash:filter-solid'
              width='20'
              height='20'
              className='member-compet-admin__filter-icon'
            />
            <div className='member-compet-admin__filter-label'>{selectedRoleRight}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenRight && (
              <div className='member-compet-admin__dropdown'>
                {roleOptions.map((item, index) => (
                  <div
                    key={index}
                    className='member-compet-admin__dropdown-item'
                    onClick={() => handleSelectRight(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-context'>
          <div className='member-compet-admin__left-context__title'>
            <h5>Tên thí sinh</h5>
            <h5>Mã sinh viên</h5>
          </div>
          <div className='member-compet-admin__left-context__list'>
            {loading ? (
              <p>Đang tải...</p>
            ) : (
              filteredMembers.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <input
                    type='radio'
                    checked={selectedMemberIds.includes(item.id)}
                    onChange={() => handleSelectionChange(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span
            onClick={() => setSelectedMemberIds(filteredMembers.map((m) => m.id))}
            className='member-compet-admin__left-button-span'>
            Chọn tất cả
          </span>
          <button onClick={handleRemove}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfCompetAdmin
