// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
// import { getUserById, getAllUsers } from '../../../../apis/user.api' // Import getAllUsers
// import { formatDate } from '../../../../utils/formatters'
// import './style.scss'

// const IntroOfCompetAdmin = () => {
//   const { competitionId } = useParams()
//   const navigate = useNavigate()

//   const [information, setInformation] = useState(null)
//   const [editForm, setEditForm] = useState(null)
//   const [isEditing, setIsEditing] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const [leaders, setLeaders] = useState([])

//   const fileInputRef = useRef(null)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Giới thiệu')
//   const dropdownRef = useRef(null)

//   const classOptions = [
//     { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}/information` },
//     { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
//     { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
//     { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notification` },
//   ]

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true)
//       // Fetch competition data and leader list in parallel for better performance
//       const [competitionRes, usersRes] = await Promise.all([
//         getCompetitionById(competitionId),
//         getAllUsers(),
//       ])

//       const competitionData = competitionRes.data
//       const allUsers = usersRes.data || []

//       const leaderList = allUsers.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN')
//       setLeaders(leaderList)

//       const currentLeader = leaderList.find((l) => l.id === competitionData.competitionLeaderId)

//       const formatted = {
//         name: competitionData.name || '',
//         leader: currentLeader?.fullName || 'Không có leader',
//         competitionLeaderId: competitionData.competitionLeaderId || '',
//         startDay: competitionData.startTime ? competitionData.startTime.split('T')[0] : '',
//         endDay: competitionData.endTime ? competitionData.endTime.split('T')[0] : '',
//         description: competitionData.description || '',
//         content: competitionData.content || '',
//         rule: competitionData.rule || '',
//         image: competitionData.image,
//       }

