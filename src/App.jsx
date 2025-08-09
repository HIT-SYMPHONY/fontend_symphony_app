import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import './scss/style.scss'

// src/AppRoutes.jsx
import LoginPage from './components/StartLoginPage/LoginPage'
import AdminRoutes from './routes/AdminRoutes'
import ClientRoutes from './routes/ClientRoutes'
import Confirm from './components/StartLoginPage/Confirm'
import AuthListener from './components/AuthListener/AuthListener'
import { Toaster } from 'react-hot-toast'
import MissingPage from './pages/MissingPage'
import UnauthorizedPage from './pages/UnauthorizedPage'

const App = () => (
  <>
    <Toaster position='top-right' toastOptions={{ duration: 3000 }} />
    <AuthListener />
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/forgot-password' element={<Confirm />} />
      <Route path='/unauthorized' element={<UnauthorizedPage />} />
      {ClientRoutes}
      {AdminRoutes}
      <Route path='*' element={<MissingPage />} />
    </Routes>
  </>
)

export default App
