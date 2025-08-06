// src/routes/ClientRoutes.jsx
import { Outlet, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtecedRoute/ProtectedRoute'
import HomeInformation from '../components/StartClassPage/StartMyClass/InformationClass'
import ListMember from '../pages/ClassPage/MyResult'
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
import MainManage from '../components/StartManageClass/MainManage'
import InformationManage from '../components/StartManageClass/Information'
import { Communication } from '../components/StartManageClass/Information'
import Notification from '../components/StartManageClass/Notification'
import CreateLesson from '../components/StartManageClass/CreateLesson'
import TestContent from '../components/StartManageClass/TestContent'
import MemberClass from '../components/StartManageClass/MemberClass'
import AllMember from '../components/StartManageClass/AllMember'
import ManageLesson from '../components/StartManageClass/ManageLesson'
import CreateLessonID from '../components/StartManageClass/CreateLesson'
import VeiwsLesson from '../components/StartManageClass/VeiwsLesson'
import ManageCompetitions from '../components/StartManageClass/ManageCompetitions'
import IntroOfCompetAdmin from '../components/Admin/CompetOfAdmin/IntroOfCompet'
import InformationOfCompet from '../components/StartManageClass/InformationOfCompet'
import RulesOfManageCompet from '../components/StartManageClass/RulesOfManageCompet'
import TestOfManageCompet from '../components/StartManageClass/TestOfManageCompet'
import CommentOfCompet from '../components/StartManageClass/CommentOfCompet'
const ClientRoutes = (
  <>
    <Route
      path='/'
      element={
        <ProtectedRoute allowedRoles={['USER', 'LEADER']}>
          <DashboardOfMain />
        </ProtectedRoute>
      }>
      {/* trang chủ và lớp  */}
      <Route path='home' element={<Main />} />
      {/* trang lớp học và thông tin lớp học của toàn bộ lớp học  */}
      <Route path='my-classes'>
        <Route index element={<Classroom />} />
        <Route path='classID' element={<HomeInformation />} />
        <Route path='classID/lessons/lessonID' element={<Lesson />} />
        <Route path='classID/exams/examID' element={<Exam />} />
      </Route>
      {/* trang kết quả của học sinh với lớp học  */}
      <Route path='my-results' element={<ListMember />} />
      {/* trang cuộc thi công khai */}
      <Route path='competitions'>
        <Route index element={<MainCompetition />} />
        <Route path=':competitionsID' element={<InformationCompetition />} />
        <Route path=':competitionsID/test' element={<Assignment />} />
        <Route path=':competitionsID/comment' element={<Complete />} />
      </Route>
      {/* các trang quản lý của leader */}
      <Route
        path='manage'
        element={
          <ProtectedRoute allowedRoles={['LEADER']}>
            <Outlet />
          </ProtectedRoute>
        }>
        <Route index element={<MainManage />}></Route>
        <Route path='classes' element={<MainManage />} />
        <Route path='classes/:classID' element={<InformationManage />}>
          <Route index element={<Communication />} />
          <Route path='notifications' element={<Notification />} />
          <Route path='notifications/create' element={<MemberClass />} />
          <Route path='test' element={<TestContent />} />
          <Route path='test/comment' element={<TestContent />} />
          <Route path='members' element={<AllMember />} />
          <Route path='lessons' element={<ManageLesson />} />
          <Route path='lessons/create' element={<CreateLessonID />} />
          <Route path='lessons/:lessonID' element={<VeiwsLesson />} />
        </Route>
        <Route path='competitions' element={<ManageCompetitions />} />
        <Route path='competitions/:competitionID' element={<InformationOfCompet />} />
        <Route path='competitions/:competitionID/rules' element={<RulesOfManageCompet />} />
        <Route path='competitions/:competitionID/test' element={<TestOfManageCompet />} />
        <Route path='competitions/:competitionID/members' element={<IntroOfCompetAdmin />} />
        <Route path='competitions/:competitionID/comment' element={<CommentOfCompet />} />
      </Route>

      {/* trang viết thông tin cá nhân */}
      <Route path='account' element={<HomeAccount />} />
    </Route>
  </>
)

export default ClientRoutes