//       setInformation(formatted)
//       setEditForm(formatted)
//       setPreviewUrl(formatted.image)
//     } catch (err) {
//       toast.error('Không thể tải dữ liệu.')
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false)
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleEditChange = (e) => {
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

//   const handleEditSubmit = async () => {
//     const updateToast = toast.loading('Đang cập nhật...')
//     setLoading(true)

//     const payload = {
//       name: editForm.name,
//       description: editForm.description,
//       content: editForm.content,
//       rule: editForm.rule,
//       startTime: new Date(editForm.startDay).toISOString(),
//       endTime: new Date(editForm.endDay).toISOString(),
//       competitionLeaderId: editForm.competitionLeaderId, // Send the selected leader ID
//     }

//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
//     if (imageFile) {
//       formData.append('image', imageFile)
//     }

//     try {
//       await updateCompetition(competitionId, formData)
//       toast.success('Cập nhật thành công!', { id: updateToast })
//       setIsEditing(false)
//       await fetchData()
//     } catch (err) {
//       const message = err.response?.data?.message || 'Cập nhật thất bại.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: updateToast,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditForm(information)
//     setPreviewUrl(information.image)
//     setImageFile(null)
//     setIsEditing(false)
//   }

//   const handleOption = (item) => {
//     setSelectedClass(item.option)
//     setIsDropdownOpen(false)
//     navigate(item.link)
//   }

//   if (loading && !information) return <div>Đang tải dữ liệu cuộc thi...</div>

//   return (
//     <div className='intro-compet-admin'>
//       <div className='intro-compet-admin__header'>
//         <i
//           className='intro-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competitions')}></i>
//         <div
//           className='intro-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon icon='stash:filter-solid' width='20' height='20' />
//           <div className='intro-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon icon='mdi:chevron-down' width='20' height='20' />
//           {isDropdownOpen && (
//             <div className='intro-compet-admin__dropdown'>
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
//         <div className='intro-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='intro-compet-admin__search-input'
//           />
//           <i className='intro-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button
//           className='intro-compet-admin__create-button'
//           onClick={() => navigate('/admin/competition/create')}>
//           <i className='fa-solid fa-plus'></i> Tạo mới
//         </button>
//       </div>

//       <div className='intro-compet-admin__context'>
//         <div className='intro-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Giới thiệu</h2>
//         </div>

//         <div className='intro-compet-admin__context-enter'>
//           <div className='intro-compet-admin__context-enter__left'>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Tên cuộc thi</span>
//               {isEditing ? (
//                 <input
//                   type='text'
//                   name='name'
//                   value={editForm.name}
//                   onChange={handleEditChange}
//                   className='intro-compet-admin__input'
//                 />
//               ) : (
//                 <h5>{information.name}</h5>
//               )}
//             </div>

//             {/* --- LEADER SELECTION FIX --- */}
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Tên leader</span>
//               {isEditing ? (
//                 <select
//                   name='competitionLeaderId'
//                   value={editForm.competitionLeaderId}
//                   onChange={handleEditChange}
//                   className='intro-compet-admin__input'>
//                   <option value=''>-- Chọn Leader --</option>
//                   {leaders.map((leader) => (
//                     <option key={leader.id} value={leader.id}>
//                       {leader.fullName || leader.username}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <h5>{information.leader}</h5>
//               )}
//             </div>

//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Ngày bắt đầu</span>
//               {isEditing ? (
//                 <input
//                   type='date'
//                   name='startDay'
//                   value={editForm.startDay}
//                   onChange={handleEditChange}
//                   className='intro-compet-admin__input'
//                 />
//               ) : (
//                 <h5>{information.startDay}</h5>
//               )}
//             </div>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Ngày kết thúc</span>
//               {isEditing ? (
//                 <input
//                   type='date'
//                   name='endDay'
//                   value={editForm.endDay}
//                   onChange={handleEditChange}
//                   className='intro-compet-admin__input'
//                 />
//               ) : (
//                 <h5>{information.endDay}</h5>
//               )}
//             </div>
//           </div>
//           <div className='intro-compet-admin__context-enter__right'>
//             <span>Nội dung</span>
//             {isEditing ? (
//               <textarea
//                 name='content'
//                 value={editForm.content}
//                 onChange={handleEditChange}
//                 className='intro-compet-admin__context-enter__right-textarea'
//               />
//             ) : (
//               <h5>{information.content}</h5>
//             )}
//           </div>
//         </div>

//         <div className='intro-compet-admin__context-button'>
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

// export default IntroOfCompetAdmin

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
import { getAllUsers } from '../../../../apis/user.api'
import { formatDate } from '../../../../utils/formatters'
import './style.scss'

const IntroOfCompetAdmin = () => {
  const { competitionId } = useParams()
  const navigate = useNavigate()

  const [information, setInformation] = useState(null)
  const [editForm, setEditForm] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [leaders, setLeaders] = useState([])
  const fileInputRef = useRef(null)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Giới thiệu')
  const dropdownRef = useRef(null)

  const classOptions = [
    { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
    { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
    { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
    { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
  ]

  const processFetchedData = useCallback((competitionData, allUsers) => {
    const leaderList = allUsers.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN')
    setLeaders(leaderList)
    const currentLeader = leaderList.find((l) => l.id === competitionData.competitionLeaderId)

    const formatted = {
      name: competitionData.name || '',
      leaderName: currentLeader?.fullName || 'Chưa có leader',
      competitionLeaderId: competitionData.competitionLeaderId || '',
      startDay: competitionData.startTime ? competitionData.startTime.split('T')[0] : '',
      endDay: competitionData.endTime ? competitionData.endTime.split('T')[0] : '',
      description: competitionData.description || '',
      content: competitionData.content || '',
      rule: competitionData.rule || '',
      image: competitionData.image,
    }

    setInformation(formatted)
    setEditForm(formatted)
    setPreviewUrl(formatted.image)
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [competitionRes, usersRes] = await Promise.all([
        getCompetitionById(competitionId),
        getAllUsers(),
      ])
      // The actual data is nested inside response.data
      processFetchedData(competitionRes.data, usersRes.data)
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Không thể tải dữ liệu cuộc thi.')
      }
      // Navigate away if data can't be loaded
      navigate('/admin/competition')
    } finally {
      setLoading(false)
    }
  }, [competitionId, processFetchedData, navigate])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleEditChange = (e) => {
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

  const handleEditSubmit = async () => {
    const updateToast = toast.loading('Đang cập nhật...')
    setLoading(true)

    const payload = {
      name: editForm.name,
      description: editForm.description,
      content: editForm.content,
      rule: editForm.rule,
      startTime: `${editForm.startDay}T00:00:00Z`,
      endTime: `${editForm.endDay}T23:59:59Z`,
      competitionLeaderId: editForm.competitionLeaderId,
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      const response = await updateCompetition(competitionId, formData)
      const allUsers = await getAllUsers()
      // Reprocess data to ensure consistency
      processFetchedData(response.data, allUsers.data)

      toast.success('Cập nhật thành công!', { id: updateToast })
      setIsEditing(false)
      setImageFile(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: updateToast,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditForm(information)
    setPreviewUrl(information.image)
    setImageFile(null)
    setIsEditing(false)
  }

  const handleOption = (item) => {
    setSelectedClass(item.option)
    setIsDropdownOpen(false)
    navigate(item.link)
  }

  // This guard prevents the component from rendering with null data
  if (loading || !information) {
    return <div>Đang tải dữ liệu cuộc thi...</div>
  }

  return (
    <div className='intro-compet-admin'>
      <div className='intro-compet-admin__header'>
        <i
          className='intro-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competitions')}></i>
        <div
          className='intro-compet-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon icon='stash:filter-solid' width='28' height='28' className='intro-compet-admin__filter-icon' />
          <div className='intro-compet-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='intro-compet-admin__filter-icon'
          />
          {isDropdownOpen && (
            <div className='intro-compet-admin__dropdown'>
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
        <div className='intro-compet-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='intro-compet-admin__search-input'
          />
          <i className='intro-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button
          className='intro-compet-admin__create-button'
          onClick={() => navigate('/admin/competitions/create')}>
          <i className='fa-solid fa-plus'></i> Tạo mới
        </button>
      </div>

      <div className='intro-compet-admin__context'>
        <div className='intro-compet-admin__context-title'>
          <i className='fa-solid fa-circle-info'></i>
          <h2>Giới thiệu</h2>
        </div>
        <div className='intro-compet-admin__context-enter'>
          <div className='intro-compet-admin__context-enter__left'>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên cuộc thi</span>
              {isEditing ? (
                <input
                  type='text'
                  name='name'
                  value={editForm.name}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{information.name}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Tên leader</span>
              {isEditing ? (
                <select
                  name='competitionLeaderId'
                  value={editForm.competitionLeaderId}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'>
                  <option value=''>-- Chọn Leader --</option>
                  {leaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.fullName || leader.username}
                    </option>
                  ))}
                </select>
              ) : (
                <h5>{information.leaderName}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày bắt đầu</span>
              {isEditing ? (
                <input
                  type='date'
                  name='startDay'
                  value={editForm.startDay}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{formatDate(information.startDay)}</h5>
              )}
            </div>
            <div className='intro-compet-admin__context-enter__left-box'>
              <span>Ngày kết thúc</span>
              {isEditing ? (
                <input
                  type='date'
                  name='endDay'
                  value={editForm.endDay}
                  onChange={handleEditChange}
                  className='intro-compet-admin__input'
                />
              ) : (
                <h5>{formatDate(information.endDay)}</h5>
              )}
            </div>
          </div>
          <div className='intro-compet-admin__context-enter__right'>
            <span>Nội dung</span>
            {isEditing ? (
              <textarea
                name='content'
                value={editForm.content}
                onChange={handleEditChange}
                className='intro-compet-admin__context-enter__right-textarea'
              />
            ) : (
              <h5>{information.content}</h5>
            )}
          </div>
        </div>
        <div className='intro-compet-admin__context-button'>
          {isEditing ? (
            <>
              <button onClick={handleEditSubmit} disabled={loading}>
                <Icon icon='material-symbols:save' width='20' height='20' />{' '}
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
              <button onClick={handleCancelEdit}>
                <Icon icon='material-symbols:cancel' width='20' height='20' /> Hủy
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>
              <Icon icon='iconamoon:edit-fill' width='20' height='20' /> Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default IntroOfCompetAdmin

// import React, { useState, useEffect, useRef, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
// import { getAllUsers } from '../../../../apis/user.api'
// import { formatDate } from '../../../../utils/formatters'
// import './style.scss'

// const IntroOfCompetAdmin = () => {
//   const { competitionId } = useParams()
//   const navigate = useNavigate()

//   const [information, setInformation] = useState(null) // Stores the pristine data from the server
//   const [editForm, setEditForm] = useState(null) // Stores the user's edits
//   const [isEditing, setIsEditing] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const fileInputRef = useRef(null)

//   // This function centralizes the logic for setting state from API data
//   const processFetchedData = useCallback((competitionData, allUsers) => {
//     const leaderList = allUsers.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN')
//     setLeaders(leaderList)
//     const currentLeader = leaderList.find((l) => l.id === competitionData.competitionLeaderId)

//     const formatted = {
//       name: competitionData.name || '',
//       leaderName: currentLeader?.fullName || 'Chưa có leader',
//       competitionLeaderId: competitionData.competitionLeaderId || '',
//       // Correctly format datetime-local input values
//       startTime: competitionData.startTime ? competitionData.startTime.slice(0, 16) : '',
//       endTime: competitionData.endTime ? competitionData.endTime.slice(0, 16) : '',
//       description: competitionData.description || '',
//       content: competitionData.content || '',
//       rule: competitionData.rule || '',
//       image: competitionData.image,
//     }

//     setInformation(formatted)
//     setEditForm(formatted)
//     setPreviewUrl(formatted.image)
//   }, [])

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true)
//       const [competitionRes, usersRes] = await Promise.all([
//         getCompetitionById(competitionId),
//         getAllUsers(),
//       ])
//       processFetchedData(competitionRes.data, usersRes.data)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Không thể tải dữ liệu cuộc thi.')
//       navigate('/admin/competition')
//     } finally {
//       setLoading(false)
//     }
//   }, [competitionId, processFetchedData, navigate])

//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   const handleEditChange = (e) => {
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

//   const handleEditSubmit = async () => {
//     const updateToast = toast.loading('Đang cập nhật...')
//     setLoading(true)

//     const payload = {
//       name: editForm.name,
//       description: editForm.description,
//       content: editForm.content,
//       rule: editForm.rule,
//       startTime: new Date(editForm.startTime).toISOString(),
//       endTime: new Date(editForm.endTime).toISOString(),
//       competitionLeaderId: editForm.competitionLeaderId,
//     }

//     const formData = new FormData()
//     formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
//     if (imageFile) {
//       formData.append('image', imageFile)
//     }

//     try {
//       const response = await updateCompetition(competitionId, formData)
//       const allUsers = await getAllUsers()
//       processFetchedData(response.data, allUsers.data)
//       toast.success('Cập nhật thành công!', { id: updateToast })
//       setIsEditing(false)
//       setImageFile(null)
//     } catch (err) {
//       const message = err.response?.data?.message || 'Cập nhật thất bại.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: updateToast,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditForm(information)
//     setPreviewUrl(information.image)
//     setImageFile(null)
//     setIsEditing(false)
//   }

//   // Guard clause to prevent rendering with null data
//   if (loading || !information) {
//     return <div>Đang tải dữ liệu cuộc thi...</div>
//   }

//   return (
//     <div className='intro-compet-admin'>
//       <div className='intro-compet-admin__header'>
//         <i
//           className='intro-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition')}></i>
//         {/* The dropdown and other header elements are removed as they are part of the parent AdminPage layout */}
//       </div>

//       <div className='intro-compet-admin__context'>
//         <div className='intro-compet-admin__context-title'>
//           <i className='fa-solid fa-circle-info'></i>
//           <h2>Giới thiệu</h2>
//         </div>
//         <div className='intro-compet-admin__context-enter'>
//           <div className='intro-compet-admin__context-enter__left'>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Tên cuộc thi</span>
//               {isEditing ? (
//                 <input type='text' name='name' value={editForm.name} onChange={handleEditChange} />
//               ) : (
//                 <h5>{information.name}</h5>
//               )}
//             </div>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Tên leader</span>
//               {isEditing ? (
//                 <select
//                   name='competitionLeaderId'
//                   value={editForm.competitionLeaderId}
//                   onChange={handleEditChange}>
//                   <option value=''>-- Chọn Leader --</option>
//                   {leaders.map((leader) => (
//                     <option key={leader.id} value={leader.id}>
//                       {leader.fullName || leader.username}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <h5>{information.leaderName}</h5>
//               )}
//             </div>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Ngày bắt đầu</span>
//               {isEditing ? (
//                 <input
//                   type='datetime-local'
//                   name='startTime'
//                   value={editForm.startTime}
//                   onChange={handleEditChange}
//                 />
//               ) : (
//                 <h5>{formatDate(information.startTime)}</h5>
//               )}
//             </div>
//             <div className='intro-compet-admin__context-enter__left-box'>
//               <span>Ngày kết thúc</span>
//               {isEditing ? (
//                 <input
//                   type='datetime-local'
//                   name='endTime'
//                   value={editForm.endTime}
//                   onChange={handleEditChange}
//                 />
//               ) : (
//                 <h5>{formatDate(information.endTime)}</h5>
//               )}
//             </div>
//           </div>
//           <div className='intro-compet-admin__context-enter__right'>
//             <span>Nội dung</span>
//             {isEditing ? (
//               <textarea name='content' value={editForm.content} onChange={handleEditChange} />
//             ) : (
//               <h5>{information.content}</h5>
//             )}
//           </div>
//           {/* Image uploader/preview should be here if desired */}
//         </div>
//         <div className='intro-compet-admin__context-button'>
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

// export default IntroOfCompetAdmin
