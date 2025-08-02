// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import './style.scss'

// const CreateOfMess = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông báo')
//   const [classOptions, setClassOptions] = useState([
//     {
//       option: 'Giới thiệu',
//       link: '/admin/competition/information',
//     },
//     {
//       option: 'Thể lệ',
//       link: '/admin/competition/rules',
//     },
//     {
//       option: 'Quản lý cuộc thi',
//       link: '/admin/competition/memberofcompetition',
//     },
//     {
//       option: 'Thông báo',
//       link: '/admin/competition/notification',
//     },
//   ])

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
//   const dropdownRef = useRef(null)

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
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
//     <div className='mess'>
//       <div className='mess__header'>
//         <i
//           className='mess__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition/{competitionId}/notifications')}></i>

//         <div
//           className='mess__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon icon='stash:filter-solid' width='20' height='20' className='mess__filter-icon' />
//           <div className='mess__filter-label'>{selectedClass}</div>
//           <Icon icon='mdi:chevron-down' width='20' height='20' className='mess__filter-arrow' />

//           {isDropdownOpen && (
//             <div className='mess__dropdown'>
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

//         <div className='mess__search'>
//           <input type='text' placeholder='Tìm kiếm...' className='mess__search-input' />
//           <i className='mess__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='mess__create-button'>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>
//       <div className='mess__context'>
//         <div className='mess__context-title'>
//           <Icon
//             icon='mingcute:notification-newdot-fill'
//             width='30px'
//             height='30px'
//             className='mess__context-title-icon'
//           />
//           <h3>Thông báo</h3>
//         </div>
//         <div className='mess__context-nodung'>
//           <span>Tên thông báo</span>
//           <input type='text' />
//           <span>Nội dung</span>
//           <textarea name='' id='' className='mess__context-nodung-textarea'></textarea>
//         </div>
//         <div className='mess__context-button'>
//           <button>Tạo</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfMess

// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { createNotification } from '../../../../apis/notification.api'
// import './style.scss'

// const CreateOfMess = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams() // Get the ID from the dynamic route

//   // --- Form State ---
//   const [formData, setFormData] = useState({ title: '', content: '' })
//   const [loading, setLoading] = useState(false)

//   // --- Dropdown/Header State (preserved from your original component) ---
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông báo')
//   const [classOptions, setClassOptions] = useState([])
//   const dropdownRef = useRef(null)

//   useEffect(() => {
//     // Update navigation links to be dynamic based on the competitionId
//     if (competitionId) {
//       setClassOptions([
//         { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}/information` },
//         { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
//         { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
//         { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
//       ])
//     }
//   }, [competitionId])

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async () => {
//     if (!formData.content) {
//       toast.error('Nội dung thông báo không được để trống.')
//       return
//     }
//     setLoading(true)
//     const creationToast = toast.loading('Đang tạo thông báo...')

//     try {
//       // The API expects 'content' and 'classRoomId'.
//       // We map our form's 'content' and the URL's 'competitionId' to these fields.
//       const payload = {
//         content: formData.content,
//         classRoomId: competitionId,
//       }
//       await createNotification(payload)
//       toast.success('Tạo thông báo thành công!', { id: creationToast })
//       navigate(`/admin/competitions/${competitionId}/notifications`) // Navigate back to the list
//     } catch (error) {
//       const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo thông báo.'
//       toast.error(message, { id: creationToast })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleOption = (item) => {
//     if (item?.link) {
//       setSelectedClass(item.option)
//       setIsDropdownOpen(false)
//       navigate(item.link)
//     }
//   }

//   return (
//     <div className='mess'>
//       <div className='mess__header'>
//         <i
//           className='mess__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate(`/admin/competitions/${competitionId}/notifications`)}></i>

//         <div
//           className='mess__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon icon='stash:filter-solid' width='20' height='20' className='mess__filter-icon' />
//           <div className='mess__filter-label'>{selectedClass}</div>
//           <Icon icon='mdi:chevron-down' width='20' height='20' className='mess__filter-arrow' />
//           {isDropdownOpen && (
//             <div className='mess__dropdown'>
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

//         <div className='mess__search'>
//           <input type='text' placeholder='Tìm kiếm...' className='mess__search-input' />
//           <i className='mess__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='mess__create-button' disabled>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>
//       <div className='mess__context'>
//         <div className='mess__context-title'>
//           <Icon
//             icon='mingcute:notification-newdot-fill'
//             width='30px'
//             height='30px'
//             className='mess__context-title-icon'
//           />
//           <h3>Thông báo</h3>
//         </div>
//         <div className='mess__context-nodung'>
//           {/* Note: API does not have a 'title' field, but we keep the input for your HTML structure */}
//           <span>Tên thông báo</span>
//           <input type='text' name='title' value={formData.title} onChange={handleInputChange} />
//           <span>Nội dung</span>
//           <textarea
//             name='content'
//             id='content'
//             value={formData.content}
//             onChange={handleInputChange}
//             className='mess__context-nodung-textarea'></textarea>
//         </div>
//         <div className='mess__context-button'>
//           <button onClick={handleSubmit} disabled={loading}>
//             {loading ? 'Đang tạo...' : 'Tạo'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfMess

import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createNotification } from '../../../../apis/notification.api'
import './style.scss'

