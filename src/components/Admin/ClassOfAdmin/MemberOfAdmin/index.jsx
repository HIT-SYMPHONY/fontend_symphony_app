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

// import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getAllUsers } from '../../../../apis/user.api'
// import { addMembersToClassroom, getMembersInClassroom } from '../../../../apis/classroom.api'
// import './style.scss'

// const MemberOfClassAdmin = () => {
//   const { classId } = useParams()
//   const navigate = useNavigate()

//   const [allUsers, setAllUsers] = useState([])
//   const [classMembers, setClassMembers] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedMemberIds, setSelectedMemberIds] = useState([])

//   const fetchAllData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const [usersResponse, membersResponse] = await Promise.all([
//         getAllUsers(),
//         getMembersInClassroom(classId),
//       ])
//       setAllUsers(usersResponse.data || [])
//       setClassMembers(membersResponse.data?.items || [])
//     } catch (error) {
//       toast.error('Không thể tải dữ liệu thành viên.')
//     } finally {
//       setLoading(false)
//     }
//   }, [classId])

//   useEffect(() => {
//     fetchAllData()
//   }, [fetchAllData])

//   const availableUsers = useMemo(() => {
//     const classMemberIds = new Set(classMembers.map((m) => m.id))
//     let available = allUsers.filter((user) => !classMemberIds.has(user.id))

//     if (searchQuery) {
//       const lowercasedQuery = searchQuery.toLowerCase()
//       available = available.filter(
//         (user) =>
//           // 👇 FIX: Added optional chaining (?) to prevent crash if fullName is null
//           user.fullName?.toLowerCase().includes(lowercasedQuery) ||
//           user.studentCode?.includes(lowercasedQuery),
//       )
//     }
//     return available
//   }, [allUsers, classMembers, searchQuery])

//   const handleSelectionChange = (userId) => {
//     setSelectedMemberIds((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   }

//   const handleSelectAll = () => {
//     setSelectedMemberIds(availableUsers.map((item) => item.id))
//   }

//   const handleAddMembers = async () => {
//     if (!classId || selectedMemberIds.length === 0) {
//       toast.error('Vui lòng chọn thành viên để thêm vào lớp.')
//       return
//     }
//     const actionToast = toast.loading('Đang thêm thành viên...')
//     try {
//       const payload = { memberIds: selectedMemberIds }
//       await addMembersToClassroom(classId, payload)
//       toast.success('Thêm thành viên thành công!', { id: actionToast })
//       setSelectedMemberIds([])
//       await fetchAllData()
//     } catch (error) {
//       const message = error.response?.data?.message || 'Lỗi khi thêm thành viên.'
//       toast.error(message, { id: actionToast })
//     }
//   }

//   const handleRemoveMembers = () => {
//     toast.info('Chức năng xóa đang được phát triển.')
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
//           <h3>Quản lý lớp học</h3>
//           <i className='fa-solid fa-angles-right'></i>
//           <h3>Thêm thành viên</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/manage/information/${classId}`)}></i>
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
//                       type='checkbox' // Changed to checkbox for multi-select
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
//           <h3>Danh sách thành viên lớp</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           {/* Right panel search and filter can be added here */}
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
//                     type='checkbox' // Changed to checkbox for multi-select
//                     checked={selectedMemberIds.includes(item.id)}
//                     onChange={() => handleSelectionChange(item.id)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={() => setSelectedMemberIds(classMembers.map((m) => m.id))}>
//             Chọn tất cả
//           </span>
//           <button onClick={handleRemoveMembers}>Xóa</button>
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
// import { getAllUsers } from '../../../../apis/user.api'
// import {
//   addMembersToClassroom,
//   getMembersInClassroom,
//   removeMembersFromClassroom,
// } from '../../../../apis/classroom.api'
// import './style.scss'

// const MemberOfClassAdmin = () => {
//   const { classId } = useParams()
//   const navigate = useNavigate()

//   const [allUsers, setAllUsers] = useState([])
//   const [classMembers, setClassMembers] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedMemberIds, setSelectedMemberIds] = useState([])
//   const dropdownRefLeft = useRef(null)

//   const classOptions = ['Tất cả', 'USER', 'LEADER', 'ADMIN'] // As per your original code

//   const fetchAllData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const [usersResponse, membersResponse] = await Promise.all([
//         getAllUsers(),
//         getMembersInClassroom(classId),
//       ])
//       setAllUsers(usersResponse.data || [])
//       setClassMembers(membersResponse.data?.items || [])
//     } catch (error) {
//       toast.error('Không thể tải dữ liệu thành viên.')
//     } finally {
//       setLoading(false)
//     }
//   }, [classId])

//   useEffect(() => {
//     fetchAllData()
//   }, [fetchAllData])

//   const availableUsers = useMemo(() => {
//     const classMemberIds = new Set(classMembers.map((m) => m.id))
//     let available = allUsers.filter((user) => !classMemberIds.has(user.id))
//     if (searchQuery) {
//       const lowercasedQuery = searchQuery.toLowerCase()
//       available = available.filter(
//         (user) =>
//           user.fullName?.toLowerCase().includes(lowercasedQuery) ||
//           user.studentCode?.includes(lowercasedQuery),
//       )
//     }
//     return available
//   }, [allUsers, classMembers, searchQuery])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRefLeft.current && !dropdownRefLeft.current.contains(event.target)) {
//         setIsDropdownOpenLeft(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSelectionChange = (userId) => {
//     setSelectedMemberIds((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   }

//   const handleSelectAll = () => {
//     setSelectedMemberIds(availableUsers.map((item) => item.id))
//   }

