// import React from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import { getAllCompetitions } from '../../../apis/competition.api'
// import './style.scss'

// const MainCompetition = () => {
//   const navigate = useNavigate()
//   const contests = [
//     {
//       id: 1,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 3,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 4,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 5,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 6,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 7,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//     {
//       id: 8,
//       name: 'HIT Contest Series 2025',
//       startDate: '14/07/2025',
//       status: 'Đang diễn ra',
//     },
//   ]

//   return (
//     <div className='competition'>
//       <div className='competition__left'>
//         <div className='competition__left__title'>
//           <Icon
//             icon='streamline-ultimate:ranking-stars-ribbon-bold'
//             width='30'
//             height='30'
//             className='competition__left__title__icon'
//           />
//           <h2>Cuộc thi</h2>
//         </div>
//         <div className='competition__left__board'>
//           <i className='fa-solid fa-circle-info board'></i>
//         </div>
//         <div className='competition__left__bang'>
//           {contests.map((contest) => (
//             <div className='competition__left__bang__box' key={contest.id}>
//               <div className='competition__left__bang__box__board'></div>
//               <div className='competition__left__bang__box__information'>
//                 <h4>{contest.name}</h4>
//                 <div className='competition__left__bang__box__information__list'>
//                   <span className='competition__left__bang__box__information__list__span1'>
//                     {contest.status}
//                   </span>
//                   <span
//                     className={
//                       contest.id % 2 == 0
//                         ? 'competition__left__bang__box__information__list__span2'
//                         : 'competition__left__bang__box__information__list__span3'
//                     }>
//                     {contest.id % 2 == 0 ? 'Đăng ký' : 'Đã đăng ký'}
//                   </span>
//                   <i className='fa-solid fa-circle-info'></i>
//                 </div>
//                 <p>Ngày bắt đầu: {contest.startDate}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className='competition__among'></div>
//       <div className='competition__right'>
//         <h2>Bạn đang tham gia</h2>
//         <div className='competition__right__body'>
//           <div
//             className='competition__right__body__board'
//             onClick={() => navigate('/competition/information')}>
//             <i className='fa-solid fa-circle-info'></i>
//           </div>
//           <hr />
//         </div>
//         <h3>Giới thiệu</h3>
//         <div className='competition__right__text'>
//           <span>text...</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainCompetition

// import React, { useState, useEffect, useCallback } from 'react'
// import { Icon } from '@iconify/react'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'

// // --- Core Tools ---
// import { getAllCompetitions } from '../../../apis/competition.api' // Correct import
// import { formatDate, translateStatus } from '../../../utils/formatters'

// // --- Styles ---
// import './style.scss'

// const MainCompetition = () => {
//   const navigate = useNavigate()
//   const [competitions, setCompetitions] = useState([])
//   const [loading, setLoading] = useState(true)

//   // --- Data Fetching using API Service ---
//   const fetchCompetitions = useCallback(async () => {
//     try {
//       setLoading(true)
//       // Define the parameters to send to the API
//       const params = {
//         pageNum: 1,
//         pageSize: 10,
//         sortBy: 'startTime',
//         isAscending: false, // false for DESC to get newest first
//       }

//       const response = await getAllCompetitions(params)

//       // The interceptor ensures `response` is { status, data: { meta, items } }
//       // We need to access the inner `data` object.
//       setCompetitions(response.data?.items || [])
//     } catch (error) {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message)
//       } else {
//         toast.error('Có lỗi xảy ra khi tải danh sách cuộc thi.')
//       }
//     } finally {
//       setLoading(false)
//     }
//   }, []) // useCallback has no dependencies here

//   useEffect(() => {
//     fetchCompetitions()
//   }, [fetchCompetitions])

