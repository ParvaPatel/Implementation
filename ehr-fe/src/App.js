import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PatientLoginPage from './components/PatientLoginPage';
import DoctorLoginPage from './components/DoctorLoginPage';
import PatientRegisterPage from './components/PatientRegisterPage';
import DoctorRegisterPage from './components/DoctorRegisterPage';
import PatientProfilePage from './components/PatientProfilePage';
import DoctorProfilePage from './components/DoctorProfilePage';
import DoctorAccessList from './components/patientComponents/DoctorAccessList';
import DoctorList from './components/patientComponents/DoctorList';
import PatientAccessList from './components/doctorComponents/PatientAccessList';
import AddPatientData from './components/doctorComponents/AddPatientData';
//Patient Components

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
            <Route path="/patient/profile" element={<PatientProfilePage/>} />
            <Route path="/doctor/profile" element={<DoctorProfilePage/>} />
            <Route path="/patient/profile/docAccessList" element={<DoctorAccessList/>} />
            <Route path="/patient/profile/docList" element={<DoctorList/>} />
            <Route path="/doctor/profile/patientAccessList" element={<PatientAccessList/>} />
            <Route path="/doctor/profile/patientAccessList/AddViewData" element={<AddPatientData/>} />


          </Routes>
      </div>
    </Router>
  );
}

export default App;
