import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () =>  {
  return (
    <div>
      <h1>Welcome to our website</h1>
      <p>Please select an option:</p>
      <ul>
        <li><Link to="/patient/login">Patient</Link></li>
        <li><Link to="/doctor/login">Doctor</Link></li>
      </ul>
    </div>
  );
}

export default HomePage;
