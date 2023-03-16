import React from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';


const HomePage = () =>  {
  return (
    <div className="home-page">
      <h1>Welcome to the Health Care System</h1>
      <div className="options">
        <Link to="/patient/login" className="option patient">
          <h2>Are you a Patient?</h2>
          <p>Click here to continue</p>
        </Link>
        <Link to="/doctor/login" className="option doctor">
          <h2>Are you a Doctor?</h2>
          <p>Click here to continue</p>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
