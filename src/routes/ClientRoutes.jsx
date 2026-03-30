// src/routes/ClientRoutes.jsx
import { Outlet, Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtecedRoute/ProtectedRoute'
import HomeInformation from '../components/StartClassPage/StartMyClass/InformationClass'
import ListMember from '../pages/ClassPage/MyResult'
import Classroom from '../components/StartClassPage/StartMyClass/Classroom'
import Lesson from '../components/StartClassPage/StartMyClass/Lession'
import Main from '../components/StartHomePage/MainPage'
import DashboardOfMain from '../pages/DashboardOfMain'
import Exam from '../components/StartClassPage/StartMyClass/Exam'
import MainCompetition from '../components/StartCompetition/MainPage'
import Assignment from '../components/StartCompetition/Assignment'
import Complete from '../components/StartCompetition/Complete'
import MainManage from '../components/StartManageClass/MainManage'
import InformationManage from '../components/StartManageClass/Information'
import Communication from '../components/StartManageClass/Communication'
import Notification from '../components/StartManageClass/Notification'
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
import EditLesson from '../components/StartManageClass/EditLesson/index'
import AccountPage from '../pages/AccountPage'
import CreateTest from '../components/StartManageClass/CreateTest'
import ManageTest from 'components/StartManageClass/ManageTest'
import EditTest from 'components/StartManageClass/EditTest'
import MyNotificationsPage from 'pages/MyNotificationsPage'
import Comment from 'components/StartClassPage/StartMyClass/Comment'
import CommentOfTests from 'pages/CommentOfTests'
import GradeTestPage from 'pages/GradeTestPage'
import CompetitionDetailPage from 'pages/CompetitionDetailPage'
import CompetitionInfosPage from 'pages/CompetitionInfosPage'
import CompetitionRulesPage from 'pages/CompetitionRulesPage/CompetitionRulesPage'
import CompetitionRankingPage from 'pages/CompetitionRankingPage'
import CompetitionTestsPage from 'pages/CompetitionTestsPage'
import CompetitionSubmissionPage from 'pages/CompetitionSubmissionPage'
import CompetitionScorePage from 'pages/CompetitionScorePage'
import ManageCompetitionPage from 'pages/LeaderManageCompetitionPage'
import LeaderManageCompetitionPage from 'pages/LeaderManageCompetitionPage'
import LeaderCompetitionInfosPage from 'pages/LeaderCompetitionInfosPage'
import LeaderCompetitionRulesPage from 'pages/LeaderCompetitionRulesPage'
import LeaderCompetitionParticipantsPage from 'pages/LeaderCompetitionParticipantsPage'
import LeaderCompetitionAnswersPage from 'pages/LeaderCompetitionAnswersPage'
const ClientRoutes = (
  <>
    <Route
      path='/'
      element={
        <ProtectedRoute allowedRoles={['USER', 'LEADER', 'ADMIN']}>
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
        <Route path=':classId/exams/:examId' element={<Exam />} />
        <Route path=':classId/exams/:examId/score' element={<Comment />}></Route>
      </Route>
      {/* trang kết quả của học sinh với lớp học  */}
      <Route path='my-results' element={<ListMember />} />
      <Route path='my-results/comment' element={<Complete />} />
      {/* trang cuộc thi công khai */}
      <Route path='competitions'>
        <Route index element={<MainCompetition />} />
        <Route path=':competitionId' element={<CompetitionDetailPage />}>
          <Route path='description' element={<CompetitionInfosPage />} />
          <Route path='rules' element={<CompetitionRulesPage />} />
          <Route path='ranking' element={<CompetitionRankingPage />} />
          <Route path='my-test' element={<CompetitionTestsPage />} />
        </Route>
        <Route path=':competitionId/test' element={<CompetitionSubmissionPage />} />
        <Route path=':competitionId/score' element={<CompetitionScorePage />} />
      </Route>
      <Route path='notifications' element={<MyNotificationsPage></MyNotificationsPage>}></Route>
      {/* các trang quản lý của leader */}
      <Route
        path='manage'
        element={
          <ProtectedRoute allowedRoles={['LEADER', 'ADMIN']}>
            <Outlet />
          </ProtectedRoute>
        }>
        <Route index element={<MainManage />}></Route>
        <Route path='classes' element={<MainManage />} />
        <Route path='classes/:classId' element={<InformationManage />}>
          <Route index element={<Communication />} />
          <Route path='notifications' element={<Notification />} />
          <Route path='notifications/create' element={<CreateNotification />} />
          <Route path='tests/:testId/grade' element={<VeiwsLesson />} />
          <Route path='members' element={<AllMember />} />
          <Route path='lessons' element={<ManageLesson />} />
          <Route path='lessons/create' element={<CreateLessonID />} />
          <Route path='lessons/:lessonId' element={<VeiwsLesson />} />
          <Route path='lessons/:lessonId/edit' element={<EditLesson />}></Route>
          <Route path='tests' element={<ManageTest />} />
          {/* <Route path='tests' element={<TestContent />} /> */}
          <Route path='tests/create' element={<CreateTest />}></Route>
          <Route path='tests/:testId/edit' element={<EditTest></EditTest>}></Route>
          <Route path='tests/:testId/comments' element={<CommentOfTests></CommentOfTests>}></Route>
          <Route path='tests/:testId/comments/:commentId/grade' element={<GradeTestPage />}></Route>
        </Route>
        <Route path='competitions'>
          <Route index element={<ManageCompetitions />} />
          <Route path=':competitionId' element={<LeaderManageCompetitionPage />}>
            <Route path='infos' element={<LeaderCompetitionInfosPage />} />
            <Route path='rules' element={<LeaderCompetitionRulesPage />} />
            <Route path='tests' element={<LeaderCompetitionAnswersPage />} />
            <Route path='participants' element={<LeaderCompetitionParticipantsPage />} />
          </Route>
        </Route>
      </Route>

      {/* trang viết thông tin cá nhân */}
      <Route path='account' element={<AccountPage />} />
    </Route>
  </>
)

export default ClientRoutes