//   return (
//     <div className='competition'>
//       <div className='competition__left'>
//         <div className='competition__left__title'>
//           <Icon
//             icon='streamline-ultimate:ranking-stars-ribbon-bold'
//             width='30'
//             height='30'
//             className='competition__left__title__icon'
//           />
//           <h2>Cuộc thi</h2>
//         </div>
//         <div className='competition__left__board'>
//           <i className='fa-solid fa-circle-info board'></i>
//         </div>
//         <div className='competition__left__bang'>
//           {loading && <p style={{ padding: '1rem' }}>Đang tải các cuộc thi...</p>}
//           {!loading && competitions.length === 0 && (
//             <p style={{ padding: '1rem' }}>Chưa có cuộc thi nào.</p>
//           )}
//           {!loading &&
//             competitions.map((contest) => (
//               <div className='competition__left__bang__box' key={contest.id}>
//                 <div className='competition__left__bang__box__board'>
//                   {contest.image && <img src={contest.image} alt={contest.name} />}
//                 </div>
//                 <div className='competition__left__bang__box__information'>
//                   <h4>{contest.name}</h4>
//                   <div className='competition__left__bang__box__information__list'>
//                     <span className='competition__left__bang__box__information__list__span1'>
//                       {translateStatus(contest.status)}
//                     </span>
//                     {/* This "Đăng ký" status will need to be driven by real data later */}
//                     <span className='competition__left__bang__box__information__list__span2'>
//                       Đăng ký
//                     </span>
//                     <i className='fa-solid fa-circle-info'></i>
//                   </div>
//                   <p>Ngày bắt đầu: {formatDate(contest.startTime)}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//       <div className='competition__among'></div>
//       <div className='competition__right'>
//         <h2>Bạn đang tham gia</h2>
//         <div className='competition__right__body'>
//           <div
//             className='competition__right__body__board'
//             onClick={() => navigate('/competition/information')}>
//             <i className='fa-solid fa-circle-info'></i>
//           </div>
//           <hr />
//         </div>
//         <h3>Giới thiệu</h3>
//         <div className='competition__right__text'>
//           <span>text...</span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainCompetition

import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// --- Core Tools ---
import { getAllCompetitions } from '../../../apis/competition.api'
import { joinCompetition } from '../../../apis/competitionUser.api' // 👈 1. Import the new API function
import { formatDate, translateStatus } from '../../../utils/formatters'

// --- Styles ---
import './style.scss'

const MainCompetition = () => {
  const navigate = useNavigate()
  const [competitions, setCompetitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [joinLoading, setJoinLoading] = useState(null)

  const fetchCompetitions = useCallback(async () => {
    try {
      setLoading(true)
      const params = { pageNum: 1, pageSize: 10, sortBy: 'startTime', isAscending: false }
      const response = await getAllCompetitions(params)
      setCompetitions(response.data?.items || [])
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi tải danh sách cuộc thi.')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCompetitions()
  }, [fetchCompetitions])

  // 👇 2. Create the handler for the "Đăng ký" button
  const handleJoinCompetition = async (competitionId) => {
    setJoinLoading(competitionId) // Set loading state for this specific button
    try {
      const payload = { competitionId: competitionId }
      await joinCompetition(payload)
      toast.success('Đăng ký tham gia thành công!')
      navigate(`${competitionId}`)
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Có lỗi xảy ra khi đăng ký.')
      }
    } finally {
      setJoinLoading(null)
    }
  }

  return (
    <div className='competition'>
      <div className='competition__left'>
        <div className='competition__left__title'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            width='30'
            height='30'
            className='competition__left__title__icon'
          />
          <h2>Cuộc thi</h2>
        </div>
        <div className='competition__left__board'>
          <i className='fa-solid fa-circle-info board'></i>
        </div>
        <div className='competition__left__bang'>
          {loading && <p style={{ padding: '1rem' }}>Đang tải các cuộc thi...</p>}
          {!loading && competitions.length === 0 && (
            <p style={{ padding: '1rem' }}>Chưa có cuộc thi nào.</p>
          )}
          {!loading &&
            competitions.map((contest) => (
              <div className='competition__left__bang__box' key={contest.id}>
                <div className='competition__left__bang__box__board'>
                  {contest.image && <img src={contest.image} alt={contest.name} />}
                </div>
                <div className='competition__left__bang__box__information'>
                  <h4>{contest.name}</h4>
                  <div className='competition__left__bang__box__information__list'>
                    <span className='competition__left__bang__box__information__list__span1'>
                      {translateStatus(contest.status)}
                    </span>

                    {/* 👇 3. Make the button functional */}
                    <button
                      className='competition__left__bang__box__information__list__span2'
                      onClick={() => handleJoinCompetition(contest.id)}
                      disabled={joinLoading === contest.id}>
                      {joinLoading === contest.id ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>

                    <i className='fa-solid fa-circle-info'></i>
                  </div>
                  <p>Ngày bắt đầu: {formatDate(contest.startTime)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className='competition__among'></div>
      <div className='competition__right'>
        <h2>Bạn đang tham gia</h2>
        <div className='competition__right__body'>
          <div className='competition__right__body__board'>
            <i className='fa-solid fa-circle-info'></i>
          </div>
          <hr />
        </div>
        <h3>Giới thiệu</h3>
        <div className='competition__right__text'>
          <span>text...</span>
        </div>
      </div>
    </div>
  )
}

export default MainCompetition
