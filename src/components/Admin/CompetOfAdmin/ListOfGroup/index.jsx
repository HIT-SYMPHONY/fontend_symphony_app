// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { getAllNotifications } from '../../../../apis/notification.api'
// import './style.scss'

// const ListOfGroup = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông báo')
//   const [expandedItems, setExpandedItems] = useState({})
//   const [items, setItems] = useState([])
//   const [classOptions, setClassOptions] = useState([])

//   const dropdownRef = useRef(null)

//   useEffect(() => {
//     if (competitionId) {
//       setClassOptions([
//         { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
//         { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
//         { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
//         { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
//       ])
//     }
//   }, [competitionId])

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const res = await getAllNotifications()
//         if (res.status === 'SUCCESS') {
//           const data = Array.isArray(res.data) ? res.data : [res.data]
//           const transformed = data.map((item, index) => ({
//             id: index + 1,
//             nameTest: item.classRoomName || '---',
//             note: item.content || '---',
//             startDay: new Date(item.createdAt).toLocaleDateString('vi-VN'),
//             creater: item.createdBy || '---',
//           }))
//           setItems(transformed)
//         }
//       } catch (err) {
//         console.error('Lỗi khi lấy thông báo:', err)
//       }
//     }

//     fetchNotifications()
//   }, [])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
//   }

//   const handleOption = (item) => {
//     if (item?.link) {
//       handleSelect(item.option)
//       navigate(item.link)
//     }
//   }

//   const toggleExpand = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }))
//   }

//   const handleDelete = (id) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id))
//     setExpandedItems((prev) => {
//       const newExpanded = { ...prev }
//       delete newExpanded[id]
//       return newExpanded
//     })
//   }

//   return (
//     <div className='list-member-admin'>
//       <div className='list-member-admin__header'>
//         <i
//           className='list-member-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate(`/admin/competitions`)}></i>

//         <div
//           className='list-member-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='list-member-admin__filter-icon'
//           />
//           <div className='list-member-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='list-member-admin__filter-arrow'
//           />

//           {isDropdownOpen && (
//             <div className='list-member-admin__dropdown'>
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

//         <div className='list-member-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='list-member-admin__search-input'
//           />
//           <i className='list-member-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='list-member-admin__create-button' onClick={() => navigate('create')}>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='list-member-admin__context'>
//         <h3>Tất cả thông báo</h3>
//         <div className='list-member-admin__context-table'>
//           <div className='list-member-admin__context-table-title'>
//             <h5>STT</h5>
//             <h5>Cuộc thi</h5>
//             <h5>Tên thông báo</h5>
//             <h5>Ngày tạo</h5>
//             <h5>Người tạo</h5>
//             <h5></h5>
//           </div>

//           <div className='list-member-admin__context-table-list'>
//             {items.map((item) => (
//               <div className='list-member-admin__context-table-list__item' key={item.id}>
//                 <div className='list-member-admin__context-table-list__item-box'>
//                   <h5>{item.id}</h5>
//                   <h5>{item.nameTest}</h5>
//                   <h5>{item.note}</h5>
//                   <h5>{item.startDay}</h5>
//                   <h5>{item.creater}</h5>
//                   <div className='div'>
//                     <i
//                       className={
//                         expandedItems[item.id]
//                           ? 'fa-solid fa-chevron-up div-i'
//                           : 'fa-solid fa-chevron-down div-i'
//                       }
//                       onClick={() => toggleExpand(item.id)}></i>
//                     <i
//                       className='fa-solid fa-trash div-de'
//                       onClick={() => handleDelete(item.id)}></i>
//                   </div>
//                 </div>

//                 {expandedItems[item.id] && (
//                   <>
//                     <hr />
//                     <div className='list-member-admin__context-table-list__item-then'>
//                       <h5>Nội dung:</h5>
//                       <p>{item.note}</p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ListOfGroup

// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getNotificationsByEntityId, deleteNotification } from '../../../../apis/notification.api'
// import { formatDate } from '../../../../utils/formatters'
// import './style.scss'

