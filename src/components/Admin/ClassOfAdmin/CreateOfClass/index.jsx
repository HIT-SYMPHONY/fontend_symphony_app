// import React, { useState, useRef, useEffect, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { GlobalContext } from '../../../../dataContext'
// import { useNavigate } from 'react-router-dom'
// import { createClassroom, getAllUsers } from '../../../../apis/admin.api'
// import './style.scss'

// const CreateOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const { token } = useContext(GlobalContext)

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Tất cả')
//   const [classOptions] = useState(['Tất cả', 'Lớp 1', 'Lớp 2', 'Lớp 3'])
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const [formData, setFormData] = useState({
//     name: '',
//     startTime: '',
//     duration: '',
//     leaderId: '',
//   })
//   const [error, setError] = useState(null)
//   const dropdownRef = useRef(null)
//   const fileInputRef = useRef(null)

//   // Lấy danh sách leader khi component mount
//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const response = await getAllUsers(token)
//         // Lọc chỉ những user có role là LEADER
//         const leaderData =
//           response.data.filter((leader) => leader.role === 'LEADER' || 'ADMIN') || []
//         setLeaders(leaderData)
//       } catch (err) {
//         setError('Không thể tải danh sách leader')
//       }
//     }
//     fetchLeaders()
//   }, [token])

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

//       const response = await createClassroom(token, formDataToSend)
//       if (response.status === 'SUCCESS') {
//         alert('Tạo lớp học thành công!')
//         navigate('/admin/manage')
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Đã có lỗi xảy ra khi tạo lớp học')
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
//                   classN='custom-select-wrapper'
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
// import React, { useState, useRef, useEffect, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { GlobalContext } from '../../../../dataContext'
// import { useNavigate } from 'react-router-dom'
// import { createClassroom, getAllUsers } from '../../../../apis/admin.api'
// import './style.scss'

// const CreateOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const { token } = useContext(GlobalContext)

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Tất cả')
//   const [classOptions] = useState(['Tất cả', 'Lớp 1', 'Lớp 2', 'Lớp 3'])
//   const [imagePreview, setImagePreview] = useState(null)
//   const [imageFile, setImageFile] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const [selectedLeader, setSelectedLeader] = useState({ id: '', fullName: 'Chọn leader' })
//   const [formData, setFormData] = useState({
//     name: '',
//     startTime: '',
//     duration: '',
//     leaderId: '',
//   })
//   const [error, setError] = useState(null)
//   const dropdownRef = useRef(null)
//   const leaderDropdownRef = useRef(null)
//   const fileInputRef = useRef(null)
//   const [isLeaderDropdownOpen, setIsLeaderDropdownOpen] = useState(false)

//   // Kiểm tra token và lấy danh sách leader khi component mount
//   useEffect(() => {
//     if (!token || token.trim() === '') {
//       alert('Không có token hợp lệ. Vui lòng đăng nhập lại.')
//       setError('Token không tồn tại hoặc không hợp lệ')
//       return
//     }

//     const fetchLeaders = async () => {
//       try {
//         const response = await getAllUsers(token)
//         const leaderData =
//           response.data.filter((leader) => leader.role === 'LEADER' || leader.role === 'ADMIN') ||
//           []
//         if (leaderData.length === 0) {
//           alert('Không có dữ liệu leader để hiển thị trong dropdown.')
//           setError('Không có leader nào được tìm thấy')
//         } else if (!leaderData.every((leader) => leader.id && leader.fullName)) {
//           alert('Dữ liệu leader không hợp lệ (thiếu id hoặc fullName).')
//           setError('Dữ liệu leader không hợp lệ')
//         } else {
//           setLeaders(leaderData)
//         }
//       } catch (err) {
//         alert('Không thể tải danh sách leader: ' + (err.message || 'Lỗi không xác định'))
//         setError('Không thể tải danh sách leader')
//       }
//     }
//     fetchLeaders()
//   }, [token])

//   // Xử lý click ngoài dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//       if (leaderDropdownRef.current && !leaderDropdownRef.current.contains(event.target)) {
//         setIsLeaderDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
//   }

//   const handleLeaderSelect = (leader) => {
//     if (!token || token.trim() === '') {
//       alert('Không thể chọn leader: Token không hợp lệ. Vui lòng đăng nhập lại.')
//       return
//     }
//     if (!leader || !leader.id || !leader.fullName) {
//       alert('Không thể chọn: Dữ liệu leader không hợp lệ.')
//       return
//     }
//     setSelectedLeader(leader)
//     setFormData((prev) => ({ ...prev, leaderId: leader.id }))
//     setIsLeaderDropdownOpen(false)
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

//     if (!token || token.trim() === '') {
//       alert('Không thể tạo lớp học: Token không hợp lệ. Vui lòng đăng nhập lại.')
//       setError('Token không tồn tại hoặc không hợp lệ')
//       return
//     }

//     if (!formData.leaderId) {
//       alert('Vui lòng chọn một leader trước khi tạo lớp học.')
//       setError('Chưa chọn leader')
//       return
//     }

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

//       const response = await createClassroom(token, formDataToSend)
//       if (response.status === 'SUCCESS') {
//         alert('Tạo lớp học thành công!')
//         navigate('/admin/manage')
//       } else {
//         alert('Tạo lớp học thất bại: Phản hồi không hợp lệ từ server.')
//         setError('Phản hồi không hợp lệ từ server')
//       }
//     } catch (err) {
//       alert(
//         'Đã có lỗi xảy ra khi tạo lớp học: ' +
//           (err.response?.data?.message || err.message || 'Lỗi không xác định'),
//       )
//       setError(err.response?.data?.message || 'Đã có lỗi xảy ra khi tạo lớp học')
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
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     handleSelect(item)
//                   }}>
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
//                 <div className='dropdown' ref={leaderDropdownRef}>
//                   <div
//                     className={`selected ${isLeaderDropdownOpen ? 'active' : ''}`}
//                     onClick={() => setIsLeaderDropdownOpen(!isLeaderDropdownOpen)}>
//                     {selectedLeader.fullName}
//                     <Icon
//                       icon='mdi:chevron-down'
//                       width='20'
//                       height='20'
//                       className='dropdown-arrow'
//                     />
//                   </div>
//                   {isLeaderDropdownOpen && (
//                     <ul className='options'>
//                       {leaders.length > 0 ? (
//                         leaders.map((leader) => (
//                           <li
//                             key={leader.id}
//                             data-value={leader.id}
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handleLeaderSelect(leader)
//                             }}>
//                             {leader.fullName}
//                           </li>
//                         ))
//                       ) : (
//                         <li onClick={() => alert('Không có leader để chọn.')}>Không có leader</li>
//                       )}
//                     </ul>
//                   )}
//                 </div>
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
// src/components/CreateOfClassAdmin.js
import React, { useState, useRef, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { Outlet } from 'react-router-dom'
import { GlobalContext } from '../../../../dataContext'
import { useNavigate } from 'react-router-dom'
import { createClassroom, getAllUsers } from '../../../../apis/admin.api'
import './style.scss'

const CreateOfClassAdmin = () => {
  const navigate = useNavigate()
  const { token } = useContext(GlobalContext)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Tất cả')
  const [classOptions] = useState(['Tất cả', 'Lớp 1', 'Lớp 2', 'Lớp 3'])
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [leaders, setLeaders] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    duration: '',
    leaderId: '',
  })
  const [error, setError] = useState(null)
  const dropdownRef = useRef(null)
  const fileInputRef = useRef(null)

  // Lấy danh sách leader khi component mount
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await getAllUsers(token)
        // Lọc chỉ những user có role là LEADER hoặc ADMIN
        const leaderData =
          response.data.filter((leader) => leader.role === 'LEADER' || 'ADMIN') || []
        setLeaders(leaderData)
      } catch (err) {
        setError('Không thể tải danh sách leader')
      }
    }
    fetchLeaders()
  }, [token])

  // Xử lý click ngoài dropdown
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

  // Xử lý thay đổi input form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Xử lý chọn file ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const payload = {
        name: formData.name,
        startTime: formData.startTime,
        duration: parseInt(formData.duration),
        leaderId: formData.leaderId,
      }

      const formDataToSend = new FormData()
      formDataToSend.append('payload', JSON.stringify(payload))
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const response = await createClassroom(token, formDataToSend)
      if (response.status === 'SUCCESS') {
        alert('Tạo lớp học thành công!')
        navigate('/admin/manage')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra khi tạo lớp học')
    }
  }

  return (
    <div className='create-class-admin'>
      {error && (
        <div className='create-class-admin__error' style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
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
            width='20'
            height='20'
            className='create-class-admin__filter-icon'
          />
          <div className='create-class-admin__filter-label'>{selectedClass}</div>
          <Icon
            icon='mdi:chevron-down'
            width='20'
            height='20'
            className='create-class-admin__filter-arrow'
          />
          {isDropdownOpen && (
            <div className='create-class-admin__dropdown'>
              {classOptions.map((item, index) => (
                <div
                  key={index}
                  className='create-class-admin__dropdown-item'
                  onClick={() => handleSelect(item)}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='create-class-admin__search'>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            className='create-class-admin__search-input'
          />
          <i className='create-class-admin__search-icon fa-solid fa-magnifying-glass'></i>
        </div>

        <button className='create-class-admin__create-button'>
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
          <form className='create-class-admin__content-body__form' onSubmit={handleSubmit}>
            <div className='create-class-admin__content-body__form-item'>
              <div>
                <label>Tên lớp học</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Tên lớp học'
                  required
                />
              </div>
              <div>
                <label>Leader</label>
                <select
                  className='custom-select-wrapper'
                  name='leaderId'
                  value={formData.leaderId}
                  onChange={handleInputChange}
                  required>
                  <option value=''>Chọn leader</option>
                  {leaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.fullName}
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
                <label>Độ dài lớp học</label>
                <input
                  type='number'
                  name='duration'
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder='Độ dài lớp học (tháng)'
                  required
                />
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
                  style={{ maxWidth: '200px', height: 'auto' }}
                />
              )}
            </div>
            <div className='create-class-admin__content-button'>
              <button type='submit'>Tạo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOfClassAdmin
