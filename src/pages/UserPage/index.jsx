// import React, { useState, useEffect, useContext } from 'react'
// import { Icon } from '@iconify/react'
// import { GlobalContext } from '../../dataContext'
// import { useNavigate } from 'react-router-dom'
// import icon from './../../assets/img/Ellipse.png'
// import { Outlet } from 'react-router-dom'
// import logo from './../../assets/img/logo.png'
// import Schedule from '../SchedulePage'
// import Homework from '../Homework'
// import Logout from '../../components/Logout'
// import Main from '../../components/StartHomePage/MainPage'
// import DataInitialState from '../../data/dataSV'
// import MainOfAdmin from '../../components/Admin/HomeOfAdmin/MainOfAdmin'
// import CreateOfMain from '../../components/Admin/HomeOfAdmin/CreateOfMain'
// import InforOfAdmin from '../../components/Admin/HomeOfAdmin/InforOfAdmin'
// import MainOfClassAdmin from '../../components/Admin/ClassOfAdmin/MainOfClass'
// import CreateOfClassAdmin from '../../components/Admin/ClassOfAdmin/CreateOfClass'
// import CheckOfClassAdmin from '../../components/Admin/ClassOfAdmin/CheckOfClass'
// import MainOfCompet from '../../components/Admin/CompetOfAdmin/MainOfCompet'
// import CreateOfCompetAdmin from '../../components/Admin/CompetOfAdmin/CreateOfCompet'
// import IntroOfCompetAdmin from '../../components/Admin/CompetOfAdmin/IntroOfCompet'
// import RolusOfCompetAdmin from '../../components/Admin/CompetOfAdmin/RolusOfAdmin'
// import MemberOfCompetAdmin from '../../components/Admin/ClassOfAdmin/MemberOfAdmin'
// import ReplaceOfAdmin from '../../components/Admin/NotiOfAdmin/ReplaceOfNoti'
// import CreateOfHomeAdmin from '../../components/Admin/HomeOfAdmin/CreateOfMain'
// import CreateOfNoti from '../../components/Admin/NotiOfAdmin/CreateOfNoti'

// import './style.scss'

// const AdminPage = () => {
//   const { showMain, setShowMain, showNoti, setShowNoti } = useContext(GlobalContext)
//   const navigate = useNavigate()
//   const [frame, setFrame] = useState(false)
//   const [showThen, setShowThen] = useState({
//     one: false,
//     two: false,
//   })
//   const [showManage, setShowManage] = useState(false)
//   const [showLink, setShowLink] = useState({
//     home: false,
//     manage: false,
//     decent: false,
//     account: false,
//     logout: false,
//   })
//   const handleThen = (index) => {
//     const then = {
//       one: false,
//       two: false,
//     }
//     switch (index) {
//       case 1:
//         navigate('/admin/manage')
//         handleColor(6)
//         then.one = true
//         break
//       case 2:
//         navigate('/admin/competition')
//         handleColor(6)
//         then.two = true
//         break

//       default:
//         break
//     }

//     setShowThen(then)
//   }
//   const handleColor = (index) => {
//     let newLink = {
//       home: false,
//       manage: false,
//       decent: false,
//       account: false,
//       logout: false,
//     }

//     switch (index) {
//       case 1:
//         handleThen(0)
//         newLink.home = true
//         navigate('/admin/home')
//         break
//       case 2:
//         setShowManage(!showManage)
//         handleThen(1)
//         navigate('/admin/manage')
//         newLink.manage = true
//         break
//       case 3:
//         navigate('/admin/decent')
//         handleThen(0)
//         newLink.decent = true
//         break
//       case 4:
//         navigate('/admin/account')
//         handleThen(0)
//         newLink.account = true
//         break
//       case 5:
//         handleThen(0)
//         newLink.logout = true
//         break
//       case 6:
//         newLink.manage = true
//         break
//       default:
//         handleThen(0)
//         break
//     }

//     setShowLink(newLink)
//   }

//   const handleLogout = (index) => {
//     handleColor(5)
//     setFrame(true)
//   }

//   return (
//     <div className='homepage'>
//       <div className='homepage__choose'>
//         <div className='homepage__choose__img'>
//           <img src={icon} alt='Profile' />
//         </div>
//         <h3 className='homepage__choose__h3'>Chào Tên!</h3>
//         <div
//           className={showLink.home ? 'homepage__choose__click origin' : 'homepage__choose__click'}
//           onClick={() => handleColor(1)}>
//           <i className='fa-solid fa-house'></i>
//           <span>Trang chủ</span>
//         </div>
//         <div
//           className={showLink.manage ? 'homepage__choose__click origin' : 'homepage__choose__click'}
//           onClick={() => handleColor(2)}>
//           <Icon
//             icon='mdi:book-account'
//             width='22'
//             height='22'
//             className='homepage__choose__click__Icon'
//           />
//           <span>Quản lý</span>
//         </div>
//         {showManage ? (
//           <div>
//             <div
//               className={
//                 showThen.one ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
//               }
//               onClick={() => handleThen(1)}>
//               <Icon
//                 icon='fluent:book-star-24-regular'
//                 className='homepage__choose__clickone__Icon'
//               />
//               <span>Lớp học</span>
//             </div>
//             <div
//               className={
//                 showThen.two ? 'homepage__choose__clickone child' : 'homepage__choose__clickone'
//               }
//               onClick={() => handleThen(2)}>
//               <Icon
//                 icon='streamline-ultimate:ranking-stars-ribbon-bold'
//                 className='homepage__choose__clickone__Icon'
//               />
//               <span>Cuộc thi</span>
//             </div>
//           </div>
//         ) : (
//           ''
//         )}

