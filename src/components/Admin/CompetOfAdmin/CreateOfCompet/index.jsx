// import React, { useState, useEffect, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { createCompetition } from '../../../../apis/competition.api'
// import { getAllUsers } from '../../../../apis/user.api'
// import './style.scss'

// const CreateOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     name: '',
//     startTime: '',
//     endTime: '',
//     description: '',
//     content: '',
//     rule: '',
//   })
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const [selectedLeaderId, setSelectedLeaderId] = useState('')
//   const [loading, setLoading] = useState(false)
//   const fileInputRef = useRef(null)
//   const dropdownRef = useRef(null)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Tất cả lớp')
//   const [classOptions] = useState(['Tất cả lớp', 'Lớp 10A', 'Lớp 11B', 'Lớp 12C'])

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getAllUsers()
//         const leaderData =
//           res.data?.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN') || []
//         setLeaders(leaderData)
//       } catch (err) {
//         toast.error('Không thể tải danh sách leader.')
//       }
//     }
//     fetchLeaders()
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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!formData.name || !formData.startTime || !formData.endTime) {
//       toast.error('Vui lòng điền đầy đủ các trường bắt buộc!')
//       return
//     }
//     setLoading(true)

//     // --- THE FIX IS HERE ---
//     const competitionData = {
//       name: formData.name,
//       description: formData.description,
//       content: formData.content,
//       rule: formData.rule,
//       startTime: new Date(formData.startTime).toISOString(),
//       endTime: new Date(formData.endTime).toISOString(),
//       // Use the correct key 'competitionLeaderId' as shown in Postman
//       competitionLeaderId: selectedLeaderId,
//     }

//     const payload = new FormData()
//     payload.append(
//       'data',
//       new Blob([JSON.stringify(competitionData)], { type: 'application/json' }),
//     )
//     if (imageFile) {
//       payload.append('image', imageFile)
//     }

//     const creationToast = toast.loading('Đang tạo cuộc thi...')
//     try {
//       await createCompetition(payload)
//       toast.success('Tạo cuộc thi thành công!', { id: creationToast })
//       navigate('/admin/competitions')
//     } catch (err) {
//       const message = err.response?.data?.message || 'Tạo cuộc thi thất bại.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: creationToast,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSelect = (item) => {
//     setSelectedClass(item)
//     setIsDropdownOpen(false)
//   }

//   return (
//     <div className='create-compet-admin'>
//       <div className='create-compet-admin__header'>
//         <i
//           className='create-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition')}
//         />
//         <div
//           className='create-compet-admin__filter'
//           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//           ref={dropdownRef}>
//           <Icon
//             icon='stash:filter-solid'
//             width='20'
//             height='20'
//             className='create-compet-admin__filter-icon'
//           />
//           <div className='create-compet-admin__filter-label'>{selectedClass}</div>
//           <Icon
//             icon='mdi:chevron-down'
//             width='20'
//             height='20'
//             className='create-compet-admin__filter-arrow'
//           />
//           {isDropdownOpen && (
//             <div className='create-compet-admin__dropdown'>
//               {classOptions.map((item, index) => (
//                 <div
//                   key={index}
//                   className='create-compet-admin__dropdown-item'
//                   onClick={() => handleSelect(item)}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className='create-compet-admin__search'>
//           <input
//             type='text'
//             placeholder='Tìm kiếm...'
//             className='create-compet-admin__search-input'
//           />
//           <i className='create-compet-admin__search-icon fa-solid fa-magnifying-glass'></i>
//         </div>
//         <button className='create-compet-admin__create-button'>
//           <i className='fa-solid fa-plus'></i> Tạo mới
//         </button>
//       </div>

//       <div className='create-compet-admin__context'>
//         <div className='create-compet-admin__context-title'>
//           <i className='fa-solid fa-plus'></i>
//           <h2>Tạo cuộc thi</h2>
//         </div>

//         <form className='create-compet-admin__context-enter' onSubmit={handleSubmit}>
//           <div className='create-compet-admin__context-enter__left'>
//             <span>Tên cuộc thi</span>
//             <input
//               type='text'
//               name='name'
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//             <div className='create-compet-admin__context-enter__left-time'>
//               <div>
//                 <span>Ngày bắt đầu</span>
//                 <input
//                   type='datetime-local'
//                   name='startTime'
//                   value={formData.startTime}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <span>Ngày kết thúc</span>
//                 <input
//                   type='datetime-local'
//                   name='endTime'
//                   value={formData.endTime}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//             <span>Ảnh bìa cuộc thi</span>
//             <div
//               className='create-compet-admin__context-enter__left-upload'
//               onClick={() => fileInputRef.current.click()}>
//               <Icon icon='ic:round-upload' className='upload-icon' />
//               <span>Tải ảnh lên</span>
//               <input
//                 type='file'
//                 accept='image/*'
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
//             </div>
//             {previewUrl && (
//               <img
//                 src={previewUrl}
//                 alt='Ảnh bìa'
//                 className='create-compet-admin__context-enter__left-upload-preview'
//               />
//             )}
//             <span>Giới thiệu</span>
//             <textarea
//               name='description'
//               placeholder='Nhập nội dung'
//               value={formData.description}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__left-textarea'></textarea>
//           </div>

//           <div className='create-compet-admin__context-enter__right'>
//             <span>Leader (Phụ trách)</span>
//             <select value={selectedLeaderId} onChange={(e) => setSelectedLeaderId(e.target.value)}>
//               <option value=''>-- Chọn Leader --</option>
//               {leaders.map((leader) => (
//                 <option key={leader.id} value={leader.id}>
//                   {leader.fullName || leader.username}
//                 </option>
//               ))}
//             </select>

//             <span>Thể lệ</span>
//             <textarea
//               name='rule'
//               placeholder='Nhập thể lệ cuộc thi'
//               value={formData.rule}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__right-textarea'></textarea>

//             <span>Nội dung</span>
//             <textarea
//               name='content'
//               placeholder='Nhập nội dung chi tiết cuộc thi'
//               value={formData.content}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__right-textarea'></textarea>
//           </div>
//         </form>
//         <div className='create-compet-admin__context-button'>
//           <button type='submit' disabled={loading}>
//             {loading ? 'Đang tạo...' : 'Tạo'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfCompetAdmin

// import React, { useState, useEffect, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { createCompetition } from '../../../../apis/competition.api'
// import { getAllUsers } from '../../../../apis/user.api'
// import './style.scss'

// const CreateOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     rule: '',
//     content: '',
//     startTime: '',
//     endTime: '',
//   })
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const [leaders, setLeaders] = useState([])
//   const [selectedLeaderId, setSelectedLeaderId] = useState('')
//   const [loading, setLoading] = useState(false)
//   const fileInputRef = useRef(null)

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getAllUsers()
//         // The user list is in `res.data`
//         const leaderData =
//           res.data?.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN') || []
//         setLeaders(leaderData)
//       } catch (err) {
//         toast.error('Không thể tải danh sách leader.')
//       }
//     }
//     fetchLeaders()
//   }, [])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setImageFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!formData.name || !formData.startTime || !formData.endTime || !selectedLeaderId) {
//       toast.error('Vui lòng điền đầy đủ các trường bắt buộc (Tên, Leader, Thời gian)!')
//       return
//     }
//     setLoading(true)

//     // --- Data Payload Construction ---
//     // This object now perfectly matches your Postman request body for the 'data' part.
//     const competitionData = {
//       name: formData.name,
//       description: formData.description,
//       rule: formData.rule,
//       content: formData.content,
//       startTime: new Date(formData.startTime).toISOString(),
//       endTime: new Date(formData.endTime).toISOString(),
//       competitionLeaderId: selectedLeaderId, // Using the correct key from Postman
//     }

//     const payload = new FormData()
//     payload.append(
//       'data',
//       new Blob([JSON.stringify(competitionData)], { type: 'application/json' }),
//     )
//     if (imageFile) {
//       payload.append('image', imageFile)
//     }

//     const creationToast = toast.loading('Đang tạo cuộc thi...')
//     try {
//       await createCompetition(payload)
//       toast.success('Tạo cuộc thi thành công!', { id: creationToast })
//       navigate('/admin/competitions') // Navigate back to the competition list
//     } catch (err) {
//       const message = err.response?.data?.message || 'Tạo cuộc thi thất bại.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: creationToast,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='create-compet-admin'>
//       {/* The header is mostly static UI, so it remains unchanged */}
//       <div className='create-compet-admin__header'>
//         <i
//           className='create-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competition')}
//         />
//         {/* ... other header elements ... */}
//         <button className='create-compet-admin__create-button' onClick={handleSubmit}>
//           <i className='fa-solid fa-plus'></i> Tạo mới
//         </button>
//       </div>

//       <div className='create-compet-admin__context'>
//         <div className='create-compet-admin__context-title'>
//           <i className='fa-solid fa-plus'></i>
//           <h2>Tạo cuộc thi</h2>
//         </div>

//         {/* The form now calls the handleSubmit function */}
//         <form className='create-compet-admin__context-enter' onSubmit={handleSubmit}>
//           <div className='create-compet-admin__context-enter__left'>
//             <span>Tên cuộc thi</span>
//             <input
//               type='text'
//               name='name'
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//             />
//             <div className='create-compet-admin__context-enter__left-time'>
//               <div>
//                 <span>Ngày bắt đầu</span>
//                 <input
//                   type='datetime-local'
//                   name='startTime'
//                   value={formData.startTime}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <span>Ngày kết thúc</span>
//                 <input
//                   type='datetime-local'
//                   name='endTime'
//                   value={formData.endTime}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//             <span>Ảnh bìa cuộc thi</span>
//             <div
//               className='create-compet-admin__context-enter__left-upload'
//               onClick={() => fileInputRef.current.click()}>
//               <Icon icon='ic:round-upload' className='upload-icon' />
//               <span>Tải ảnh lên</span>
//               <input
//                 type='file'
//                 accept='image/*'
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
//             </div>
//             {previewUrl && (
//               <img
//                 src={previewUrl}
//                 alt='Ảnh bìa'
//                 className='create-compet-admin__context-enter__left-upload-preview'
//               />
//             )}
//             <span>Giới thiệu</span>
//             <textarea
//               name='description'
//               placeholder='Nhập nội dung'
//               value={formData.description}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__left-textarea'></textarea>
//           </div>

//           <div className='create-compet-admin__context-enter__right'>
//             <span>Leader (Phụ trách)</span>
//             <select
//               value={selectedLeaderId}
//               onChange={(e) => setSelectedLeaderId(e.target.value)}
//               required>
//               <option value='' disabled>
//                 -- Chọn Leader --
//               </option>
//               {leaders.map((leader) => (
//                 <option key={leader.id} value={leader.id}>
//                   {leader.fullName || leader.username}
//                 </option>
//               ))}
//             </select>
//             <span>Thể lệ</span>
//             <textarea
//               name='rule'
//               placeholder='Nhập thể lệ cuộc thi'
//               value={formData.rule}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__right-textarea'></textarea>
//             <span>Nội dung</span>
//             <textarea
//               name='content'
//               placeholder='Nhập nội dung chi tiết cuộc thi'
//               value={formData.content}
//               onChange={handleInputChange}
//               className='create-compet-admin__context-enter__right-textarea'></textarea>
//           </div>
//         </form>
//         <div className='create-compet-admin__context-button'>
//           {/* The button is now tied to the form's submit event */}
//           <button
//             type='submit'
//             form='create-competition-form'
//             onClick={handleSubmit}
//             disabled={loading}>
//             {loading ? 'Đang tạo...' : 'Tạo'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfCompetAdmin

import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createCompetition } from '../../../../apis/competition.api'
import { getAllUsers } from '../../../../apis/user.api'
import './style.scss'

const CreateOfCompetAdmin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rule: '',
    content: '',
    startTime: '',
    endTime: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [leaders, setLeaders] = useState([])
  const [selectedLeaderId, setSelectedLeaderId] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await getAllUsers()
        const leaderData =
          res.data?.filter((user) => user.role === 'LEADER' || user.role === 'ADMIN') || []
        setLeaders(leaderData)
      } catch (err) {
        toast.error('Không thể tải danh sách leader.')
      }
    }
    fetchLeaders()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.startTime || !formData.endTime || !selectedLeaderId) {
      toast.error('Vui lòng điền đầy đủ Tên, Leader, và Thời gian bắt đầu/kết thúc!')
      return
    }
    setLoading(true)

    const competitionData = {
      name: formData.name,
      description: formData.description,
      rule: formData.rule,
      content: formData.content,
      startTime: new Date(formData.startTime).toISOString(),
      endTime: new Date(formData.endTime).toISOString(),
      competitionLeaderId: selectedLeaderId,
    }

    const payload = new FormData()
    payload.append(
      'data',
      new Blob([JSON.stringify(competitionData)], { type: 'application/json' }),
    )
    if (imageFile) {
      payload.append('image', imageFile)
    }

    const creationToast = toast.loading('Đang tạo cuộc thi...')
    try {
      await createCompetition(payload)
      toast.success('Tạo cuộc thi thành công!', { id: creationToast })
      navigate('/admin/competitions')
    } catch (err) {
      const message = err.response?.data?.message || 'Tạo cuộc thi thất bại.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='create-compet-admin'>
      <div className='create-compet-admin__header'>
        <i
          className='create-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competitions')}
        />
        {/* The filter and search bar are not needed on a 'create' page, so they are removed. */}
        <button className='create-compet-admin__create-button' onClick={handleSubmit}>
          <i className='fa-solid fa-plus'></i> Tạo mới
        </button>
      </div>

      <div className='create-compet-admin__context'>
        <div className='create-compet-admin__context-title'>
          <i className='fa-solid fa-plus'></i>
          <h2>Tạo cuộc thi</h2>
        </div>

        {/* Give the form an ID to link the footer button to it */}
        <form
          id='competition-form'
          className='create-compet-admin__context-enter'
          onSubmit={handleSubmit}>
          <div className='create-compet-admin__context-enter__left'>
            <span>Tên cuộc thi</span>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <div className='create-compet-admin__context-enter__left-time'>
              <div>
                <span>Ngày bắt đầu</span>
                <input
                  type='datetime-local'
                  name='startTime'
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <span>Ngày kết thúc</span>
                <input
                  type='datetime-local'
                  name='endTime'
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <span>Ảnh bìa cuộc thi</span>
            <div
              className='create-compet-admin__context-enter__left-upload'
              onClick={() => fileInputRef.current.click()}>
              <Icon icon='ic:round-upload' className='upload-icon' />
              <span>Tải ảnh lên</span>
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt='Ảnh bìa'
                className='create-compet-admin__context-enter__left-upload-preview'
              />
            )}
            <span>Giới thiệu</span>
            <textarea
              name='description'
              placeholder='Nhập nội dung'
              value={formData.description}
              onChange={handleInputChange}
              className='create-compet-admin__context-enter__left-textarea'></textarea>
          </div>

          <div className='create-compet-admin__context-enter__right'>
            <span>Leader (Phụ trách)</span>
            <select
              value={selectedLeaderId}
              onChange={(e) => setSelectedLeaderId(e.target.value)}
              required>
              <option value='' disabled>
                -- Chọn Leader --
              </option>
              {leaders.map((leader) => (
                <option key={leader.id} value={leader.id}>
                  {leader.fullName || leader.username}
                </option>
              ))}
            </select>
            <span>Thể lệ</span>
            <textarea
              name='rule'
              placeholder='Nhập thể lệ cuộc thi'
              value={formData.rule}
              onChange={handleInputChange}
              className='create-compet-admin__context-enter__right-textarea'></textarea>
            <span>Nội dung</span>
            <textarea
              name='content'
              placeholder='Nhập nội dung chi tiết cuộc thi'
              value={formData.content}
              onChange={handleInputChange}
              className='create-compet-admin__context-enter__right-textarea'></textarea>
          </div>
        </form>
        <div className='create-compet-admin__context-button'>
          {/* This button now correctly submits the form */}
          <button type='submit' form='competition-form' disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateOfCompetAdmin
