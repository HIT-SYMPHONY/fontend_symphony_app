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
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompetitionById, updateCompetition } from '../../../../apis/competition.api'
import './style.scss'

const RolusOfCompetAdmin = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams()

  const [rule, setRule] = useState('')
  const [editRule, setEditRule] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // --- State for header/dropdown (preserved from your original code) ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thể lệ')
  const [classOptions, setClassOptions] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (competitionId) {
      setClassOptions([
        { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
        { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
        { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
        { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
      ])
    }
  }, [competitionId])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getCompetitionById(competitionId)
      const competitionData = res.data
      setRule(competitionData.rule || '')
      setEditRule(competitionData.rule || '')
    } catch (err) {
      toast.error('Không thể tải dữ liệu thể lệ cuộc thi.')
    } finally {
      setLoading(false)
    }
  }, [competitionId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleEditSubmit = async () => {
    const updateToast = toast.loading('Đang cập nhật thể lệ...')
    setLoading(true)

    const payload = {
      rule: editRule,
    }

    const formData = new FormData()
    formData.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))

    try {
      await updateCompetition(competitionId, formData)
      toast.success('Cập nhật thành công!', { id: updateToast })
      setIsEditing(false)
      await fetchData()
    } catch (err) {
      const message = err.response?.data?.message || 'Cập nhật thất bại.'
      toast.error(message, { id: updateToast })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditRule(rule)
    setIsEditing(false)
  }

  // --- Handlers for header/dropdown ---
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

  if (loading) return <div>Đang tải...</div>

  return (
    <div className='rolus-compet-admin'>
      <div className='rolus-compet-admin__header'>
        <i
          className='rolus-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competitions')}></i>
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
          <span>Nội dung thể lệ</span>
          {isEditing ? (
            <textarea
              name='rule'
              value={editRule}
              onChange={(e) => setEditRule(e.target.value)}
              className='rolus-compet-admin__context-enter-textarea'
              rows={10} // Give it more space
            />
          ) : (
            <pre className='rolus-compet-admin__context-display'>{rule}</pre>
          )}
        </div>

        <div className='rolus-compet-admin__context-button'>
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

export default RolusOfCompetAdmin