// const ListOfGroup = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()

//   const [items, setItems] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [expandedItems, setExpandedItems] = useState({})

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông báo')
//   const dropdownRef = useRef(null)

//   // Dynamic classOptions based on the competitionId from the URL
//   const classOptions = [
//     { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
//     { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
//     { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
//     { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
//   ]

//   const fetchNotifications = useCallback(async () => {
//     try {
//       setLoading(true)
//       // Use the correct API to fetch notifications for THIS competition
//       const res = await getNotificationsByEntityId(competitionId)
//       setItems(res.data?.items || [])
//     } catch (err) {
//       if (err.response?.data?.message) {
//         toast.error(err.response.data.message)
//       } else {
//         toast.error('Có lỗi xảy ra khi tải thông báo.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId])

//   useEffect(() => {
//     fetchNotifications()
//   }, [fetchNotifications])

//   const handleDelete = async (notificationId) => {
//     // Add a confirmation dialog for better UX
//     if (!window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
//       return
//     }
//     const deleteToast = toast.loading('Đang xóa...')
//     try {
//       await deleteNotification(notificationId)
//       toast.success('Xóa thông báo thành công!', { id: deleteToast })
//       // Refresh the list after deleting
//       fetchNotifications()
//     } catch (err) {
//       const message = err.response?.data?.message || 'Xóa thất bại.'
//       toast.error(message, { id: deleteToast })
//     }
//   }

//   // --- UI Handlers (unchanged) ---
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
//   }

//   const handleOption = (item) => {
//     if (item?.link) {
//       handleSelect(item.option)
//       navigate(item.link)
//     }
//   }

//   const toggleExpand = (id) => {
//     setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))
//   }

//   return (
//     <div className='list-member-admin'>
//       <div className='list-member-admin__header'>
//         <i
//           className='list-member-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate(`/admin/competition`)}></i>
//         <div
//           className='list-member-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='list-member-admin__filter-icon'
//           />
//           <div className='list-member-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='list-member-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='list-member-admin__dropdown'>
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
//         <div className='list-member-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='list-member-admin__search-input'
//           />
//           <i className='list-member-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button className='list-member-admin__create-button' onClick={() => navigate('create')}>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='list-member-admin__context'>
//         <h3>Tất cả thông báo ({loading ? '...' : items.length})</h3>
//         <div className='list-member-admin__context-table'>
//           <div className='list-member-admin__context-table-title'>
//             <h5>STT</h5>
//             <h5>Lớp học</h5>
//             <h5>Tên thông báo</h5>
//             <h5>Ngày tạo</h5>
//             <h5>Người tạo</h5>
//             <h5></h5>
//           </div>
//           <div className='list-member-admin__context-table-list'>
//             {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}
//             {!loading &&
//               items.map((item, index) => (
//                 <div className='list-member-admin__context-table-list__item' key={item.id}>
//                   <div className='list-member-admin__context-table-list__item-box'>
//                     <h5>{index + 1}</h5>
//                     <h5>{item.classRoomName}</h5>
//                     <h5>{item.content}</h5>
//                     <h5>{formatDate(item.createdAt)}</h5>
//                     <h5>{item.createdBy}</h5>
//                     <div className='div'>
//                       <i
//                         className={
//                           expandedItems[item.id]
//                             ? 'fa-solid fa-chevron-up div-i'
//                             : 'fa-solid fa-chevron-down div-i'
//                         }
//                         onClick={() => toggleExpand(item.id)}></i>
//                       <i
//                         className='fa-solid fa-trash div-de'
//                         onClick={() => handleDelete(item.id)}></i>
//                     </div>
//                   </div>
//                   {expandedItems[item.id] && (
//                     <>
//                       <hr />
//                       <div className='list-member-admin__context-table-list__item-then'>
//                         <h5>Nội dung:</h5>
//                         <p>{item.content}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             {!loading && items.length === 0 && (
//               <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
//                 Chưa có thông báo nào.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ListOfGroup

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getNotificationsByClassId, deleteNotification } from '../../../../apis/notification.api'
import { formatDate } from '../../../../utils/formatters'
import './style.scss'

