// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import { getAllUsers } from '../../../../apis/user.api'
// import './style.scss'

// const CreateOfClassAdmin = () => {
//   const navigate = useNavigate()

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Tất cả')
//   const [classOptions] = useState(['Tất cả', 'Lớp 1', 'Lớp 2', 'Lớp 3'])
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     startTime: '',
//     duration: '',
//     leaderId: '',
//   })
//   const [leaders, setLeaders] = useState([]) // Thêm state để lưu danh sách leader
//   const [error, setError] = useState(null)
//   const dropdownRef = useRef(null)
//   const fileInputRef = useRef(null)

//   // Lấy danh sách leader từ API
//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const response = await getAllUsers() // Gọi API để lấy danh sách user
//         setLeaders(response.data) // Giả định response.data là mảng chứa danh sách user
//       } catch (err) {
//         setError('Không thể lấy danh sách leader. Vui lòng thử lại.')
//       }
//     }
//     fetchLeaders()
//   }, [])

//   // Xử lý click ngoài dropdown
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

//   // Xử lý thay đổi input form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   // Xử lý chọn file ảnh
//   const handleFileChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       setImageFile(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setImagePreview(reader.result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Xử lý submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)

//     try {
//       const payload = {
//         name: formData.name,
//         startTime: formData.startTime,
//         duration: parseInt(formData.duration),
//         leaderId: formData.leaderId,
//       }

//       const formDataToSend = new FormData()
//       formDataToSend.append('payload', JSON.stringify(payload))
//       if (imageFile) {
//         formDataToSend.append('image', imageFile)
//       }

//       // Giả lập gửi FormData (thay bằng API thực tế khi bạn có)
//       console.log('FormData to send:', Object.fromEntries(formDataToSend))
//       alert('Chuẩn bị FormData thành công! Kiểm tra console để xem dữ liệu.')
//       navigate('/admin/manage')
//     } catch (err) {
//       setError('Đã có lỗi xảy ra khi chuẩn bị FormData.')
//     }
//   }

//   return (
//     <div className='create-class-admin'>
//       {error && (
//         <div className='create-class-admin__error' style={{ color: 'red', marginBottom: '10px' }}>
//           {error}
//         </div>
//       )}
//       <div className='create-class-admin__header'>
//         <i
//           className='create-class-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/manage')}></i>

//         <div
//           className='create-class-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='create-class-admin__filter-icon'
//           />
//           <div className='create-class-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='create-class-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='create-class-admin__dropdown'>
//               {classOptions.map((item, index) => (
//                 <div
//                   key={index}
//                   className='create-class-admin__dropdown-item'
//                   onClick={() => handleSelect(item)}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className='create-class-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='create-class-admin__search-input'
//           />
//           <i className='create-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>

//         <button className='create-class-admin__create-button'>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <div className='create-class-admin__content'>
//         <div className='create-class-admin__content-title'>
//           <i className='fa-solid fa-plus'></i>
//           <h3>Tạo lớp học mới</h3>
//         </div>
//         <div className='create-class-admin__content-body'>
//           <form className='create-class-admin__content-body__form' onSubmit={handleSubmit}>
//             <div className='create-class-admin__content-body__form-item'>
//               <div>
//                 <label>Tên lớp học</label>
//                 <input
//                   type='text'
//                   name='name'
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   placeholder='Tên lớp học'
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Leader</label>
//                 <select
//                   className='custom-select-wrapper'
//                   name='leaderId'
//                   value={formData.leaderId}
//                   onChange={handleInputChange}
//                   required>
//                   <option value=''>Chọn leader</option>
//                   {leaders.map((leader) => (
//                     <option key={leader.id} value={leader.id}>
//                       {leader.fullName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             <div className='create-class-admin__content-body__form-table'>
//               <div>
//                 <label>Ngày bắt đầu</label>
//                 <input
//                   type='date'
//                   name='startTime'
//                   value={formData.startTime}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <label>Độ dài lớp học</label>
//                 <input
//                   type='number'
//                   name='duration'
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   placeholder='Độ dài lớp học (tháng)'
//                   required
//                 />
//               </div>
//             </div>

