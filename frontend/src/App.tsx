import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import { setNavigate } from './lib/navigation'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AppContainer from './components/AppContainer'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Landing from './pages/nondashboard/Landing'
import LandingLayout from './pages/layout/LandingLayout'

export const Home = () => {
  return (
    <div>Home</div>
  )
}

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
  <Routes>
      <Route path="/" element={<AppContainer/>}>
        <Route index element={<Profile/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Route>

      <Route path="/landing" element={<LandingLayout />}>
        <Route index element={<Landing />} />
      </Route>

      <Route path="landing" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/email/verify/:code" element={<VerifyEmail/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset" element={<ResetPassword/>}/>
    </Routes>
  ) 
}

export default App