/**
 * Renders the list of notifications for a specific competition.
 * Allows admins to view, expand, and delete notifications.
 */
const ListOfGroup = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams() // Gets the ID from the URL, e.g., /admin/competition/123/...

  // --- State Management ---
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedItems, setExpandedItems] = useState({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
  const dropdownRef = useRef(null)

  // --- Dynamic Navigation Options ---
  // The dropdown links are dynamically generated using the competitionId from the URL.
  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competition/${competitionId}/information` },
    { option: 'Thể lệ', link: `/admin/competition/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competition/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competition/${competitionId}/notification` },
  ]

  // --- Data Fetching Logic ---
  // useCallback ensures this function is stable and doesn't cause unnecessary re-renders.
  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true)
      // Correctly calls the API to get notifications for THIS specific competition.
      const res = await getNotificationsByClassId(competitionId)
      setItems(res.data?.items || [])
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải thông báo.')
      }
    } finally {
      setLoading(false)
    }
  }, [competitionId])

  // useEffect triggers the data fetch when the component mounts or the ID changes.
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // --- Event Handlers ---
  const handleDelete = async (notificationId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      return
    }
    const deleteToast = toast.loading('Đang xóa...')
    try {
      await deleteNotification(notificationId)
      toast.success('Xóa thông báo thành công!', { id: deleteToast })
      // Refreshes the list to show the change immediately.
      fetchNotifications()
    } catch (err) {
      const message = err.response?.data?.message || 'Xóa thất bại.'
      toast.error(message, { id: deleteToast })
    }
  }

  // Standard hook for handling clicks outside the dropdown to close it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item) => {
    setSelectedClass(item)
    setIsDropdownOpen(false)
  }

  const handleOption = (item) => {
    if (item?.link) {
      handleSelect(item.option)
      navigate(item.link)
    }
  }

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className='list-member-admin'>
      <div className='list-member-admin__header'>
        <i
          className='list-member-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(`/admin/competition`)}></i>
        <div
          className='list-member-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='list-member-admin__filter-icon'
          />
          <div className='list-member-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='list-member-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='list-member-admin__dropdown'>
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
        <div className='list-member-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='list-member-admin__search-input'
          />
          <i className='list-member-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button className='list-member-admin__create-button' onClick={() => navigate('create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='list-member-admin__context'>
        <h3>Tất cả thông báo ({loading ? '...' : items.length})</h3>
        <div className='list-member-admin__context-table'>
          <div className='list-member-admin__context-table-title'>
            <h5>STT</h5>
            <h5>Lớp học</h5>
            <h5>Tên thông báo</h5>
            <h5>Ngày tạo</h5>
            <h5>Người tạo</h5>
            <h5></h5>
          </div>
          <div className='list-member-admin__context-table-list'>
            {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}
            {!loading &&
              items.map((item, index) => (
                <div className='list-member-admin__context-table-list__item' key={item.id}>
                  <div className='list-member-admin__context-table-list__item-box'>
                    <h5>{index + 1}</h5>
                    {/* The API returns classRoomName, which is correct for this context */}
                    <h5>{item.classRoomName}</h5>
                    <h5>{item.content}</h5>
                    <h5>{formatDate(item.createdAt)}</h5>
                    <h5>{item.createdBy}</h5>
                    <div className='div'>
                      <i
                        className={
                          expandedItems[item.id]
                            ? 'fa-solid fa-chevron-up div-i'
                            : 'fa-solid fa-chevron-down div-i'
                        }
                        onClick={() => toggleExpand(item.id)}></i>
                      <i
                        className='fa-solid fa-trash div-de'
                        onClick={() => handleDelete(item.id)}></i>
                    </div>
                  </div>
                  {expandedItems[item.id] && (
                    <>
                      <hr />
                      <div className='list-member-admin__context-table-list__item-then'>
                        <h5>Nội dung:</h5>
                        <p>{item.content}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            {!loading && items.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
                Chưa có thông báo nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOfGroup
