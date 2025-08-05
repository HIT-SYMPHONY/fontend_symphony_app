// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import './style.scss'

// const RolusOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()

//   const [information, setInformation] = useState({
//     contextNoProfess: 'jbojklm;... (nội dung giả lập dài)',
//     contextPotoShop: 'jbojklm;... (nội dung giả lập dài)',
//   })

//   const [isEditing, setIsEditing] = useState(false)
//   const [editForm, setEditForm] = useState({ ...information })
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thể lệ')
//   const [classOptions, setClassOptions] = useState([])

//   const dropdownRef = useRef(null)

//   useEffect(() => {
//     if (competitionId) {
//       setClassOptions([
//         {
//           option: 'Giới thiệu',
//           link: `/admin/competitions/${competitionId}`,
//         },
//         {
//           option: 'Thể lệ',
//           link: `/admin/competitions/${competitionId}/rules`,
//         },
//         {
//           option: 'Quản lý cuộc thi',
//           link: `/admin/competitions/${competitionId}/members`,
//         },
//         {
//           option: 'Thông báo',
//           link: `/admin/competitions/${competitionId}/notifications`,
//         },
//       ])
//     }
//   }, [competitionId])

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

//   const handleEditChange = (e) => {
//     const { name, value } = e.target
//     setEditForm((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleEditSubmit = () => {
//     setInformation({ ...editForm })
//     setIsEditing(false)
//   }

//   const handleCancelEdit = () => {
//     setEditForm({ ...information })
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

//   return (
//     <div className='rolus-compet-admin'>
//       <div className='rolus-compet-admin__header'>
//         <i
//           className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition')}></i>

//         <div
//           className='rolus-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-icon'
//           />
//           <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-arrow'
//           />

//           {isDropdownOpen && (
//             <div className='rolus-compet-admin__dropdown'>
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

//         <div className='rolus-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='rolus-compet-admin__search-input'
//           />
//           <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='rolus-compet-admin__create-button'>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='rolus-compet-admin__context'>
//         <div className='rolus-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Thể lệ</h2>
//         </div>

//         <div className='rolus-compet-admin__context-enter'>
//           <span>Phần thi thuật toán chuyên & không chuyên</span>
//           {isEditing ? (
//             <textarea
//               name='contextNoProfess'
//               value={editForm.contextNoProfess}
//               onChange={handleEditChange}
//               className='rolus-compet-admin__context-enter-textarea'
//             />
//           ) : (
//             <h5>{information.contextNoProfess}</h5>
//           )}

//           <span>Phần thi photoshop</span>
//           {isEditing ? (
//             <textarea
//               name='contextPotoShop'
//               value={editForm.contextPotoShop}
//               onChange={handleEditChange}
//               className='rolus-compet-admin__context-enter-textarea'
//             />
//           ) : (
//             <h5>{information.contextPotoShop}</h5>
//           )}
//         </div>

//         <div className='rolus-compet-admin__context-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleEditSubmit}>
//                 <Icon icon='material-symbols:save' width='20' height='20' />
//                 Lưu
//               </button>
//               <button onClick={handleCancelEdit}>
//                 <Icon icon='material-symbols:cancel' width='20' height='20' />
//                 Hủy
//               </button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>
//               <Icon icon='iconamoon:edit-fill' width='20' height='20' />
//               Chỉnh sửa
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RolusOfCompetAdmin

// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
// import './style.scss'

// const RolusOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()

//   const [rule, setRule] = useState('')
//   const [editRule, setEditRule] = useState('')
//   const [isEditing, setIsEditing] = useState(false)
//   const [loading, setLoading] = useState(true)

