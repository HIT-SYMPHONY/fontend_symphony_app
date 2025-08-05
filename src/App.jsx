import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import './scss/style.scss'
import InformationClass from './components/StartClassPage/StartMyClass/InformationClass'

// src/AppRoutes.jsx
import LoginPage from './components/StartLoginPage/LoginPage'
import Confirm from './components/StartLoginPage/FixPassword'
import AdminRoutes from './routes/AdminRoutes'
import ClientRoutes from './routes/ClientRoutes'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/FixPassword' element={<InformationClass />} />

    {ClientRoutes}
    {AdminRoutes}
  </Routes>
)

export default AppRoutes
