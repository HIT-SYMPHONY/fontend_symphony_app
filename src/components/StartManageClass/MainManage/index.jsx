// import React, { useState, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import icon from './../../../assets/img/Ellipse.png'
// import { Outlet } from 'react-router-dom'
// import logo from './../../../assets/img/logo.png'
// import Logout from '../../Logout'
// import './style.scss'

// const MainManage = () => {
//   const lop = [
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//     {
//       name: 'PRIVATE: Đồ họa - 2025',
//       state: 'Đang diễn ra',
//       see: 'Xem chi tiết',
//     },
//   ]
//   return (
//     <>
//       <div className='manage'>
//         <div className='manage__title'>
//           <Icon icon='mdi:book-account' width='30' height='30' className='manage__title__icon' />
//           <h2>Quản lý lớp học </h2>
//         </div>
//         <div className='manage__search'>
//           <div className='manage__search__container'>
//             <input type='text' placeholder='Nhập tìm kiếm...' />
//             <i className='fa-solid fa-magnifying-glass'></i>
//           </div>
//         </div>
//         <h3>Danh sách lớp quản lý</h3>
//         <div className='manage__table'>
//           {lop.map((item, index) => (
//             <div className='manage-table' key={index}>
//               <div className='manage-table__img'></div>
//               <div className='manage-table__context'>
//                 <div className='manage-table__context__pair'>
//                   <h4>{item.name}</h4>
//                   <span>{item.state}</span>
//                 </div>
//                 <span className='manage-table__context__span'>{item.see}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

// export default MainManage

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getMyClassrooms } from '../../../apis/user.api'
import { translateStatus } from '../../../utils/formatters'
import './style.scss' // Ensure styles are moved/created for this page

const MyClassesPage = () => {
  const navigate = useNavigate()
  const [myClasses, setMyClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // State to control the server-side filter
  const [selectedStatus, setSelectedStatus] = useState(null) // null means 'all'

  // This function fetches data from the API based on the current filter state
  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true)
      // Pass the selectedStatus to the API call. The API service handles the params object.
      const response = await getMyClassrooms(selectedStatus)
      // The API returns the array directly in the `data` property
      setMyClasses(response.data || [])
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải danh sách lớp học của bạn.')
      }
    } finally {
      setLoading(false)
    }
  }, [selectedStatus]) // Re-create this function only when selectedStatus changes

  // This effect triggers the data fetch whenever the fetchClasses function is updated
  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  // Client-side search still works on the data returned from the server
  const filteredClasses = useMemo(() => {
    if (!searchQuery) return myClasses
    const lowercasedQuery = searchQuery.toLowerCase()
    return myClasses.filter((cls) => cls.name.toLowerCase().includes(lowercasedQuery))
  }, [myClasses, searchQuery])

  return (
    <div className='manage'>
      <div className='manage__title'>
        <Icon icon='mdi:book-account' width='30' height='30' className='manage__title__icon' />
        <h2>Lớp học của tôi</h2>
      </div>
      <div className='manage__search'>
        {/* You can add a status filter dropdown here */}
        <select onChange={(e) => setSelectedStatus(e.target.value || null)} defaultValue=''>
          <option value=''>Tất cả trạng thái</option>
          <option value='UPCOMING'>Sắp diễn ra</option>
          <option value='ONGOING'>Đang diễn ra</option>
          <option value='COMPLETED'>Hoàn thành</option>
        </select>

        <div className='manage__search__container'>
          <input
            type='text'
            placeholder='Tìm kiếm lớp học...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className='fa-solid fa-magnifying-glass'></i>
        </div>
      </div>
      <h3>Danh sách lớp học ({loading ? '...' : filteredClasses.length})</h3>
      <div className='manage__table'>
        {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải...</div>}

        {!loading && filteredClasses.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
            Không có lớp học nào phù hợp.
          </div>
        )}

        {!loading &&
          filteredClasses.map((item) => (
            <div className='manage-table' key={item.id}>
              <div className='manage-table__img'>
                {item.image && <img src={item.image} alt={item.name} />}
              </div>
              <div className='manage-table__context'>
                <div className='manage-table__context__pair'>
                  <h4>{item.name}</h4>
                  <span>{translateStatus(item.status)}</span>
                </div>
                <span
                  className='manage-table__context__span'
                  onClick={() => navigate(`${item.id}`)}>
                  Xem chi tiết
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default MyClassesPage
