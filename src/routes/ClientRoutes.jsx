// src/routes/ClientRoutes.jsx
import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtecedRoute/ProtectedRoute'
import HomeInformation from '../components/StartClassPage/StartMyClass/InformationClass'
import StartMain from '../pages/StartMain'
import HomePage from '../pages/HomePage'
import Confirm from '../components/StartLoginPage/FixPassword'
import MainClass from '../pages/ClassPage/MyClass'
import ListMember from '../pages/ClassPage/MyResult'
import PublicPage from '../components/StartCompetition/PublicPage'
import ManagePage from '../pages/ManagePage'
import GetAllClasses from '../pages/GetAllClasses'
import Classroom from '../components/StartClassPage/StartMyClass/Classroom'
import AllClassroom from '../components/StartClassPage/StartMyClass/AllClassroom'
import Lesson from '../components/StartClassPage/StartMyClass/Lession'
import Main from '../components/StartHomePage/MainPage'
import DashboardOfMain from '../pages/DashboardOfMain'
import Exam from '../components/StartClassPage/StartMyClass/Exam'
import MainCompetition from '../components/StartCompetition/MainPage'
import InformationCompetition from '../components/StartCompetition/InformationPage'
import Assignment from '../components/StartCompetition/Assignment'
import Complete from '../components/StartCompetition/Complete'
import HomeAccount from '../components/StartAccount/HomeAccount'
const ClientRoutes = (
  <>
    <Route
      path='/client'
      element={
        <ProtectedRoute allowedRoles={['USER', 'LEADER']}>
          <DashboardOfMain />
        </ProtectedRoute>
      }>
      {/* trang chủ và lớp  */}
      <Route path='home' element={<Main />} />
      {/* trang toàn bộ lớp học  */}
      <Route path='profile' element={<AllClassroom />} />
      <Route path='profile/classID' element={<HomeInformation />} />
      <Route path='profile/classID/lessionID' element={<Lesson />} />
      <Route path='profile/classID/examID' element={<Exam />} />
      <Route path='profile/my-classes/classID/lessionID' element={<Lesson />} />
      <Route path='profile/my-classes/classID/examID' element={<Exam />} />
      {/* trang lớp học và thông tin lớp học của toàn bộ lớp học  */}
      <Route path='profile/my-classes' element={<Classroom />} />
      <Route path='profile/my-classes/classID' element={<HomeInformation />} />
      <Route path='profile/my-classes/classID/lessionID' element={<Lesson />} />
      <Route path='profile/my-classes/classID/examID' element={<Exam />} />
      <Route path='profile/my-classes/classID/lessionID' element={<Lesson />} />
      <Route path='profile/my-classes/classID/examID' element={<Exam />} />
      {/* trang kết quả của học sinh với lớp học  */}
      <Route path='profile/my-results' element={<ListMember />} />
      {/* trang viết cuộc thi công khai */}
      <Route path='competitions' element={<MainCompetition />} />
      <Route path='competitions/competitionsID' element={<InformationCompetition />} />
      <Route path='competitions/competitionsID/test' element={<Assignment />} />
      <Route path='competitions/competitionsID/comment' element={<Complete />} />
      {/* trang viết quản lý class của leader */}
      {/* trang viết quản lý competition của leader */}
      {/* trang viết thông tin cá nhân */}
      <Route path='account' element={<HomeAccount />} />
    </Route>
  </>
)

export default ClientRoutes
