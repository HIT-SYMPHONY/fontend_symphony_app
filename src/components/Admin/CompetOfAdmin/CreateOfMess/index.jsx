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

// import React, { useState, useEffect, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate, useParams } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { createNotification } from '../../../../apis/notification.api'
// import './style.scss'

// const CreateOfMess = () => {
//   const navigate = useNavigate()
//   const { competitionId } = useParams()

//   const [content, setContent] = useState('') // Simplified state for just the content
//   const [loading, setLoading] = useState(false)

//   // Header/Dropdown state
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Thông báo')
//   const dropdownRef = useRef(null)
//   const classOptions = [
//     { option: 'Giới thiệu', link: `/admin/competitions/${competitionId}` },
//     { option: 'Thể lệ', link: `/admin/competitions/${competitionId}/rules` },
//     { option: 'Quản lý cuộc thi', link: `/admin/competitions/${competitionId}/members` },
//     { option: 'Thông báo', link: `/admin/competitions/${competitionId}/notifications` },
//   ]

//   // Effect for closing the dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleSubmit = async () => {
//     if (!content.trim()) {
//       toast.error('Nội dung thông báo không được để trống.')
//       return
//     }
//     setLoading(true)
//     const creationToast = toast.loading('Đang tạo thông báo...')

//     try {
//       // The payload matches your Postman screenshot perfectly
//       const payload = {
//         content: content,
//         classRoomId: null, // As per the screenshot, this is null for competitions
//         competitionId: competitionId,
//       }
//       await createNotification(payload)
//       toast.success('Tạo thông báo thành công!', { id: creationToast })
//       // Navigate back to the list of notifications for this competition
//       navigate(`/admin/competitions/${competitionId}/notifications`)
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
//           <h3>Tạo thông báo mới</h3>
//         </div>
//         <div className='mess__context-nodung'>
//           <span>Nội dung</span>
//           <textarea
//             name='content'
//             id='content'
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className='mess__context-nodung-textarea'
//             placeholder='Nhập nội dung thông báo...'
//             rows={10}></textarea>
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

// import React, { useState, useEffect, useRef } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { competitionCreationSchema } from '../../../../utils/competitionValidate.js'
// import { createCompetition, getAllUsers } from '../../../../apis/competition.api'
// import './style.scss'

// const CreateOfCompetAdmin = () => {
//   const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({
//     resolver: yupResolver(competitionCreationSchema),
//     mode: 'onChange', // Validate ngay khi thay đổi giá trị
//   })

//   const [loading, setLoading] = useState(false)
//   const [imageFile, setImageFile] = useState(null)
//   const [previewUrl, setPreviewUrl] = useState(null)
//   const fileInputRef = useRef(null)
//   const [leaders, setLeaders] = useState([])

//   // Lấy danh sách người phụ trách
//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const response = await getAllUsers()
//         setLeaders(response.data || [])
//       } catch (error) {
//         toast.error('Không thể tải danh sách người phụ trách.')
//       }
//     }
//     fetchLeaders()

//     // Dọn dẹp previewUrl khi component unmount
//     return () => {
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl)
//       }
//     }
//   }, [previewUrl])

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         toast.error('Chỉ cho phép hình ảnh PNG, JPG, JPEG, WEBP hoặc GIF')
//         return
//       }
//       // Dọn dẹp previewUrl cũ trước khi tạo mới
//       if (previewUrl) {
//         URL.revokeObjectURL(previewUrl)
//       }
//       setImageFile(file)
//       setPreviewUrl(URL.createObjectURL(file))
//     }
//   }

//   const onSubmit = async (data) => {
//     if (!imageFile) {
//       toast.error('Vui lòng chọn ảnh bìa cho cuộc thi.')
//       return
//     }

//     setLoading(true)
//     const submissionPayload = {
//       name: data.name,
//       description: data.description,
//       rule: data.rule,
//       content: data.content,
//       competitionLeaderId: data.competitionLeaderId,
//       startTime: new Date(data.startTime).toISOString(),
//       endTime: new Date(data.endTime).toISOString(),
//     }
//     const submissionData = new FormData()
//     submissionData.append(
//       'data',
//       new Blob([JSON.stringify(submissionPayload)], { type: 'application/json' }),
//     )
//     submissionData.append('image', imageFile)

