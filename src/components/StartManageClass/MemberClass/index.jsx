// import React, { useState, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { GlobalContext } from '../../../dataContext'
// import icon from './../../../assets/img/Ellipse.png'
// import { Outlet } from 'react-router-dom'
// import logo from './../../../assets/img/logo.png'
// import Logout from '../../Logout'
// import './style.scss'

// const MemberClass = () => {
//   return (
//     <>
//       <div className='memberclass'>
//         <div className='memberclass__title'>
//           <div className='memberclass__title__tap'>
//             <Icon
//               icon='mingcute:notification-newdot-fill'
//               width='30'
//               height='30'
//               className='memberclass__title__tap__icon'
//             />
//             <h2>Thông báo</h2>
//           </div>
//           <button className='memberclass__title__button'>Lưu </button>
//         </div>
//         <div className='memberclass__context'>
//           <span>Tên lớp học</span>
//           <input type='text' />
//           <span>Nội dung</span>
//           <textarea
//             className='memberclass__context__textarea'
//             rows='5'
//             placeholder='Nhập nội dung thông báo...'></textarea>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MemberClass

import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useParams, useNavigate } from 'react-router-dom' // 1. Import useParams
import toast from 'react-hot-toast'
import { createNotification } from '../../../apis/notification.api'
import './style.scss'

// The component no longer accepts props.
const CreateNotification = () => {
  const navigate = useNavigate()
  // 2. Get the dynamic part of the URL.
  // This assumes your route is defined like: /admin/manage/notifications/:classId
  const { classId } = useParams()

  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    // 3. Validate using the classId from the URL.
    if (!classId) {
      toast.error('Lỗi: Không tìm thấy ID của lớp học trong URL.')
      return
    }
    if (!content) {
      toast.error('Vui lòng nhập nội dung thông báo.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        content: content,
        classRoomId: classId, // 4. Use the classId from useParams in the payload.
        competitionId: null,
      }
      await createNotification(payload)
      toast.success('Tạo thông báo thành công!')
      setContent('') // Reset form after successful creation
      // Optionally navigate back to the classroom detail page
      // navigate(`/admin/manage/information/${classId}`);
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tạo thông báo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='memberclass'>
      <div className='memberclass__title'>
        <div className='memberclass__title__tap'>
          <Icon
            icon='mingcute:notification-newdot-fill'
            width='30'
            height='30'
            className='memberclass__title__tap__icon'
          />
          <h2>Tạo Thông báo Mới</h2>
        </div>
        <button className='memberclass__title__button' onClick={handleSave} disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu'}
        </button>
      </div>
      <div className='memberclass__context'>
        <span>Nội dung</span>
        <textarea
          className='memberclass__context__textarea'
          rows='5'
          placeholder='Nhập nội dung thông báo...'
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
    </div>
  )
}

export default CreateNotification
