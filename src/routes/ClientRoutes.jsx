// src/routes/ClientRoutes.jsx
import { Route } from 'react-router-dom'
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
      <Route path='manage/classes' element={<MainManage />} />
      <Route path='manage/classes/classID' element={<InformationManage />}>
        <Route path='' element={<Communication />} />
        <Route path='notifications' element={<Notification />} />
        <Route path='notifications/create' element={<MemberClass />} />
        <Route path='test' element={<TestContent />} />
        <Route path='test/comment' element={<TestContent />} />
        <Route path='members' element={<AllMember />} />
        <Route path='lessions' element={<ManageLesson />} />
        <Route path='lessions/create' element={<CreateLessonID />} />
        <Route path='lessions/lessionID' element={<VeiwsLesson />} />
      </Route>
      {/* trang viết quản lý competition của leader */}
      <Route path='manage/competitions' element={<ManageCompetitions />} />
      <Route path='manage/competitions/competitionID' element={<InformationOfCompet />} />
      <Route path='manage/competitions/competitionID/rules' element={<RulesOfManageCompet />} />
      <Route path='manage/competitions/competitionID/test' element={<TestOfManageCompet />} />
      <Route path='manage/competitions/competitionID/members' element={<IntroOfCompetAdmin />} />
      <Route path='manage/competitions/competitionID/comment' element={<CommentOfCompet />} />
      {/* trang viết thông tin cá nhân */}
      <Route path='account' element={<HomeAccount />} />
    </Route>
  </>
)

export default ClientRoutes