//     const creationToast = toast.loading('Đang tạo cuộc thi...')
//     try {
//       await createCompetition(submissionData)
//       toast.success('Tạo cuộc thi thành công!', { id: creationToast })
//       navigate('/admin/competitions') // Chuyển hướng về danh sách sau khi tạo thành công
//     } catch (error) {
//       const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo cuộc thi.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: creationToast,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='create-compet-admin'>
//       <div className='create-compet-admin__header'>
//         <i
//           className='create-compet-admin__back-icon fa-solid fa-arrow-left'
//           onClick={() => navigate('/admin/competitions')}></i>
//         <button
//           className='mainofcompet__create-button'
//           onClick={() => navigate('/admin/competitions/create')}>
//           <i className='fa-solid fa-plus'></i>
//           Tạo mới
//         </button>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='create-compet-admin__context'>
//           <div className='create-compet-admin__context-title'>
//             <i className='fa-solid fa-plus'></i>
//             <h2>Tạo cuộc thi</h2>
//           </div>

//           <div className='create-compet-admin__context-enter'>
//             <div className='create-compet-admin__context-enter__left'>
//               <span>Tên cuộc thi</span>
//               <input type='text' {...register('name')} />
//               {errors.name && <span className='error-message'>{errors.name.message}</span>}

//               <div className='create-compet-admin__context-enter__left-time'>
//                 <div>
//                   <span>Ngày bắt đầu</span>
//                   <input type='datetime-local' {...register('startTime')} />
//                   {errors.startTime && (
//                     <span className='error-message'>{errors.startTime.message}</span>
//                   )}
//                 </div>
//                 <div>
//                   <span>Ngày kết thúc</span>
//                   <input type='datetime-local' {...register('endTime')} />
//                   {errors.endTime && (
//                     <span className='error-message'>{errors.endTime.message}</span>
//                   )}
//                 </div>
//               </div>

//               <span>Ảnh bìa cuộc thi</span>
//               {!previewUrl ? (
//                 <div
//                   className='create-compet-admin__context-enter__left-upload'
//                   onClick={() => fileInputRef.current.click()}>
//                   <Icon icon='ic:round-upload' className='upload-icon' />
//                   <span>Tải ảnh lên</span>
//                 </div>
//               ) : (
//                 <img
//                   src={previewUrl}
//                   alt='Ảnh bìa'
//                   className='create-compet-admin__context-enter__left-upload-preview'
//                   onClick={() => fileInputRef.current.click()}
//                 />
//               )}
//               <input
//                 type='file'
//                 accept='image/*'
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//               />
//               {errors.imageFile && (
//                 <span className='error-message'>{errors.imageFile.message}</span>
//               )}

//               <span>Giới thiệu</span>
//               <textarea
//                 placeholder='Nhập giới thiệu'
//                 className='create-compet-admin__context-enter__left-textarea'
//                 {...register('description')}></textarea>
//               {errors.description && (
//                 <span className='error-message'>{errors.description.message}</span>
//               )}
//             </div>

//             <div className='create-compet-admin__context-enter__right'>
//               <span>Leader (Phụ trách)</span>
//               <select {...register('competitionLeaderId')}>
//                 <option value=''>-- Chọn người phụ trách --</option>
//                 {leaders.map((leader) => (
//                   <option key={leader.id} value={leader.id}>
//                     {leader.fullName}
//                   </option>
//                 ))}
//               </select>
//               {errors.competitionLeaderId && (
//                 <span className='error-message'>{errors.competitionLeaderId.message}</span>
//               )}

//               <span>Thể lệ</span>
//               <textarea
//                 placeholder='Nhập thể lệ'
//                 className='create-compet-admin__context-enter__right-textarea'
//                 {...register('rule')}></textarea>
//               {errors.rule && <span className='error-message'>{errors.rule.message}</span>}
//             </div>
//           </div>

//           <div className='create-compet-admin__context-content'>
//             <label htmlFor='content'>Đề thi</label>
//             <br />
//             <textarea id='content' placeholder='Nhập đề thi' {...register('content')}></textarea>
//             {errors.content && <span className='error-message'>{errors.content.message}</span>}
//           </div>

//           <div className='create-compet-admin__context-button'>
//             <button type='submit' disabled={loading || !isValid}>
//               {loading ? 'Đang tạo...' : 'Tạo'}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default CreateOfCompetAdmin

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// --- Core Tools from our Architecture ---
import { competitionCreationSchema } from '../../../../utils/competitionValidate.js' // Assuming you create this file
import { createCompetition } from '../../../../apis/competition.api'
import { getAllUsers } from '../../../../apis/user.api' // Use user.api.js

// --- Styles ---
import './style.scss'

