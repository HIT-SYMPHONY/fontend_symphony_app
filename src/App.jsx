import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
// import './scss/style.scss'

// src/AppRoutes.jsx
import LoginPage from './components/StartLoginPage/LoginPage'
import AdminRoutes from './routes/AdminRoutes'
import ClientRoutes from './routes/ClientRoutes'
import Confirm from './components/StartLoginPage/Confirm'

const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<LoginPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/forgot-password' element={<Confirm />} />
    {ClientRoutes}
    {AdminRoutes}
  </Routes>
)

export default AppRoutes
