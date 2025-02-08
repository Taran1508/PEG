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
import JobseekerLogin from './LoginPages/JobseekerLogin';
import FounderLogin from './LoginPages/FounderLogin';
import JobseekerRegister from './RegisterPages/jobseekerRegister';
import FounderRegister from './RegisterPages/founderRegister';
import StudentProfilePage from './ProfilePages/studentProfilePage';
import InvestorProfilePage from './ProfilePages/investorProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LandingPage />} />
          {/* Student Routes */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/profile/investor" element={<InvestorProfilePage />} />
          {/* Investor Routes */}
          <Route path="/login/investor" element={<InvestorLogin />} />
          <Route path="/register/investor" element={<InvestorRegister />} />
          <Route path="/profile/student" element={<StudentProfilePage />} />
          {/* Company Routes */}
          <Route path="/login/company" element={<CompanyLogin />} />
          <Route path="/register/company" element={<ComapanyRegister />} />
          {/* Jobseeker Routes */}
          <Route path="/login/jobseeker" element={<JobseekerLogin />} />
          <Route path="/register/jobseeker" element={<JobseekerRegister />} />
          {/* Founder Routes */}
          <Route path="/login/founder" element={<FounderLogin />} />
          <Route path="/register/founder" element={<FounderRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