const CreateOfCompetAdmin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(competitionCreationSchema),
    mode: 'onChange', // Validate on change for instant feedback
  })

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const [leaders, setLeaders] = useState([])

  // Fetch the list of potential leaders (Admins/Leaders)
  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await getAllUsers()
        const potentialLeaders = response.data?.filter((user) => user.role === 'LEADER') || []
        setLeaders(potentialLeaders)
      } catch (error) {
        toast.error('Không thể tải danh sách người phụ trách.')
      }
    }
    fetchLeaders()
  }, []) // Run only once on mount

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ cho phép tệp hình ảnh (PNG, JPG, WEBP, GIF).')
        e.target.value = null // Clear the input
        return
      }
      setImageFile(file)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl) // Clean up the old object URL to prevent memory leaks
      }
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const onSubmit = async (data) => {
    // The image is handled by state, not react-hook-form, so we check it separately.
    if (!imageFile) {
      toast.error('Vui lòng chọn ảnh bìa cho cuộc thi.')
      return
    }

    setLoading(true)
    const creationToast = toast.loading('Đang tạo cuộc thi...')

    // Construct the payload for the 'data' part of the form
    const submissionPayload = {
      name: data.name,
      description: data.description,
      content: data.content,
      startTime: new Date(data.startTime).toISOString(),
      endTime: new Date(data.endTime).toISOString(),
    }

    // Your backend expects a `leaderId` not `competitionLeaderId`
    // Also, rule is not in the DTO, it's part of content/description.
    if (data.competitionLeaderId) {
      submissionPayload.leaderId = data.competitionLeaderId
    }

    const submissionData = new FormData()
    submissionData.append(
      'data',
      new Blob([JSON.stringify(submissionPayload)], { type: 'application/json' }),
    )
    submissionData.append('image', imageFile)

    try {
      await createCompetition(submissionData)
      toast.success('Tạo cuộc thi thành công!', { id: creationToast })
      navigate('/admin/competition')
    } catch (error) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra khi tạo cuộc thi.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: creationToast,
      })
    } finally {
      setLoading(false)
    }
  }

  // Cleanup effect for the object URL
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className='create-compet-admin'>
      <div className='create-compet-admin__header'>
        <i
          className='create-compet-admin__back-icon fa-solid fa-arrow-left'
          onClick={() => navigate('/admin/competition')}></i>
        {/* Removed redundant "Tạo mới" button from header */}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='create-compet-admin__context'>
          <div className='create-compet-admin__context-title'>
            <i className='fa-solid fa-plus'></i>
            <h2>Tạo cuộc thi</h2>
          </div>

          <div className='create-compet-admin__context-enter'>
            <div className='create-compet-admin__context-enter__left'>
              <span>Tên cuộc thi</span>
              <input type='text' {...register('name')} />
              {errors.name && <p className='error-message'>{errors.name.message}</p>}

              <div className='create-compet-admin__context-enter__left-time'>
                <div>
                  <span>Ngày bắt đầu</span>
                  <input type='datetime-local' {...register('startTime')} />
                  {errors.startTime && <p className='error-message'>{errors.startTime.message}</p>}
                </div>
                <div>
                  <span>Ngày kết thúc</span>
                  <input type='datetime-local' {...register('endTime')} />
                  {errors.endTime && <p className='error-message'>{errors.endTime.message}</p>}
                </div>
              </div>

              <span>Ảnh bìa cuộc thi</span>
              {!previewUrl ? (
                <div
                  className='create-compet-admin__context-enter__left-upload'
                  onClick={() => fileInputRef.current.click()}>
                  <Icon icon='ic:round-upload' className='upload-icon' />
                  <span>Tải ảnh lên</span>
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt='Ảnh bìa'
                  className='create-compet-admin__context-enter__left-upload-preview'
                  onClick={() => fileInputRef.current.click()}
                />
              )}
              <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              <span>Giới thiệu</span>
              <textarea
                placeholder='Nhập giới thiệu'
                className='create-compet-admin__context-enter__left-textarea'
                {...register('description')}></textarea>
              {errors.description && <p className='error-message'>{errors.description.message}</p>}
            </div>

            <div className='create-compet-admin__context-enter__right'>
              <span>Leader (Phụ trách)</span>
              <select {...register('competitionLeaderId')}>
                <option value=''>-- Chọn người phụ trách --</option>
                {leaders.map((leader) => (
                  <option key={leader.id} value={leader.id}>
                    {leader.fullName}
                  </option>
                ))}
              </select>
              {errors.competitionLeaderId && (
                <p className='error-message'>{errors.competitionLeaderId.message}</p>
              )}

              <span>Nội dung chi tiết (Thể lệ, đề bài, v.v)</span>
              <textarea
                placeholder='Nhập nội dung chi tiết'
                className='create-compet-admin__context-enter__right-textarea'
                {...register('content')}></textarea>
              {errors.content && <p className='error-message'>{errors.content.message}</p>}
            </div>
          </div>

          <div className='create-compet-admin__context-button'>
            <button type='submit' disabled={loading || !isValid}>
              {loading ? 'Đang tạo...' : 'Tạo cuộc thi'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateOfCompetAdmin
