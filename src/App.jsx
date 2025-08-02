import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './scss/style.scss'

import AuthListener from './components/AuthListener/AuthListener'
import ProtectedRoute from './components/ProtecedRoute/ProtectedRoute'
import LoginPage from './components/StartLoginPage/LoginPage'
import Confirm from './components/StartLoginPage/Confirm'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import HomeAccount from './pages/AccountPage'

import AdminPage from './pages/AdminPage'
import MainOfAdmin from './components/Admin/HomeOfAdmin/MainOfAdmin'
import CreateOfMain from './components/Admin/HomeOfAdmin/CreateOfMain'
import InforOfAdmin from './components/Admin/HomeOfAdmin/InforOfAdmin'
import MainOfClassAdmin from './components/Admin/ClassOfAdmin/MainOfClass'
import CreateOfClassAdmin from './components/Admin/ClassOfAdmin/CreateOfClass'
import CheckOfClassAdmin from './components/Admin/ClassOfAdmin/CheckOfClass'
import MemberOfClassAdmin from './components/Admin/ClassOfAdmin/MemberOfAdmin'
import MainOfCompet from './components/Admin/CompetOfAdmin/MainOfCompet'
import CreateOfCompetAdmin from './components/Admin/CompetOfAdmin/CreateOfCompet'
import IntroOfCompetAdmin from './components/Admin/CompetOfAdmin/IntroOfCompet'
import RolusOfCompetAdmin from './components/Admin/CompetOfAdmin/RolusOfAdmin'
import MemberOfCompetAdmin from './components/Admin/CompetOfAdmin/MemberOfCompet'
import ListOfGroup from './components/Admin/CompetOfAdmin/ListOfGroup'
import CreateOfMess from './components/Admin/CompetOfAdmin/CreateOfMess'
import DecentOfAdmin from './components/Admin/DecentOfAdmin'
import AccountOfAdmin from './components/Admin/AccoutOfAdmin'

function App() {
  return (
    <div className='app'>
      <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
      <AuthListener />

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot-password' element={<Confirm />} />

        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <HomeAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'LEADER']}>
              <AdminPage />
            </ProtectedRoute>
          }>
          <Route index element={<MainOfAdmin />} />
          <Route path='home' element={<MainOfAdmin />} />
          <Route path='home/create' element={<CreateOfMain />} />
          <Route path='home/information/:userId' element={<InforOfAdmin />} />
          <Route path='classes'>
            <Route index element={<MainOfClassAdmin />} />
            <Route path='create' element={<CreateOfClassAdmin />} />
            <Route path=':classId' element={<CheckOfClassAdmin />} />
          </Route>
          <Route path='members/:classId' element={<MemberOfClassAdmin />} />
          <Route path='competitions'>
            <Route index element={<MainOfCompet />} />
            <Route path='create' element={<CreateOfCompetAdmin />} />
            <Route path=':competitionId'>
              <Route index element={<IntroOfCompetAdmin />} />
              <Route path='rules' element={<RolusOfCompetAdmin />} />
              <Route path='members' element={<MemberOfCompetAdmin />} />
              <Route path='notifications' element={<ListOfGroup />} />
              <Route path='notifications/create' element={<CreateOfMess />} />
            </Route>
          </Route>
          <Route path='decent' element={<DecentOfAdmin />} />
          <Route path='account' element={<AccountOfAdmin />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
