import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import './scss/style.scss'
import Login from './components/StartLoginPage/LoginPage'
import Confirm from './components/StartLoginPage/FixPassword'
import PublicPage from './components/StartCompetition/PublicPage'
import InformationClass from './components/StartClassPage/StartMyClass/InformationClass'
import MainCompetition from './components/StartCompetition/MainPage'
import InformationCompetition from './components/StartCompetition/InformationPage'
import Assignment from './components/StartCompetition/Assignment'
import Complete from './components/StartCompetition/Complete'
import { HomeInformation } from './components/StartClassPage/StartMyClass/InformationClass'
import Exam from './components/StartClassPage/StartMyClass/Exam'
import Lesson from './components/StartClassPage/StartMyClass/Lession'
import ChatRoom from './components/ChatRoom'
import ManagePage from './pages/ManagePage'
import MainClass from './pages/ClassPage/MyClass'
import ListMember from './pages/ClassPage/MyResult'
import HomePage from './pages/HomePage'
import HomeAccount from './pages/AccountPage'

function App() {
  return (
    <div className='app'>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/competition" element={<PublicPage />}>
          <Route path="" element={<MainCompetition />} />
          <Route path="information" element={<InformationCompetition />} />
          <Route path="information/contest" element={<Assignment />} />
        </Route>
        <Route path="/account" element={<HomeAccount />} />
        <Route path="/myclass" element={<MainClass />} />
        <Route path="/myresult" element={<ListMember />} />

        <Route path="/login" element={<Login />} />
        <Route path="/information" element={<InformationClass />}>
          <Route path="" element={<HomeInformation />} />
          <Route path="exam" element={<Exam />} />
          <Route path="lesson" element={<Lesson />} />
        </Route>

        <Route path="/manage" element={<managePage />}></Route>

        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes> */}
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/myclass' element={<MainClass />} />
        <Route path='/myresult' element={<ListMember />} />
        <Route path='/account' element={<HomeAccount />} />
        <Route path='/competition' element={<PublicPage />}>
          <Route path='' element={<MainCompetition />} />
          <Route path='information' element={<InformationCompetition />} />
          <Route path='information/contest' element={<Assignment />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