//   const handleAddMembers = async () => {
//     if (!classId || selectedMemberIds.length === 0) {
//       toast.error('Vui lòng chọn thành viên để thêm vào lớp.')
//       return
//     }
//     const actionToast = toast.loading('Đang thêm thành viên...')
//     try {
//       const payload = { memberIds: selectedMemberIds }
//       await addMembersToClassroom(classId, payload)
//       toast.success('Thêm thành viên thành công!', { id: actionToast })
//       setSelectedMemberIds([])
//       await fetchAllData()
//     } catch (error) {
//       const message = error.response?.data?.message || 'Lỗi khi thêm thành viên.'
//       toast.error(message, { id: actionToast })
//     }
//   }

//   const handleRemoveMembers = async () => {
//     if (!classId || selectedMemberIds.length === 0) {
//       toast.error('Vui lòng chọn thành viên để xóa khỏi lớp.')
//       return
//     }
//     const actionToast = toast.loading('Đang xóa thành viên...')
//     try {
//       const payload = { memberIds: selectedMemberIds }
//       await removeMembersFromClassroom(classId, payload)
//       toast.success('Xóa thành viên thành công!', { id: actionToast })
//       setSelectedMemberIds([])
//       await fetchAllData()
//     } catch (error) {
//       const message = error.response?.data?.message || 'Lỗi khi xóa thành viên.'
//       toast.error(message, { id: actionToast })
//     }
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
//           <h3>Quản lý lớp học</h3>
//           <i className='fa-solid fa-angles-right'></i>
//           <h3>Thêm thành viên</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/manage/information/${classId}`)}></i>
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
//                       type='radio' // Keeping as radio per your original JSX
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
//           <h3>Danh sách thành viên lớp</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           {/* Right panel search and filter can be added here if needed */}
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
//                     checked={selectedMemberIds.includes(item.id)}
//                     onChange={() => handleSelectionChange(item.id)}
//                   />
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span onClick={() => setSelectedMemberIds(classMembers.map((m) => m.id))}>
//             Chọn tất cả
//           </span>
//           <button onClick={handleRemoveMembers}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfClassAdmin

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../apis/user.api'
import {
  addMembersToClassroom,
  getMembersInClassroom,
  removeMembersFromClassroom,
} from '../../../../apis/classroom.api'
import './style.scss'

const MemberOfClassAdmin = () => {
  const { classId } = useParams()
  const navigate = useNavigate()

  const [allUsers, setAllUsers] = useState([])
  const [classMembers, setClassMembers] = useState([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMemberIds, setSelectedMemberIds] = useState([])

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true)
      const [usersResponse, membersResponse] = await Promise.all([
        getAllUsers(),
        getMembersInClassroom(classId),
      ])
      setAllUsers(usersResponse.data || [])
      setClassMembers(membersResponse.data?.items || [])
    } catch (error) {
      toast.error('Không thể tải dữ liệu thành viên.')
    } finally {
      setLoading(false)
    }
  }, [classId])

  useEffect(() => {
    fetchAllData()
  }, [fetchAllData])

  const availableUsers = useMemo(() => {
    const classMemberIds = new Set(classMembers.map((m) => m.id))
    let available = allUsers.filter((user) => !classMemberIds.has(user.id))

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase()
      available = available.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(lowercasedQuery) ||
          user.studentCode?.includes(lowercasedQuery),
      )
    }
    return available
  }, [allUsers, classMembers, searchQuery])

  const handleSelectionChange = (userId) => {
    setSelectedMemberIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAllAvailable = () => {
    setSelectedMemberIds(availableUsers.map((item) => item.id))
  }

  const handleSelectAllClassMembers = () => {
    setSelectedMemberIds(classMembers.map((m) => m.id))
  }

  const handleAddMembers = async () => {
    if (!classId || selectedMemberIds.length === 0) {
      toast.error('Vui lòng chọn thành viên để thêm vào lớp.')
      return
    }
    const actionToast = toast.loading('Đang thêm thành viên...')
    try {
      const payload = { memberIds: selectedMemberIds }
      await addMembersToClassroom(classId, payload)
      toast.success('Thêm thành viên thành công!', { id: actionToast })
      setSelectedMemberIds([])
      await fetchAllData()
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi thêm thành viên.'
      toast.error(message, { id: actionToast })
    }
  }

  const handleRemoveMembers = async () => {
    if (!classId || selectedMemberIds.length === 0) {
      toast.error('Vui lòng chọn thành viên để xóa khỏi lớp.')
      return
    }
    const actionToast = toast.loading('Đang xóa thành viên...')
    try {
      const payload = { memberIds: selectedMemberIds }
      await removeMembersFromClassroom(classId, payload)
      toast.success('Xóa thành viên thành công!', { id: actionToast })
      setSelectedMemberIds([])
      await fetchAllData()
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi xóa thành viên.'
      toast.error(message, { id: actionToast })
    }
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
          <h3>Quản lý lớp học</h3>
          <i className='fa-solid fa-angles-right'></i>
          <h3>Thêm thành viên</h3>
        </div>
        <div className='member-compet-admin__header'>
          <i
            className='member-compet-admin__back-icon fa-solid fa-arrow-left'
            onClick={() => navigate(`/admin/manage/information/${classId}`)}></i>
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
            <h5>Tên thành viên</h5>
            <h5>Mã sinh viên</h5>
            <h5>Khóa học</h5>
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
          <span onClick={handleSelectAllAvailable}>Chọn tất cả</span>
          <button onClick={handleAddMembers}>Thêm</button>
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
          {/* Right panel search and filter can be added here if needed */}
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
              classMembers.map((item, index) => (
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
                    checked={selectedMemberIds.includes(item.id)}
                    onChange={() => handleSelectionChange(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span onClick={handleSelectAllClassMembers}>Chọn tất cả</span>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfClassAdmin
