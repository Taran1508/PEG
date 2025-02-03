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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/investor" element={<InvestorLogin />} />
          <Route path="/login/company" element={<CompanyLogin />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/register/company" element={<ComapanyRegister />} />
          <Route path="/register/investor" element={<InvestorRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