//   // --- State for header/dropdown (preserved from your original code) ---
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thể lệ')
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

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await getCompetitionById(competitionId)
//       const competitionData = res.data
//       setRule(competitionData.rule || '')
//       setEditRule(competitionData.rule || '')
//     } catch (err) {
//       toast.error('Không thể tải dữ liệu thể lệ cuộc thi.')
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   const handleEditSubmit = async () => {
//     const updateToast = toast.loading('Đang cập nhật thể lệ...')
//     setLoading(true)

//     const payload = {
//       rule: editRule,
//     }

//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

//     try {
//       await updateCompetition(competitionId, formData)
//       toast.success('Cập nhật thành công!', { id: updateToast })
//       setIsEditing(false)
//       await fetchData()
//     } catch (err) {
//       const message = err.response?.data?.message || 'Cập nhật thất bại.'
//       toast.error(message, { id: updateToast })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditRule(rule)
//     setIsEditing(false)
//   }

//   // --- Handlers for header/dropdown ---
//   const handleOption = (item) => {
//     if (item?.link) {
//       setSelectedClass(item.option)
//       setIsDropdownOpen(false)
//       navigate(item.link)
//     }
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

//   if (loading) return <div>Đang tải...</div>

//   return (
//     <div className='rolus-compet-admin'>
//       <div className='rolus-compet-admin__header'>
//         <i
//           className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competitions')}></i>
//         <div
//           className='rolus-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-icon'
//           />
//           <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='rolus-compet-admin__dropdown'>
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
//         <div className='rolus-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='rolus-compet-admin__search-input'
//           />
//           <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button
//           className='rolus-compet-admin__create-button'
//           onClick={() => navigate('/admin/competition/create')}>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='rolus-compet-admin__context'>
//         <div className='rolus-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Thể lệ</h2>
//         </div>

//         <div className='rolus-compet-admin__context-enter'>
//           <span>Nội dung thể lệ</span>
//           {isEditing ? (
//             <textarea
//               name='rule'
//               value={editRule}
//               onChange={(e) => setEditRule(e.target.value)}
//               className='rolus-compet-admin__context-enter-textarea'
//               rows={10} // Give it more space
//             />
//           ) : (
//             <pre className='rolus-compet-admin__context-display'>{rule}</pre>
//           )}
//         </div>

//         <div className='rolus-compet-admin__context-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleEditSubmit} disabled={loading}>
//                 <Icon icon='material-symbols:save' width='20' height='20' />{' '}
//                 {loading ? 'Đang lưu...' : 'Lưu'}
//               </button>
//               <button onClick={handleCancelEdit}>
//                 <Icon icon='material-symbols:cancel' width='20' height='20' /> Hủy
//               </button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>
//               <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RolusOfCompetAdmin

// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
// import './style.scss'

// const RolusOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()

//   const [content, setContent] = useState('')
//   const [editContent, setEditContent] = useState('')
//   const [isEditing, setIsEditing] = useState(false)
//   const [loading, setLoading] = useState(true)

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thể lệ')
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

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const res = await getCompetitionById(competitionId)
//       const competitionData = res.data
//       setContent(competitionData.content || '')
//       setEditContent(competitionData.content || '')
//     } catch (err) {
//       if (err.response?.data?.message) {
//         toast.error(err.response.data.message)
//       } else {
//         toast.error('Không thể tải dữ liệu thể lệ cuộc thi.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   const handleEditSubmit = async () => {
//     const updateToast = toast.loading('Đang cập nhật thể lệ...')
//     setLoading(true)

//     const payload = {
//       content: editContent,
//     }

//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

//     try {
//       await updateCompetition(competitionId, formData)
//       toast.success('Cập nhật thành công!', { id: updateToast })
//       setIsEditing(false)
//       await fetchData()
//     } catch (err) {
//       let errorMessage = 'Cập nhật thất bại.'
//       if (err.response?.data?.message) {
//         const backendMessage = err.response.data.message
//         if (typeof backendMessage === 'object') {
//           errorMessage = Object.values(backendMessage).join('\n')
//         } else {
//           errorMessage = backendMessage
//         }
//       }
//       toast.error(errorMessage, { id: updateToast })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditContent(content)
//     setIsEditing(false)
//   }

//   const handleOption = (item) => {
//     if (item?.link) {
//       setSelectedClass(item.option)
//       setIsDropdownOpen(false)
//       navigate(item.link)
//     }
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

//   if (loading) return <div>Đang tải...</div>

//   return (
//     <div className='rolus-compet-admin'>
//       <div className='rolus-compet-admin__header'>
//         <i
//           className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competitions')}></i>
//         <div
//           className='rolus-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-icon'
//           />
//           <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='rolus-compet-admin__dropdown'>
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
//         <div className='rolus-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='rolus-compet-admin__search-input'
//           />
//           <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button
//           className='rolus-compet-admin__create-button'
//           onClick={() => navigate('/admin/competitions/create')}>
//           <i className='fa-solid fa-plus'></i> Tạo mới
//         </button>
//       </div>

//       <div className='rolus-compet-admin__context'>
//         <div className='rolus-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Thể lệ</h2>
//         </div>

//         <div className='rolus-compet-admin__context-enter'>
//           <span>Nội dung thể lệ</span>
//           {isEditing ? (
//             <textarea
//               name='content'
//               value={editContent}
//               onChange={(e) => setEditContent(e.target.value)}
//               className='rolus-compet-admin__context-enter-textarea'
//               rows={15}
//             />
//           ) : (
//             <pre className='rolus-compet-admin__context-display'>{content}</pre>
//           )}
//         </div>

//         <div className='rolus-compet-admin__context-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleEditSubmit} disabled={loading}>
//                 <Icon icon='material-symbols:save' width='20' height='20' />{' '}
//                 {loading ? 'Đang lưu...' : 'Lưu'}
//               </button>
//               <button onClick={handleCancelEdit}>
//                 <Icon icon='material-symbols:cancel' width='20' height='20' /> Hủy
//               </button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>
//               <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RolusOfCompetAdmin

// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
// import './style.scss'

// const RolusOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams() // Get the ID from the URL

//   // State
//   const [competition, setCompetition] = useState(null) // Holds the full competition object
//   const [editContent, setEditContent] = useState('') // Holds the text being edited
//   const [loading, setLoading] = useState(true)
//   const [isEditing, setIsEditing] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thể lệ')
//   const dropdownRef = useRef(null)

//   const classOptions = [
//     { option: 'Giới thiệu', link: `/admin/competition/${competitionId}/information` },
//     { option: 'Thể lệ', link: `/admin/competition/${competitionId}/rules` },
//     // ... add other options as needed
//   ]

//   // --- Data Fetching ---
//   useEffect(() => {
//     if (!competitionId) return
//     const fetchCompetitionData = async () => {
//       try {
//         setLoading(true)
//         const response = await getCompetitionById(competitionId)
//         const compData = response.data
//         setCompetition(compData)
//         // Assuming rules are stored in the 'content' field
//         setEditContent(compData.content || '')
//       } catch (error) {
//         toast.error(error.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCompetitionData()
//   }, [competitionId])

//   // --- Event Handlers ---
//   const handleSave = async () => {
//     const saveToast = toast.loading('Đang lưu...')

//     const payload = { content: editContent } // We are only updating the 'content' field
//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

//     try {
//       const response = await updateCompetition(competitionId, formData)
//       setCompetition(response.data) // Update the main state with the new data
//       setIsEditing(false)
//       toast.success('Cập nhật thể lệ thành công!', { id: saveToast })
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Lỗi khi cập nhật.', { id: saveToast })
//     }
//   }

//   const handleCancel = () => {
//     setEditContent(competition.content || '') // Revert changes
//     setIsEditing(false)
//   }

//   // Handlers for the dropdown from your original code
//   const handleOption = (item) => {
//     if (item?.link) {
//       setSelectedClass(item.option)
//       navigate(item.link)
//       setIsDropdownOpen(false)
//     }
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

//   if (loading) return <div>Đang tải thể lệ cuộc thi...</div>
//   if (!competition) return <div>Không tìm thấy thông tin cuộc thi.</div>

//   return (
//     <div className='rolus-compet-admin'>
//       <div className='rolus-compet-admin__header'>
//         <i
//           className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition')}></i>
//         <div
//           className='rolus-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-icon'
//           />
//           <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='rolus-compet-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='rolus-compet-admin__dropdown'>
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
//         <div className='rolus-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='rolus-compet-admin__search-input'
//           />
//           <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button className='rolus-compet-admin__create-button'>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='rolus-compet-admin__context'>
//         <div className='rolus-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Thể lệ</h2>
//         </div>

//         {/* This is the part that changes based on your request */}
//         <div className='rolus-compet-admin__context-enter'>
//           {isEditing ? (
//             <textarea
//               name='content'
//               value={editContent}
//               onChange={(e) => setEditContent(e.target.value)}
//               className='rolus-compet-admin__context-enter-textarea'
//               rows={15}
//             />
//           ) : (
//             // Using a <pre> tag helps preserve formatting like newlines from the backend
//             <pre className='rolus-compet-admin__content-display'>{competition.content}</pre>
//           )}
//         </div>

//         <div className='rolus-compet-admin__context-button'>
//           {isEditing ? (
//             <>
//               <button onClick={handleSave}>
//                 <Icon icon='material-symbols:save' width='20' height='20' />
//                 Lưu
//               </button>
//               <button onClick={handleCancel}>
//                 <Icon icon='material-symbols:cancel' width='20' height='20' />
//                 Hủy
//               </button>
//             </>
//           ) : (
//             <button onClick={() => setIsEditing(true)}>
//               <Icon icon='iconamoon:edit-fill' width='20' height='20' />
//               Chỉnh sửa
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RolusOfCompetAdmin

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
import './style.scss'

const RolusOfCompetAdmin = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  // State
  const [competition, setCompetition] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // State for header/dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thể lệ')
  const dropdownRef = useRef(null)
  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competition/${competitionId}/information` },
    { option: 'Thể lệ', link: `/admin/competition/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competition/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competition/${competitionId}/notifications` },
  ]

  // --- Data Fetching ---
  const fetchCompetitionData = useCallback(async () => {
    if (!competitionId) return
    try {
      setLoading(true)
      const response = await getCompetitionById(competitionId)
      const compData = response.data
      setCompetition(compData)
      // Based on your API docs, rules seem to be in the 'content' field.
      // Adjust to 'rule' if that's the correct field name.
      setEditContent(compData.content || '')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
    } finally {
      setLoading(false)
    }
  }, [competitionId])

  useEffect(() => {
    fetchCompetitionData()
  }, [fetchCompetitionData])

  // --- Event Handlers ---
  const handleSave = async () => {
    const saveToast = toast.loading('Đang lưu...')

    // The backend expects all fields in the 'data' part of the FormData.
    // We must send the original data back, with our changes merged in.
    const payload = {
      ...competition, // Start with all original data
      content: editContent, // Override the 'content' with our edits
    }

    // Remove fields the backend doesn't expect on an update
    delete payload.id
    delete payload.status
    delete payload.createdAt

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      await updateCompetition(competitionId, formData)
      toast.success('Cập nhật thành công!', { id: saveToast })
      setIsEditing(false)
      await fetchCompetitionData() // Re-fetch data to show the saved state
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật.', { id: saveToast })
    }
  }

  const handleCancel = () => {
    setEditContent(competition.content || '')
    setIsEditing(false)
  }

  // Dropdown handlers
  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (loading) return <div>Đang tải thể lệ cuộc thi...</div>
  if (!competition) return <div>Không tìm thấy thông tin cuộc thi.</div>

  return (
    <div className='rolus-compet-admin'>
      <div className='rolus-compet-admin__header'>
        <i
          className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition')}></i>
        <div
          className='rolus-compet-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='20'
            height='20'
            className='rolus-compet-admin__filter-icon'
          />
          <div className='rolus-compet-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='rolus-compet-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='rolus-compet-admin__dropdown'>
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
        <div className='rolus-compet-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='rolus-compet-admin__search-input'
          />
          <i className='rolus-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='rolus-compet-admin__create-button'
          onClick={() => navigate('/admin/competition/create')}>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='rolus-compet-admin__context'>
        <div className='rolus-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Thể lệ</h2>
        </div>

        <div className='rolus-compet-admin__context-enter'>
          {isEditing ? (
            <textarea
              name='content'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='rolus-compet-admin__context-enter-textarea'
              rows={15}
            />
          ) : (
            <pre className='rolus-compet-admin__context-display'>{competition.content}</pre>
          )}
        </div>

        <div className='rolus-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button onClick={handleSave}>
                <Icon icon='material-symbols:save' width='20' height='20' />
                Lưu
              </button>
              <button onClick={handleCancel}>
                <Icon icon='material-symbols:cancel' width='20' height='20' />
                Hủy
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default RolusOfCompetAdmin