//         <div
//           className={showLink.decent ? 'homepage__choose__click origin' : 'homepage__choose__click'}
//           onClick={() => handleColor(3)}>
//           <Icon icon='fluent:people-star-24-filled' className='homepage__choose__click__Icon' />
//           <span>Phân quyền </span>
//         </div>

//         <div
//           className={
//             showLink.account ? 'homepage__choose__click origin' : 'homepage__choose__click'
//           }
//           onClick={() => handleColor(4)}>
//           <i className='fa-solid fa-circle-user'></i>
//           <span>Tài khoản</span>
//         </div>
//         <div
//           className={showLink.logout ? 'homepage__choose__click origin' : 'homepage__choose__click'}
//           onClick={() => handleLogout(5)}>
//           <Icon icon='mage:shut-down-fill' className='homepage__choose__click__Icon' />
//           <span>Đăng xuất</span>
//         </div>
//       </div>
//       <div className='homepage__main'>
//         <div className='homepage__main__search'>
//           <div className='search'>
//             <div className='search__icon'>
//               <img src={logo} alt='Logo' width='50px' height='50px' />
//               <div className='search__icon__box'>
//                 <input type='text' placeholder='Tìm kiếm...' />
//                 <i className='fa-solid fa-magnifying-glass'></i>
//               </div>
//             </div>
//             <div className='search__then'>
//               <Icon
//                 icon='streamline-flex:mail-send-email-message-circle-solid'
//                 width='26'
//                 height='26'
//                 className='search__then__Icon'
//               />

//               <Icon
//                 icon='mingcute:notification-newdot-line'
//                 width='26'
//                 height='26'
//                 className='search__then__Icon'
//               />
//             </div>
//           </div>
//           {/* here */}
//           {/* <MainOfAdmin /> */}
//           {/* <CreateOfMain /> */}
//           {/* <InforOfAdmin /> */}
//           {/* <MainOfClassAdmin /> */}
//           {/* <CreateOfClassAdmin /> */}
//           {/* <CheckOfClassAdmin /> */}
//           {/* <MainOfCompet /> */}
//           {/* <CreateOfCompetAdmin /> */}
//           {/* <IntroOfCompetAdmin /> */}
//           {/* <RolusOfCompetAdmin /> */}
//           {/* <MemberOfCompetAdmin /> */}
//           <Outlet />
//           {/* <CreateOfHomeAdmin /> */}
//         </div>
//       </div>
//       {frame ? <Logout onSetFrame={setFrame} /> : ''}
//       {showMain ? <ReplaceOfAdmin /> : ''}
//       {showNoti ? <CreateOfNoti /> : ''}
//     </div>
//   )
// }

// export default AdminPage
// java -jar BackendSymphony-0.0.1-SNAPSHOT.jar

// import React, { useState, useRef, useEffect } from 'react'
// import { Icon } from '@iconify/react'
// import { Outlet } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
// import './style.scss'

// const CreateOfClassAdmin = () => {
//   const navigate = useNavigate()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [selectedClass, setSelectedClass] = useState('Tất cả')
//   const [classOptions, setClassOptions] = useState(['Tất cả'])

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

//   return (
//     <div className='create-class-admin'>
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
//           <form className='create-class-admin__content-body__form'>
//             <div className='create-class-admin__content-body__form-item'>
//               <div>
//                 <label>Tên lớp học</label>
//                 <input type='text' placeholder='Tên lớp học' />
//               </div>
//               <div>
//                 <label>Leader</label>
//                 <input type='text' placeholder='Leader' />
//               </div>
//             </div>
//             <div className='create-class-admin__content-body__form-table'>
//               <div>
//                 <label>Ngày bắt đầu</label>
//                 <input type='date' />
//               </div>
//               <div>
//                 <label>Độ dài lớp học</label>
//                 <input type='text' placeholder='Độ dài lớp học' />
//               </div>
//             </div>

//             <div className='create-class-admin__content-body__form-context'>
//               <div>
//                 <div
//                   className='create-compet-admin__context-enter__left-upload'
//                   onClick={() => fileInputRef.current.click()}>
//                   <Icon icon='ic:round-upload' className='upload-icon' />
//                   <span>Tải ảnh lên</span>
//                   <input
//                     type='file'
//                     accept='image/*'
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     style={{ display: 'none' }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label>Mô tả</label>
//                 <textarea placeholder='Nhập text...' className='textarea'></textarea>
//               </div>
//             </div>
//           </form>
//         </div>
//         <div className='create-class-admin__content-button'>
//           <button>Tạo</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateOfClassAdmin
