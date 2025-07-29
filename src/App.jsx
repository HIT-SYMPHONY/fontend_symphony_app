import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import './scss/style.scss'
// link của admin
import MainOfAdmin from './components/Admin/HomeOfAdmin/MainOfAdmin'
import Login from './components/StartLoginPage/LoginPage'
import CheckOfClassAdmin from './components/Admin/ClassOfAdmin/CheckOfClass'
import CreateOfMain from './components/Admin/HomeOfAdmin/CreateOfMain'
import InforOfAdmin from './components/Admin/HomeOfAdmin/InforOfAdmin'
import MainOfClassAdmin from './components/Admin/ClassOfAdmin/MainOfClass'
import CreateOfClassAdmin from './components/Admin/ClassOfAdmin/CreateOfClass'
import MemberOfClassAdmin from './components/Admin/ClassOfAdmin/MemberOfAdmin'
import MainOfCompet from './components/Admin/CompetOfAdmin/MainOfCompet'
import CreateOfCompetAdmin from './components/Admin/CompetOfAdmin/CreateOfCompet'
import MemberOfCompetAdmin from './components/Admin/CompetOfAdmin/MemberOfCompet'
import AdminPage from './pages/AdminPage'
import IntroOfCompetAdmin from './components/Admin/CompetOfAdmin/IntroOfCompet'
import RolusOfCompetAdmin from './components/Admin/CompetOfAdmin/RolusOfAdmin'
import ListOfGroup from './components/Admin/CompetOfAdmin/ListOfGroup'
import CreateOfMess from './components/Admin/CompetOfAdmin/CreateOfMess'
import DecentOfAdmin from './components/Admin/DecentOfAdmin'
import AccountOfAdmin from './components/Admin/AccoutOfAdmin'
import Confirm from './components/StartLoginPage/FixPassword'
// link của user và leader
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/FixPassword' element={<Confirm />} />
        <Route path='admin' element={<AdminPage />}>
          <Route path='home' element={<MainOfAdmin />} />
          <Route path='home/create' element={<CreateOfMain />} />
          <Route path='home/information' element={<InforOfAdmin />} />
          <Route path='manage' element={<MainOfClassAdmin />} />
          <Route path='manage/create' element={<CreateOfClassAdmin />} />
          <Route path='manage/information' element={<CheckOfClassAdmin />} />
          <Route path='manage/manageofmember' element={<MemberOfClassAdmin />} />
          <Route path='competition' element={<MainOfCompet />} />
          <Route path='competition/create' element={<CreateOfCompetAdmin />} />
          <Route path='competition/information' element={<IntroOfCompetAdmin />} />
          <Route path='competition/rules' element={<RolusOfCompetAdmin />} />
          <Route path='competition/memberofcompetition' element={<MemberOfCompetAdmin />} />
          <Route path='competition/notification' element={<ListOfGroup />} />
          <Route path='competition/notification/create' element={<CreateOfMess />} />
          <Route path='decent' element={<DecentOfAdmin />} />
          <Route path='account' element={<AccountOfAdmin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
