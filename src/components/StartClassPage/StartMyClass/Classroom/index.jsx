// import React, { useState } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import { lop } from '../../../../data/app'
// import { getMyClassrooms } from '../../../../apis/user.api'

// import './style.scss'

// const Classroom = () => {
//   const navigate = useNavigate()
//   return (
//     <div className='flextap-one'>
//       <div className='flextap-one__plus'>
//         <div className='plustap'>
//           <div className='plustap__plus'>
//             <Icon
//               icon='fluent:book-star-24-regular'
//               width='25'
//               height='25'
//               className='plustap__plus__Icon'
//             />
//             <h3>Lớp học gần đây</h3>
//           </div>
//           <div className='plustap__infor'>
//             <span className='plustap__infor__span'>▲ Lớp đang học</span>
//           </div>
//         </div>

//         <div className='class-tap thay2'>
//           {lop && Array.isArray(lop) ? (
//             lop.map((item, index) => (
//               <div className='class-tap__box' key={index}>
//                 <div className='class-tap__thumbnail'></div>
//                 <div className='class-tap__content'>
//                   <button className='class-tap__button' onClick={() => navigate('/information')}>
//                     VÀO HỌC
//                   </button>
//                   <h2 className='class-tap__content__title'>Private</h2>
//                   <h2 className='class-tap__content__title'>{item.name}</h2>
//                   <p className='class-tap__content__info'>
//                     <span className='icon'>
//                       <Icon icon='mdi:badge-account' />
//                     </span>{' '}
//                     Leader: {item.leader}
//                   </p>
//                   <p className='class-tap__content__info'>
//                     <span className='icon'>
//                       <Icon icon='mingcute:time-line' />
//                     </span>{' '}
//                     Ngày bắt đầu: {item.date}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div>Không có dữ liệu lớp học!</div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Classroom

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// --- Core Tools from our Architecture ---
import { getMyClassrooms } from '../../../../apis/user.api'
import { formatDate } from '../../../../utils/formatters'

// --- Styles ---
import './style.scss'

const Classroom = () => {
  const navigate = useNavigate()

  // --- State Management ---
  const [classrooms, setClassrooms] = useState([])
  const [loading, setLoading] = useState(true)

  // --- Data Fetching Effect ---
  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        setLoading(true)
        const response = await getMyClassrooms()
        setClassrooms(response.data || [])
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error('Có lỗi xảy ra khi tải danh sách lớp học.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMyClasses()
  }, [])

  return (
    <div className='flextap-one'>
      <div className='flextap-one__plus'>
        <div className='plustap'>
          <div className='plustap__plus'>
            <Icon
              icon='fluent:book-star-24-regular'
              width='25'
              height='25'
              className='plustap__plus__Icon'
            />
            <h3>Lớp học gần đây</h3>
          </div>
          <div className='plustap__infor'>
            <span className='plustap__infor__span'>▲ Lớp đang học</span>
          </div>
        </div>

        <div className='class-tap thay2'>
          {loading ? (
            <div style={{ padding: '20px', color: '#888' }}>Đang tải lớp học...</div>
          ) : classrooms.length > 0 ? (
            classrooms.map((item) => (
              <div className='class-tap__box' key={item.id}>
                <div className='class-tap__thumbnail'>
                  {/* Display the classroom image if it exists */}
                  {item.image && (
                    <img src={item.image} alt={item.name} width='100%' height='100%' />
                  )}
                </div>
                <div className='class-tap__content'>
                  <button
                    className='class-tap__button'
                    // Navigate to a dynamic route based on the classroom's ID
                    onClick={() => navigate(`${item.id}`)}>
                    VÀO HỌC
                  </button>
                  <h2 className='class-tap__content__title'>Private</h2>
                  <h2 className='class-tap__content__title'>{item.name}</h2>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mdi:badge-account' />
                    </span>{' '}
                    Leader: {item.leaderName}
                  </p>
                  <p className='class-tap__content__info'>
                    <span className='icon'>
                      <Icon icon='mingcute:time-line' />
                    </span>{' '}
                    Ngày bắt đầu: {formatDate(item.startTime)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>Không có dữ liệu lớp học!</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Classroom
