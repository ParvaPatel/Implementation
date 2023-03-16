import React, { useState } from 'react';
import '../css/Login.css';
import {Link} from 'react-router-dom';

const DoctorLoginPage = () => {
  const [doctorId, setDoctorId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your login authentication logic here
  };

  return (
    <div>
      <h1 className='login-header'>Doctor Login</h1>
      {/* Add login form here */}
      <div className="login-page">
      {/* <h2> Patient Login </h2> */}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Doctor Id:
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <div className='navigateToRegister'>
          <Link  to="/doctor/register" >
            Not have an account ? Register up here 
          </Link>
          </div>
        
      </form>
    </div>
      
    </div>
  );
}

export default DoctorLoginPage;