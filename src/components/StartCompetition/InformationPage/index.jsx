// import React, { useState } from "react";
// import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";
// import "./style.scss";

// const Introduction = () => {
//   return (
//     <>
//       <span className="you">text...1</span>
//     </>
//   );
// };

// const Rules = () => {
//   return (
//     <>
//       <span className="you">text...2</span>
//     </>
//   );
// };

// const Rating = () => {
//   return (
//     <>
//       <span className="you">text...3</span>
//     </>
//   );
// };

// const YourTest = () => {
//   const navigate = useNavigate();
//   const list = [
//     {
//       time: "Tuần 3",
//       note: "Đang diễn ra",
//       diem: 80,
//       practi: "Tham gia",
//       style: 1,
//     },
//     {
//       time: "Tuần 2",
//       note: "Đã kết thúc",
//       diem: 80,
//       practi: "Xem chi tiết",
//       style: 2,
//     },
//     {
//       time: "Tuần 2",
//       note: "Đã kết thúc",
//       diem: 80,
//       practi: "Xem chi tiết",
//       style: 2,
//     },
//   ];
//   return (
//     <>
//       <h3>Phần thi: Photoshop</h3>
//       <div className="test">
//         <div className="test__img">
//           <div className="test__img__icon"></div>
//           <div className="test__img__intro">
//             <p>Họ và tên:</p>
//             <p>Mã sinh viên: </p>
//           </div>
//         </div>
//         <div className="test__thongtin">
//           <p>Khóa: 18</p>
//           <p>Khóa (HIT): HIT 15 </p>
//         </div>
//       </div>
//       <div className="test-table">
//         {list.map((item, index) => (
//           <div className="test-table__box" key={index}>
//             <div className="test-table__box__one">
//               <Icon
//                 icon="streamline-ultimate:ranking-stars-ribbon-bold"
//                 width="20"
//                 height="20"
//                 className="test-table__box__one__icon"
//               />
//               <span>{item.time}</span>
//               <span
//                 className={
//                   item.style == 1
//                     ? "test-table__box__one__span1"
//                     : "test-table__box__one__span2"
//                 }
//               >
//                 {item.note}
//               </span>
//             </div>
//             <div className="test-table__box__two">
//               <span className="test-table__box__two__span1">{item.diem}</span>
//               <p
//                 className={item.style == 1 ? "test-table__box__two__p" : ""}
//                 onClick={() => navigate("/competition/information/contest")}
//               >
//                 {item.practi}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export { Rating, Rules, Introduction, YourTest };

// const InformationCompetition = () => {
//   const [text, setText] = useState({
//     one: true,
//     two: false,
//     three: false,
//     four: false,
//   });

//   const handleText = (index) => {
//     switch (index) {
//       case 1:
//         return {
//           one: true,
//           two: false,
//           three: false,
//           four: false,
//         };
//       case 2:
//         return {
//           one: false,
//           two: true,
//           three: false,
//           four: false,
//         };
//       case 3:
//         return {
//           one: false,
//           two: false,
//           three: true,
//           four: false,
//         };
//       case 4:
//         return {
//           one: false,
//           two: false,
//           three: false,
//           four: true,
//         };
//       default:
//         return text;
//     }
//   };

//   return (
//     <div className="competition-infor">
//       <div className="competition-infor__left">
//         <div className="competition-infor__left__title">
//           <Icon
//             icon="streamline-ultimate:ranking-stars-ribbon-bold"
//             width="30"
//             height="30"
//             className="competition-infor__left__title__icon"
//           />
//           <h2>Cuộc thi</h2>
//         </div>
//         <div className="competition-infor__left__board">
//           <i className="fa-solid fa-circle-info board"></i>
//         </div>
//         <div className="competition-infor__left__button">
//           <button
//             className={text.one ? "btn active" : "btn"}
//             onClick={() => setText(handleText(1))}
//           >
//             Giới thiệu
//           </button>
//           <div className="divider"></div>
//           <button
//             className={text.two ? "btn active" : "btn"}
//             onClick={() => setText(handleText(2))}
//           >
//             Thể lệ
//           </button>
//           <div className="divider"></div>
//           <button
//             className={text.three ? "btn active" : "btn"}
//             onClick={() => setText(handleText(3))}
//           >
//             Xếp hạng
//           </button>
//           <div className="divider"></div>
//           <button
//             className={text.four ? "btn active" : "btn"}
//             onClick={() => setText(handleText(4))}
//           >
//             <Icon
//               icon="streamline-ultimate:messages-people-person-bubble-circle-1-bold"
//               width="12"
//               height="12"
//             />{" "}
//             Phần thi của bạn
//           </button>
//         </div>

//         <div className="competition-infor__left__bang">
//           {text.one ? (
//             <Introduction />
//           ) : text.two ? (
//             <Rules />
//           ) : text.three ? (
//             <Rating />
//           ) : (
//             <YourTest />
//           )}
//         </div>
//       </div>
//       <div className="competition-infor__among"></div>
//       <div className="competition-infor__right">
//         <div className="competition-infor__right__class">
//           <p>THAM GIA NHÓM CHAT ĐỂ NHẬN THÔNG TIN SỚM NHẤT !</p>
//           <div className="competition-infor__right__class__board">
//             <div className="class-board">
//               <Icon
//                 icon="streamline-flex:mail-send-email-message-circle-solid"
//                 width="35"
//                 height="35"
//                 color="#ff6911"
//                 className="class-board__icon"
//               />
//               <h4>Chat Room</h4>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InformationCompetition;

import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { NavLink, Outlet, useParams, useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getCompetitionById } from '../../../apis/competition.api'
import useAuth from '../../../hooks/useAuth'
import './style.scss'

