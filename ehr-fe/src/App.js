import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PatientLoginPage from './components/PatientLoginPage';
import DoctorLoginPage from './components/DoctorLoginPage';
import PatientRegisterPage from './components/PatientRegisterPage';
import DoctorRegisterPage from './components/DoctorRegisterPage';

function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route path="/patient/login" element={<PatientLoginPage/>} />
            <Route path="/doctor/login" element={<DoctorLoginPage/>} />
            <Route path="/patient/register" element={<PatientRegisterPage/>} />
            <Route path="/doctor/register" element={<DoctorRegisterPage/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
