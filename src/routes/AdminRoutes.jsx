import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminPage from '../pages/AdminPage'

import MainOfAdmin from '../components/Admin/HomeOfAdmin/MainOfAdmin'
import CreateOfMain from '../components/Admin/HomeOfAdmin/CreateOfMain'
import InforOfAdmin from '../components/Admin/HomeOfAdmin/InforOfAdmin'

import MainOfClassAdmin from '../components/Admin/ClassOfAdmin/MainOfClass'
import CreateOfClassAdmin from '../components/Admin/ClassOfAdmin/CreateOfClass'
import CheckOfClassAdmin from '../components/Admin/ClassOfAdmin/CheckOfClass'
import MemberOfClassAdmin from '../components/Admin/ClassOfAdmin/MemberOfAdmin'

import MainOfCompet from '../components/Admin/CompetOfAdmin/MainOfCompet'
import CreateOfCompetAdmin from '../components/Admin/CompetOfAdmin/CreateOfCompet'
import IntroOfCompetAdmin from '../components/Admin/CompetOfAdmin/IntroOfCompet'
import RolusOfCompetAdmin from '../components/Admin/CompetOfAdmin/RolusOfAdmin'
import MemberOfCompetAdmin from '../components/Admin/CompetOfAdmin/MemberOfCompet'
import ListOfGroup from '../components/Admin/CompetOfAdmin/ListOfGroup'
import CreateOfMess from '../components/Admin/CompetOfAdmin/CreateOfMess'

import DecentOfAdmin from '../components/Admin/DecentOfAdmin'
import AccountOfAdmin from '../components/Admin/AccoutOfAdmin'

const AdminRoutes = () => (
  <Route
    path='/admin'
    element={
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <AdminPage />
      </ProtectedRoute>
    }>
    <Route index element={<MainOfAdmin />} />
    <Route path='home' element={<MainOfAdmin />} />
    <Route path='home/create' element={<CreateOfMain />} />
    <Route path='home/information/:userId' element={<InforOfAdmin />} />

    <Route path='manage' element={<MainOfClassAdmin />} />
    <Route path='manage/create' element={<CreateOfClassAdmin />} />
    <Route path='manage/information/:classId' element={<CheckOfClassAdmin />} />
    <Route path='manage/members/:classId' element={<MemberOfClassAdmin />} />

    <Route path='competition' element={<MainOfCompet />} />
    <Route path='competition/create' element={<CreateOfCompetAdmin />} />
    <Route path='competition/:competitionId'>
      <Route path='information' element={<IntroOfCompetAdmin />} />
      <Route path='rules' element={<RolusOfCompetAdmin />} />
      <Route path='members' element={<MemberOfCompetAdmin />} />
      <Route path='notifications' element={<ListOfGroup />} />
      <Route path='notifications/create' element={<CreateOfMess />} />
    </Route>

    <Route path='decent' element={<DecentOfAdmin />} />
    <Route path='account' element={<AccountOfAdmin />} />
  </Route>
)

export default AdminRoutes
