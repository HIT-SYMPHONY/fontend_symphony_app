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

// import React, { useState, useEffect, useMemo, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getAllUsers } from '../../../../apis/user.api'
// import { addMultipleMembers } from '../../../../apis/competition.api'
// import './style.scss'

// const MemberOfCompetAdmin = () => {
//   const { competitionId } = useParams()
//   const navigate = useNavigate()

//   // --- Data State ---
//   const [allUsers, setAllUsers] = useState([])
//   const [loading, setLoading] = useState(true)

//   // --- UI State (from your original component) ---
//   const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
//   const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
//   const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
//   const [selectedClassRight, setSelectedClassRight] = useState('Tất cả lớp')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [classOptions] = useState(['Tất cả lớp', 'HIT 15', 'HIT 16', 'HIT 17', 'HIT 18'])
//   const [selectedMemberIds, setSelectedMemberIds] = useState([]) // Changed to store IDs for API
//   const [addedMembers, setAddedMembers] = useState([]) // This will be replaced by a new API call
//   const dropdownRefLeft = useRef(null)
//   const dropdownRefRight = useRef(null)

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true)
//         const response = await getAllUsers()
//         setAllUsers(response.data || [])
//       } catch (error) {
//         toast.error('Không thể tải danh sách thành viên.')
//       } finally {
//         setLoading(false)
//       }
//     }
//     // TODO: Also fetch users already in the competition to populate the right panel
//     fetchUsers()
//   }, [])

//   // --- Filtering Logic (Adapted from your original) ---
//   const filteredMembers = useMemo(() => {
//     // This logic should filter from `allUsers`
//     return allUsers.filter(
//       (item) =>
//         (item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.studentCode.includes(searchQuery)) &&
//         (selectedClassLeft === 'Tất cả lớp' || item.intake === selectedClassLeft),
//     )
//   }, [allUsers, searchQuery, selectedClassLeft])

//   // --- Event Handlers (Adapted from your original) ---
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

//   const handleSelectLeft = (item) => setSelectedClassLeft(item)
//   const handleSelectRight = (item) => setSelectedClassRight(item)

//   const handleRadioChange = (userId) => {
//     setSelectedMemberIds((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
//     )
//   }

//   const handleSelectAll = () => {
//     setSelectedMemberIds(filteredMembers.map((item) => item.id))
//   }

//   const handleAddMembers = async () => {
//     if (!competitionId || selectedMemberIds.length === 0) {
//       toast.error('Vui lòng chọn thành viên để thêm.')
//       return
//     }
//     const actionToast = toast.loading('Đang thêm thành viên...')
//     try {
//       const payload = {
//         competitionId: competitionId,
//         userIds: selectedMemberIds,
//       }
//       await addMultipleMembers(payload)
//       toast.success('Thêm thành viên thành công!', { id: actionToast })
//       // Here you would re-fetch the list of members in the competition
//       setSelectedMemberIds([]) // Clear selection
//     } catch (error) {
//       const message = error.response?.data?.message || 'Lỗi khi thêm thành viên.'
//       toast.error(message, { id: actionToast })
//     }
//   }

//   const handleRemoveMembers = () => {
//     // This would trigger a removeMembers API call
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
//           <h3>Quản lý cuộc thi</h3>
//           <i className='fa-solid fa-angles-right'></i>
//           <h3>HIT Contest Series - 2025</h3>
//         </div>
//         <div className='member-compet-admin__header'>
//           <i
//             className='member-compet-admin__back-icon fa-solid fa-arrow-left'
//             onClick={() => navigate(`/admin/competition/${competitionId}/information`)}></i>
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
//               filteredMembers.map((item, index) => (
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
//             {/* This list should be populated by another API call to get members of the competition */}
//             {addedMembers.map((item) => (
//               <div className='member-compet-admin__left-context__list-item' key={item.id}>
//                 <div className='member-compet-admin__left-context__list-item-box'>
//                   <h5 className='member-compet-admin__left-context__list-item-box-h5'>{item.id}</h5>
//                   <h5>{item.fullName}</h5>
//                 </div>
//                 <h5>{item.studentCode}</h5>
//                 <input
//                   type='radio'
//                   checked={selectedMemberIds.includes(item.id)}
//                   onChange={() => handleSelectionChange(item.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className='member-compet-admin__left-button'>
//           <span
//             onClick={() => {
//               /* select all in right panel */
//             }}>
//             Chọn tất cả
//           </span>
//           <button onClick={handleRemoveMembers}>Xóa</button>
//           <button>Tạo chat room</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MemberOfCompetAdmin

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getAllUsers } from '../../../../apis/user.api'
import { addMultipleMembers, getCompetitionById } from '../../../../apis/competition.api' // Import getCompetitionById
import './style.scss'