// ===================================================================
//  TAB CONTENT COMPONENTS
// ===================================================================

const Introduction = () => {
  const { competition } = useOutletContext()
  if (!competition) return null
  return (
    <div className='tab-content introduction-tab'>
      <p>{competition.description || 'Chưa có giới thiệu cho cuộc thi này.'}</p>
    </div>
  )
}

const Rules = () => {
  const { competition } = useOutletContext()
  if (!competition) return null
  return (
    <div className='tab-content rules-tab'>
      <p>{competition.rule || 'Chưa có thể lệ cho cuộc thi này.'}</p>
    </div>
  )
}

const Rating = () => {
  return (
    <div className='tab-content rating-tab'>
      <p>Tính năng xếp hạng sắp ra mắt.</p>
    </div>
  )
}

const YourTest = () => {
  const navigate = useNavigate()
  const { competition } = useOutletContext()
  const { user } = useAuth()

  // This mock data should be replaced with a real API call
  const list = [
    { time: 'Tuần 3', note: 'Đang diễn ra', diem: 80, practi: 'Tham gia', style: 1 },
    { time: 'Tuần 2', note: 'Đã kết thúc', diem: 80, practi: 'Xem chi tiết', style: 2 },
  ]

  if (!user || !competition) return null

  return (
    <>
      <h3>Phần thi: {competition.name}</h3>
      <div className='test'>
        <div className='test__img'>
          <div className='test__img__icon'>
            {user.imageUrl && <img src={user.imageUrl} alt={user.fullName} />}
          </div>
          <div className='test__img__intro'>
            <p>Họ và tên: {user.fullName}</p>
            <p>Mã sinh viên: {user.studentCode}</p>
          </div>
        </div>
        <div className='test__thongtin'>
          <p>Khóa: {user.intake}</p>
          <p>Khóa (HIT): {user.intake}</p>
        </div>
      </div>
      <div className='test-table'>
        {list.map((item, index) => (
          <div className='test-table__box' key={index}>
            <div className='test-table__box__one'>
              <Icon
                icon='streamline-ultimate:ranking-stars-ribbon-bold'
                width='20'
                height='20'
                className='test-table__box__one__icon'
              />
              <span>{item.time}</span>
              <span
                className={
                  item.style === 1 ? 'test-table__box__one__span1' : 'test-table__box__one__span2'
                }>
                {item.note}
              </span>
            </div>
            <div className='test-table__box__two'>
              <span className='test-table__box__two__span1'>{item.diem}</span>
              <p
                className={item.style === 1 ? 'test-table__box__two__p' : ''}
                onClick={() => navigate(`/competitions/${competition.id}/test`)}>
                {item.practi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// ===================================================================
//  MAIN PAGE COMPONENT (THE LAYOUT/SHELL)
// ===================================================================

const InformationCompetition = () => {
  const { competitionsId } = useParams() // Note: Your route uses 'competitionsId'
  console.log('Competition ID:', competitionsId)
  const [competition, setCompetition] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompetition = async () => {
      if (!competitionsId) return
      try {
        setLoading(true)
        const response = await getCompetitionById(competitionsId)
        setCompetition(response.data)
      } catch (err) {
        toast.error('Không thể tải thông tin cuộc thi.')
      } finally {
        setLoading(false)
      }
    }
    fetchCompetition()
  }, [competitionsId])

  if (loading) return <div>Đang tải...</div>
  if (!competition) return <div>Không tìm thấy thông tin cuộc thi.</div>

  return (
    <div className='competition-infor'>
      <div className='competition-infor__left'>
        <div className='competition-infor__left__title'>
          <Icon
            icon='streamline-ultimate:ranking-stars-ribbon-bold'
            width='30'
            height='30'
            className='competition-infor__left__title__icon'
          />
          <h2>{competition.name}</h2>
        </div>
        <div className='competition-infor__left__board'>
          {competition.image ? (
            <img src={competition.image} alt={competition.name} />
          ) : (
            <i className='fa-solid fa-circle-info board'></i>
          )}
        </div>
        <div className='competition-infor__left__button'>
          {/* NavLink now points to the correct relative paths */}
          <NavLink to='.' className={({ isActive }) => (isActive ? 'btn active' : 'btn')} end>
            Giới thiệu
          </NavLink>
          <div className='divider'></div>
          <NavLink to='rules' className={({ isActive }) => (isActive ? 'btn active' : 'btn')}>
            Thể lệ
          </NavLink>
          <div className='divider'></div>
          <NavLink to='rating' className={({ isActive }) => (isActive ? 'btn active' : 'btn')}>
            Xếp hạng
          </NavLink>
          <div className='divider'></div>
          <NavLink to='my-test' className={({ isActive }) => (isActive ? 'btn active' : 'btn')}>
            <Icon
              icon='streamline-ultimate:messages-people-person-bubble-circle-1-bold'
              width='12'
              height='12'
            />{' '}
            Phần thi của bạn
          </NavLink>
        </div>
        <div className='competition-infor__left__bang'>
          {/* The Outlet renders the active tab and passes data down */}
          <Outlet context={{ competition }} />
        </div>
      </div>
      <div className='competition-infor__among'></div>
      <div className='competition-infor__right'>
        <div className='competition-infor__right__class'>
          <p>THAM GIA NHÓM CHAT ĐỂ NHẬN THÔNG TIN SỚM NHẤT !</p>
          <div className='competition-infor__right__class__board'>
            <div className='class-board'>
              <Icon
                icon='streamline-flex:mail-send-email-message-circle-solid'
                width='35'
                height='35'
                color='#ff6911'
                className='class-board__icon'
              />
              <h4>Chat Room</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// You must also export the tab components if they are used directly in the router
export { Rating, Rules, Introduction, YourTest }
export default InformationCompetition
