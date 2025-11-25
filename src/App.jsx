import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DonorDashboard from './pages/dashboards/DonorDashboard'
import RecipientDashboard from './pages/dashboards/RecipientDashboard'
import AdminDashboard from './pages/dashboards/AdminDashboard'
import OrganRegistration from './pages/OrganRegistration'
import OrganRequest from './pages/OrganRequest'
import MatchingStatus from './pages/MatchingStatus'
import QualityCheck from './pages/QualityCheck'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import { USER_ROLES } from './context/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute allowedRoles={Object.values(USER_ROLES)} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/donor" element={<DonorDashboard />} />
            <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/organ-registration" element={<OrganRegistration />} />
            <Route path="/organ-request" element={<OrganRequest />} />
            <Route path="/matching-status" element={<MatchingStatus />} />
            <Route path="/quality-checks" element={<QualityCheck />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
