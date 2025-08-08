import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useOutletContext, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { updateClassroom } from '../../../apis/classroom.api'
import { getAllUsers } from '../../../apis/user.api'
import { formatDate } from '../../../utils/formatters'
import './style.scss'
// const Communication = () => {
//   const { classroom, refetchClassroom } = useOutletContext()
//   const { classId } = useParams()

//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState(null)
//   const [allUsers, setAllUsers] = useState([])
//   const [loadingUsers, setLoadingUsers] = useState(false)
//   const [imageFile, setImageFile] = useState(null)

//   useEffect(() => {
//     if (classroom) {
//       setFormData({
//         name: classroom.name || '',
//         leaderId: classroom.leaderId || '',
//         startTime: classroom.startTime || '',
//         duration: classroom.duration || '',
//         description: classroom.description || '',
//       })
//     }
//   }, [classroom])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleEdit = async () => {
//     setIsEditing(true)
//     try {
//       setLoadingUsers(true)
//       const response = await getAllUsers()
//       const potentialLeaders =
//         response.data?.filter((user) => user.role === 'ADMIN' || user.role === 'LEADER') || []
//       setAllUsers(potentialLeaders)
//     } catch (error) {
//       toast.error('Không thể tải danh sách leader.')
//     } finally {
//       setLoadingUsers(false)
//     }
//   }

//   const handleCancel = () => {
//     setFormData(classroom)
//     setIsEditing(false)
//   }

//   const handleSave = async () => {
//     const saveToast = toast.loading('Đang lưu...')

//     const updatePayload = {
//       name: formData.name,
//       startTime: formData.startTime,
//       duration: parseInt(formData.duration),
//       leaderId: formData.leaderId,
//       description: formData.description,
//     }

//     const submissionData = new FormData()
//     submissionData.append(
//       'data',
//       new Blob([JSON.stringify(updatePayload)], { type: 'application/json' }),
//     )
//     if (imageFile) {
//       submissionData.append('image', imageFile)
//     }

//     try {
//       await updateClassroom(classId, submissionData)
//       setIsEditing(false)
//       toast.success('Cập nhật thành công!', { id: saveToast })
//       if (refetchClassroom) {
//         refetchClassroom()
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
//       toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
//         id: saveToast,
//       })
//     }
//   }

//   if (!formData) {
//     return <div>Đang tải thông tin...</div>
//   }

//   return (
//     <div className='manage-infor__context-infor'>
//       <div className='manage-infor__context-infor__title'>
//         <div className='title-com'>
//           <i className='fa-solid fa-circle-info title-com__i'></i>
//           <h3>Thông tin lớp học</h3>
//         </div>
//         {isEditing ? (
//           <div className='edit-actions'>
//             <button className='button button-save' onClick={handleSave}>
//               <Icon icon='material-symbols:save' width='15' height='15' /> Lưu
//             </button>
//             <button className='button button-cancel' onClick={handleCancel}>
//               <Icon icon='material-symbols:cancel-outline' width='15' height='15' /> Hủy
//             </button>
//           </div>
//         ) : (
//           <button className='button' onClick={handleEdit}>
//             <Icon icon='iconamoon:edit-fill' width='15' height='15' /> Chỉnh sửa
//           </button>
//         )}
//       </div>
//       <div className='manage-infor__context-infor__context'>
//         <div className='manage-infor__context-infor__context__box'>
//           <div className='box'>
//             <h5>Tên lớp học</h5>
//             {isEditing ? (
//               <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
//             ) : (
//               <span>{classroom.name}</span>
//             )}
//           </div>
//           <div className='box'>
//             <h5>Tên Leader</h5>
//             {isEditing ? (
//               <select name='leaderId' value={formData.leaderId} onChange={handleInputChange}>
//                 {loadingUsers ? (
//                   <option>Đang tải...</option>
//                 ) : (
//                   allUsers.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.fullName}
//                     </option>
//                   ))
//                 )}
//               </select>
//             ) : (
//               <span>{classroom.leaderName}</span>
//             )}
//           </div>
//         </div>
//         <div className='manage-infor__context-infor__context__box'>
//           <div className='box'>
//             <h5>Ngày bắt đầu</h5>
//             {isEditing ? (
//               <input
//                 type='date'
//                 name='startTime'
//                 value={formatDate(formData.startTime, 'yyyy-MM-dd')}
//                 onChange={handleInputChange}
//               />
//             ) : (
//               <span>{formatDate(classroom.startTime)}</span>
//             )}
//           </div>
//           <div className='box'>
//             <h5>Ngày kết thúc</h5>
//             <span>{formatDate(classroom.endTime)}</span>
//           </div>
//           <div className='box'>
//             <h5>Độ dài lớp học (tuần)</h5>
//             {isEditing ? (
//               <input
//                 type='number'
//                 name='duration'
//                 value={formData.duration}
//                 onChange={handleInputChange}
//               />
//             ) : (
//               <span>{classroom.duration}</span>
//             )}
//           </div>
//         </div>
//         <h5>Mô tả:</h5>
//         <div className='manage-infor__context-infor__context__item'>
//           {isEditing ? (
//             <textarea
//               name='description'
//               value={formData.description}
//               onChange={handleInputChange}
//               rows='5'
//               className='manage-infor__context-infor__context__item__textarea'
//             />
//           ) : (
//             <p>{classroom.description}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Communication

const Communication = () => {
  const { classroom, refetchClassroom } = useOutletContext()
  const { classId } = useParams()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (classroom) {
      setFormData({
        name: classroom.name || '',
        leaderId: classroom.leaderId || '',
        startTime: classroom.startTime || '',
        duration: classroom.duration || '',
        description: classroom.description || '',
      })
    }
  }, [classroom])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    // The handleEdit function is now very simple. It just toggles the UI state.
    setIsEditing(true)
  }

  const handleCancel = () => {
    setFormData(classroom)
    setIsEditing(false)
  }

  const handleSave = async () => {
    const saveToast = toast.loading('Đang lưu...')

    const updatePayload = {
      name: formData.name,
      startTime: formData.startTime,
      duration: parseInt(formData.duration),
      leaderId: formData.leaderId,
      description: formData.description,
    }

    const submissionData = new FormData()
    submissionData.append(
      'data',
      new Blob([JSON.stringify(updatePayload)], { type: 'application/json' }),
    )
    if (imageFile) {
      submissionData.append('image', imageFile)
    }

    try {
      await updateClassroom(classId, submissionData)
      setIsEditing(false)
      toast.success('Cập nhật thành công!', { id: saveToast })
      if (refetchClassroom) {
        refetchClassroom()
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi khi cập nhật.'
      toast.error(typeof message === 'object' ? Object.values(message).join('\n') : message, {
        id: saveToast,
      })
    }
  }

  if (!formData) {
    return <div>Đang tải thông tin...</div>
  }

  return (
    <div className='manage-infor__context-infor'>
      <div className='manage-infor__context-infor__title'>
        <div className='title-com'>
          <i className='fa-solid fa-circle-info title-com__i'></i>
          <h3>Thông tin lớp học</h3>
        </div>
        {isEditing ? (
          <div className='edit-actions'>
            <button className='button button-save' onClick={handleSave}>
              <Icon icon='material-symbols:save' width='15' height='15' /> Lưu
            </button>
            <button className='button button-cancel' onClick={handleCancel}>
              <Icon icon='material-symbols:cancel-outline' width='15' height='15' /> Hủy
            </button>
          </div>
        ) : (
          <button className='button' onClick={handleEdit}>
            <Icon icon='iconamoon:edit-fill' width='15' height='15' /> Chỉnh sửa
          </button>
        )}
      </div>
      <div className='manage-infor__context-infor__context'>
        <div className='manage-infor__context-infor__context__box'>
          <div className='box'>
            <h5>Tên lớp học</h5>
            {isEditing ? (
              <input type='text' name='name' value={formData.name} onChange={handleInputChange} />
            ) : (
              <span>{classroom.name}</span>
            )}
          </div>
          <div className='box'>
            <h5>Tên Leader</h5>
            <span>{classroom.leaderName}</span>
          </div>
        </div>
        <div className='manage-infor__context-infor__context__box'>
          <div className='box'>
            <h5>Ngày bắt đầu</h5>
            {isEditing ? (
              <input
                type='date'
                name='startTime'
                value={formatDate(formData.startTime, 'yyyy-MM-dd')}
                onChange={handleInputChange}
              />
            ) : (
              <span>{formatDate(classroom.startTime)}</span>
            )}
          </div>
          <div className='box'>
            <h5>Ngày kết thúc</h5>
            {/* Derived field, should be read-only */}
            <span>{formatDate(classroom.endTime)}</span>
          </div>
          <div className='box'>
            <h5>Độ dài lớp học (tuần)</h5>
            {isEditing ? (
              <input
                type='number'
                name='duration'
                value={formData.duration}
                onChange={handleInputChange}
              />
            ) : (
              <span>{classroom.duration}</span>
            )}
          </div>
        </div>
        <h5>Mô tả:</h5>
        <div className='manage-infor__context-infor__context__item'>
          {isEditing ? (
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows='5'
              className='manage-infor__context-infor__context__item__textarea'
            />
          ) : (
            <p>{classroom.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Communication
