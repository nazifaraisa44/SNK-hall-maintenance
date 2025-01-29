import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import Dashboard from './Components/Dashboard'
import UserComplaint from './Components/UserComplaint'; 
import SubmittedCom from './Components/SubmittedCom';
import InprocessCom from './Components/InprocessCom';
import MyProfile from './Components/MyProfile';
import DissatisfiedCom from './Components/DissatisfiedCom';
import CompletedCom from './Components/CompletedCom';
import Report from './Components/report';
import AdminHome from './Components/AdminHome';
import Notice from './Components/Notice'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import AboutUs from './Components/AboutUs'
import UserInfo from './Components/UserInfo'
import AdminProfile from './Components/AdminProfile'
import ProvostHome from './Components/ProvostHome'
import SubmittedComProvost from './Components/SubmittedComProvost'
import AdminHomeProvost from './Components/AdminHomeProvost'
import ReportProvost from './Components/ReportProvost'
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path = "/login" element={<Login />}></Route>
      <Route path = "/signup" element={<Signup />}></Route>

        
        
        

        
        <Route path='/' element={<Home />}></Route>
        
        
        <Route path = "/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path = "/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path='/usercomplaint' element={<UserComplaint />} ></Route>
        <Route path='/submittedCom' element={<SubmittedCom />} ></Route>
        <Route path='/inprocessCom' element={<InprocessCom />} ></Route>
        <Route path='/dissatisfied' element={<DissatisfiedCom />} ></Route>
        <Route path='/completed' element={<CompletedCom />} ></Route>
        <Route path='/myprofile' element={<MyProfile />} ></Route>
        <Route path='/report' element={<Report />} ></Route>
        <Route path='/adminhome' element={<AdminHome />} ></Route>
        <Route path='/notice' element={<Notice />} ></Route>
        <Route path='/aboutus' element={<AboutUs />} ></Route>
        <Route path='/userinfo' element={<UserInfo />} ></Route>
        <Route path='/adminprofile' element={<AdminProfile />} ></Route>
        <Route path='/provosthome' element={<ProvostHome/>} ></Route>
        <Route path='/submittedcomprovost' element={<SubmittedComProvost/>} ></Route>
        <Route path='/adminhomeprovost' element={<AdminHomeProvost/>} ></Route>
        <Route path='/reportprovost' element={<ReportProvost/>} ></Route>
        
        <Route element={<ProtectedRoutes isAuthenticated={false} />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
