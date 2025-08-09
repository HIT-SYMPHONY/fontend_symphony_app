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
import Communication from '../components/StartManageClass/Communication'
import Notification from '../components/StartManageClass/Notification'
import CreateLesson from '../components/StartManageClass/CreateLesson'
import TestContent from '../components/StartManageClass/TestContent'
import CreateNotification from '../components/StartManageClass/MemberClass'
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
import EditLesson from '../components/StartManageClass/EditLesson'
import {
  Introduction,
  Rules,
  Rating,
  YourTest,
} from '../components/StartCompetition/InformationPage'
import EditLesson from '../components/StartManageClass/EditLesson'
import AccountPage from '../pages/AccountPage'
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
        <Route path=':classId' element={<HomeInformation />} />
        <Route path=':classId/lessons/:lessonId' element={<Lesson />} />
        <Route path=':classId/exams/examId' element={<Exam />} />
      </Route>
      {/* trang kết quả của học sinh với lớp học  */}
      <Route path='my-results' element={<ListMember />} />
      <Route path='my-results/comment' element={<Complete />} />
      {/* trang cuộc thi công khai */}
      <Route path='competitions'>
        <Route index element={<MainCompetition />} />
        <Route path=':competitionsId' element={<InformationCompetition />}>
          <Route index element={<Introduction />} /> {/* Default tab */}
          <Route path='rules' element={<Rules />} />
          <Route path='rating' element={<Rating />} />
          <Route path='my-test' element={<YourTest />} />{' '}
        </Route>
        <Route path=':competitionsId/test' element={<Assignment />} />
        <Route path=':competitionsId/comment' element={<Complete />} />
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
        <Route path='classes/:classId' element={<InformationManage />}>
          <Route index element={<Communication />} />
          <Route path='notifications' element={<Notification />} />
          <Route path='notifications/create' element={<CreateNotification />} />
          <Route path='lessons/:lessonId/test' element={<VeiwsLesson />} />
          <Route path='members' element={<AllMember />} />
          <Route path='lessons' element={<ManageLesson />} />
          <Route path='lessons/create' element={<CreateLessonID />} />
          <Route path='tests' element={<TestContent />} />
          <Route path='lessons/:lessonID' element={<VeiwsLesson />} />
          <Route path='lessons/:lessonID/edit' element={<EditLesson />}></Route>
        </Route>
        <Route path='competitions' element={<ManageCompetitions />} />
        <Route path='competitions/:competitionId' element={<InformationOfCompet />} />
        <Route path='competitions/:competitionId/rules' element={<RulesOfManageCompet />} />
        <Route path='competitions/:competitionId/test' element={<TestOfManageCompet />} />
        <Route path='competitions/:competitionId/members' element={<IntroOfCompetAdmin />} />
        <Route path='competitions/:competitionId/comment' element={<CommentOfCompet />} />
      </Route>

      {/* trang viết thông tin cá nhân */}
      <Route path='account' element={<AccountPage />} />
    </Route>
  </>
)

export default ClientRoutes