const MemberOfCompetAdmin = () => {
  const { competitionId } = useParams()
  const navigate = useNavigate()

  const [allUsers, setAllUsers] = useState([])
  const [competitionMembers, setCompetitionMembers] = useState([]) // State for the right panel
  const [loading, setLoading] = useState(true)

  const [isDropdownOpenLeft, setIsDropdownOpenLeft] = useState(false)
  const [isDropdownOpenRight, setIsDropdownOpenRight] = useState(false)
  const [selectedClassLeft, setSelectedClassLeft] = useState('Tất cả lớp')
  const [selectedClassRight, setSelectedClassRight] = useState('Tất cả lớp')
  const [searchQuery, setSearchQuery] = useState('')
  const [classOptions] = useState(['Tất cả lớp', 'K15', 'K16', 'K17', 'K18'])
  const [selectedMemberIds, setSelectedMemberIds] = useState([])
  const dropdownRefLeft = useRef(null)
  const dropdownRefRight = useRef(null)

  const fetchAllData = async () => {
    try {
      setLoading(true)
      // Fetch both lists in parallel for better performance
      const [usersResponse, competitionResponse] = await Promise.all([
        getAllUsers(),
        getCompetitionById(competitionId),
      ])
      setAllUsers(usersResponse.data || [])
      // Assuming the detail response has a 'members' or similar array
      setCompetitionMembers(competitionResponse.data.members || [])
    } catch (error) {
      toast.error('Không thể tải dữ liệu thành viên.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [competitionId])

  const filteredAvailableUsers = useMemo(() => {
    const competitionMemberIds = new Set(competitionMembers.map((m) => m.id))
    let available = allUsers.filter((user) => !competitionMemberIds.has(user.id)) // Show only users NOT in the competition

    if (selectedClassLeft !== 'Tất cả lớp') {
      available = available.filter((user) => user.intake === selectedClassLeft)
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase()
      available = available.filter(
        (user) =>
          user.fullName.toLowerCase().includes(lowercasedQuery) ||
          user.studentCode.includes(lowercasedQuery),
      )
    }
    return available
  }, [allUsers, competitionMembers, searchQuery, selectedClassLeft])

  // Event Handlers
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

  const handleSelectLeft = (item) => setSelectedClassLeft(item)
  const handleSelectRight = (item) => setSelectedClassRight(item)

  const handleSelectionChange = (userId) => {
    setSelectedMemberIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    )
  }

  const handleSelectAll = () => {
    setSelectedMemberIds(filteredAvailableUsers.map((item) => item.id))
  }

  const handleAddMembers = async () => {
    if (!competitionId || selectedMemberIds.length === 0) {
      toast.error('Vui lòng chọn thành viên để thêm.')
      return
    }
    const actionToast = toast.loading('Đang thêm thành viên...')
    try {
      const payload = {
        competitionId: competitionId,
        userIds: selectedMemberIds,
      }
      await addMultipleMembers(payload)
      toast.success('Thêm thành viên thành công!', { id: actionToast })
      setSelectedMemberIds([]) // Clear selection
      await fetchAllData() // Refresh both lists
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi thêm thành viên.'
      toast.error(message, { id: actionToast })
    }
  }

  const handleRemoveMembers = () => {
    toast.info('Chức năng xóa đang được phát triển.')
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
          <h3>Thêm thí sinh</h3>
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
                {classOptions.map((item) => (
                  <div
                    key={item}
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
              filteredAvailableUsers.map((item, index) => (
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
                      type='checkbox' // Changed to checkbox for multi-select
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
          <span onClick={handleSelectAll}>Chọn tất cả</span>
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
            <div className='member-compet-admin__filter-label'>{selectedClassRight}</div>
            <Icon
              icon='mdi:chevron-down'
              width='20'
              height='20'
              className='member-compet-admin__filter-arrow'
            />
            {isDropdownOpenRight && (
              <div className='member-compet-admin__dropdown'>
                {classOptions.map((item) => (
                  <div
                    key={item}
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
              competitionMembers.map((item, index) => (
                <div className='member-compet-admin__left-context__list-item' key={item.id}>
                  <div className='member-compet-admin__left-context__list-item-box'>
                    <h5 className='member-compet-admin__left-context__list-item-box-h5'>
                      {index + 1}
                    </h5>
                    <h5>{item.fullName}</h5>
                  </div>
                  <h5>{item.studentCode}</h5>
                  <input
                    type='checkbox' // Changed to checkbox for multi-select
                    checked={selectedMemberIds.includes(item.id)}
                    onChange={() => handleSelectionChange(item.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className='member-compet-admin__left-button'>
          <span onClick={() => setSelectedMemberIds(competitionMembers.map((m) => m.id))}>
            Chọn tất cả
          </span>
          <button onClick={handleRemoveMembers}>Xóa</button>
          <button>Tạo chat room</button>
        </div>
      </div>
    </div>
  )
}

export default MemberOfCompetAdmin
