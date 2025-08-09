// src/routes/AdminRoutes.jsx
import { Route } from 'react-router-dom'
import ProtectedRoute from '../components/ProtecedRoute/ProtectedRoute'
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
import AccountPage from '../pages/AccountPage'
import Classroom from '../components/StartClassPage/StartMyClass/Classroom'
import Lesson from '../components/StartClassPage/StartMyClass/Lession'
import HomeInformation from '../components/StartClassPage/StartMyClass/InformationClass'

const AdminRoutes = (
  <Route
    path='/admin'
    element={
      <ProtectedRoute allowedRoles={'ADMIN'}>
        <AdminPage />
      </ProtectedRoute>
    }>
    <Route index element={<MainOfAdmin />} />
    <Route path='home' element={<MainOfAdmin />} />
    <Route path='users'>
      <Route index element={<MainOfAdmin />}></Route>
      <Route path='create' element={<CreateOfMain />}></Route>
      <Route path=':userId' element={<InforOfAdmin />} />
      <Route path=':userId/classes/:classId' element={<HomeInformation />}></Route>
    </Route>
    {/* Class Management */}
    <Route path='classes'>
      <Route index element={<MainOfClassAdmin />} />
      <Route path='create' element={<CreateOfClassAdmin />} />
      <Route path=':classId' element={<CheckOfClassAdmin />} />
      <Route path=':classId/members' element={<MemberOfClassAdmin />} />
    </Route>
    {/* Competitions */}
    <Route path='competitions'>
      <Route index element={<MainOfCompet />} />
      <Route path='create' element={<CreateOfCompetAdmin />} />
      <Route path=':competitionId'>
        <Route index element={<IntroOfCompetAdmin />} />
        <Route path='rules' element={<RolusOfCompetAdmin />} />
        <Route path='members' element={<MemberOfCompetAdmin />} />
        <Route path='notifications' element={<ListOfGroup />} />
        <Route path='notifications/create' element={<CreateOfMess />} />
      </Route>
    </Route>

    {/* Other */}
    <Route path='decent' element={<DecentOfAdmin />} />
    <Route path='account' element={<AccountPage />} />
  </Route>
)

export default AdminRoutes