//             <div className='create-class-admin__content-body__form-context'>
//               <div
//                 className='create-class-admin__content-body__form-context-upload'
//                 onClick={() => fileInputRef.current.click()}>
//                 <Icon icon='ic:round-upload' className='upload-icon' width='24' height='24' />
//                 <span>Tải ảnh lên</span>
//                 <input
//                   type='file'
//                   accept='image/*'
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   style={{ display: 'none' }}
//                 />
//               </div>
//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt='Preview'
//                   className='create-class-admin__content-body__preview mt-2'
//                   style={{ maxWidth: '200px', height: 'auto' }}
//                 />
//               )}
//             </div>
//             <div className='create-class-admin__content-button'>
//               <button type='submit'>Tạo</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfClassAdmin

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createClassroom } from '../../../../apis/classroom.api'
import { getAllUsers } from '../../../../apis/user.api'
import './style.scss'

const CreateOfClassAdmin = () => {
  const navigate = useNavigate()
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    duration: '',
    leaderId: '',
  })
  const fileInputRef = useRef(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const fetchLeaders = useCallback(async () => {
    try {
      const response = await getAllUsers()
      const leaderList =
        response.data?.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN') || []
      setLeaders(leaderList)
    } catch (err) {
      toast.error('Không thể tải danh sách leader.')
    }
  }, [])

  useEffect(() => {
    fetchLeaders()
  }, [fetchLeaders])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const createToast = toast.loading('Đang tạo lớp học...')

    const payload = {
      name: formData.name,
      startTime: formData.startTime,
      duration: parseInt(formData.duration),
      leaderId: formData.leaderId,
    }
    const formDataToSend = new FormData()
    formDataToSend.append('data', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
    if (imageFile) {
      formDataToSend.append('image', imageFile)
    }

    try {
      await createClassroom(formDataToSend)
      toast.success('Tạo lớp học thành công!', { id: createToast })
      navigate(-1)
    } catch (err) {
      const message = err.response?.data?.message || 'Tạo lớp học thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: createToast,
      })
    } finally {
      setLoading(false)
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

  return (
    <div className='create-class-admin'>
      <div className='create-class-admin__header'>
        <i
          className='create-class-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/manage')}></i>
        <div
          className='create-class-admin__filter'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={dropdownRef}>
          <Icon
            icon='stash:filter-solid'
            width='28'
            height='28'
            className='create-class-admin__filter-icon'
          />
          <div className='create-class-admin__filter-label'>Tất cả</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='create-class-admin__filter-arrow'
          />
        </div>
        <div className='create-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='create-class-admin__search-input'
          />
          <i className='create-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>
        <button className='create-class-admin__create-button' disabled>
          <i className='fa-solid fa-plus'></i>
          Tạo mới
        </button>
      </div>

      <div className='create-class-admin__content'>
        <div className='create-class-admin__content-title'>
          <i className='fa-solid fa-plus'></i>
          <h3>Tạo lớp học mới</h3>
        </div>
        <div className='create-class-admin__content-body'>
          {/* The form now wraps everything including the button */}
          <form className='create-class-admin__content-body__form' onSubmit={handleSubmit}>
            <div className='div'>
              <div className='create-class-admin__content-body__form-item'>
                <div>
                  <label>Tên lớp học</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Leader</label>
                  <select
                    name='leaderId'
                    value={formData.leaderId}
                    onChange={handleInputChange}
                    required>
                    <option value=''>Chọn leader</option>
                    {leaders.map((leader) => (
                      <option key={leader.id} value={leader.id}>
                        {leader.fullName || leader.username}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='create-class-admin__content-body__form-table'>
                <div>
                  <label>Ngày bắt đầu</label>
                  <input
                    type='date'
                    name='startTime'
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label>Độ dài lớp học (tuần)</label>
                  <input
                    type='number'
                    name='duration'
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className='create-class-admin__content-body__form-context'>
              <div
                className='create-class-admin__content-body__form-context-upload'
                onClick={() => fileInputRef.current.click()}>
                <Icon icon='ic:round-upload' className='upload-icon' width='24' height='24' />
                <span>Tải ảnh lên</span>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='create-class-admin__content-body__preview mt-2'
                />
              )}
            </div>
            {/* The button is now INSIDE the form */}
            <div className='create-class-admin__content-button'>
              <button type='submit' disabled={loading}>
                {loading ? 'Đang tạo...' : 'Tạo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOfClassAdmin
