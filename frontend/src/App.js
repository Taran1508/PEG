import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LoginPages/LandingPage';
import InvestorLogin from './LoginPages/InvestorLogin';
import CompanyLogin from './LoginPages/CompanyLogin';
import StudentLogin from './LoginPages/StudentLogin';
import HomePage from './HomePage/HomePage';
import StudentRegister from './RegisterPages/StudentRegister';
import ComapanyRegister from './RegisterPages/companyRegister';
import InvestorRegister from './RegisterPages/investorRegister';
import RbacRegister from './RegisterPages/rbacRegistration.jsx';
import JobseekerLogin from './LoginPages/JobseekerLogin';
import FounderLogin from './LoginPages/FounderLogin';
import JobseekerRegister from './RegisterPages/jobseekerRegister';
import FounderRegister from './RegisterPages/founderRegister';
import StudentProfilePage from './ProfilePages/studentProfilePage';
import InvestorProfilePage from './ProfilePages/investorProfilePage';
import CompanyProfilePage from './ProfilePages/companyProfilePage';
import JobseekerProfilePage from './ProfilePages/jobseekerProfilePage';
import FounderProfilePage from './ProfilePages/founderProfilePage';
import ForgotPassword from './forgotPass/forgotPassword.jsx';
import ResetPassword from './forgotPass/resetPassword.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RbacRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Student Routes */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/profile/student" element={<StudentProfilePage />} />

          {/* Investor Routes */}
          <Route path="/login/investor" element={<InvestorLogin />} />
          <Route path="/register/investor" element={<InvestorRegister />} />
          <Route path="/profile/investor" element={<InvestorProfilePage />} />
          {/* Company Routes */}
          <Route path="/login/company" element={<CompanyLogin />} />
          <Route path="/register/company" element={<ComapanyRegister />} />
          <Route path="/profile/company" element={<CompanyProfilePage />} />
          {/* Jobseeker Routes */}
          <Route path="/login/jobseeker" element={<JobseekerLogin />} />
          <Route path="/register/jobseeker" element={<JobseekerRegister />} />
          <Route path="/profile/jobseeker" element={<JobseekerProfilePage />} />
          {/* Founder Routes */}
          <Route path="/login/founder" element={<FounderLogin />} />
          <Route path="/register/founder" element={<FounderRegister />} />
          <Route path="/profile/founder" element={<FounderProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