const CreateOfMess = () => {
  const navigate = useNavigate()
  const { competitionId } = useParams() // Lấy ID từ route động

  // --- Trạng thái của Form ---
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)

  // --- Trạng thái của Dropdown/Header ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Thông báo')
  const [classOptions, setClassOptions] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Cập nhật các link điều hướng để trở nên động dựa trên competitionId
    if (competitionId) {
      setClassOptions([
        { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}/information` },
        { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
        { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
        { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
      ])
    }
  }, [competitionId])

  useEffect(() => {
    // Xử lý việc click ra ngoài để đóng dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.content) {
      toast.error('Nội dung thông báo không được để trống.')
      return
    }
    setLoading(true)
    const creationToast = toast.loading('Đang tạo thông báo...')

    try {
      // Payload được gửi đi để tạo thông báo
      const payload = {
        content: formData.content,
        // Sửa lại key cho đúng với yêu cầu của API (đã check bằng Postman)
        competitionId: competitionId, // <-- ĐÂY LÀ DÒNG ĐÃ SỬA
      }
      await createNotification(payload)
      toast.success('Tạo thông báo thành công!', { id: creationToast })
      navigate(`/admin/competitions/${competitionId}/notifications`) // Điều hướng về trang danh sách
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo thông báo.'
      toast.error(message, { id: creationToast })
    } finally {
      setLoading(false)
    }
  }

  const handleOption = (item) => {
    if (item?.link) {
      setSelectedClass(item.option)
      setIsDropdownOpen(false)
      navigate(item.link)
    }
  }

  return (
    <div className='mess'>
      <div className='mess__header'>
        <i
          className='mess__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate(`/admin/competitions/${competitionId}/notifications`)}></i>

        <div
          className='mess__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon icon='stash:filter-solid' width='20' height='20' className='mess__filter-icon' />
          <div className='mess__filter-label'>{selectedClass}</div>
          <Icon icon='mdi:chevron-down' width='20' height='20' className='mess__filter-arrow' />
          {isDropdownOpen && (
            <div className='mess__dropdown'>
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

        <div className='mess__search'>
          <input type='text' placeholder='Tìm kiếm...' className='mess__search-input' />
          <i className='mess__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='mess__create-button' disabled>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>
      <div className='mess__context'>
        <div className='mess__context-title'>
          <Icon
            icon='mingcute:notification-newdot-fill'
            width='30px'
            height='30px'
            className='mess__context-title-icon'
          />
          <h3>Thông báo</h3>
        </div>
        <div className='mess__context-nodung'>
          {/* Ghi chú: API không có trường 'title', nhưng vẫn giữ input cho cấu trúc HTML */}
          <span>Tên thông báo</span>
          <input type='text' name='title' value={formData.title} onChange={handleInputChange} />
          <span>Nội dung</span>
          <textarea
            name='content'
            id='content'
            value={formData.content}
            onChange={handleInputChange}
            className='mess__context-nodung-textarea'></textarea>
        </div>
        <div className='mess__context-button'>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfMess
