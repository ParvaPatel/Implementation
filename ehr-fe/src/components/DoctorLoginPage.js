import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import generateDecrypted from '../utils/generateDecrypted';
import saveCredentials from '../utils/saveCredentials';
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';

const DoctorLoginPage = () => {
  var backendURL = 'http://localhost:5000'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(backendURL + "/d/" + username, {

      method: "GET",
      cache: "no-cache"
    })
    if (response.ok) {
      let keyPair = await response.json()

      console.log(keyPair);

      let encryptedPrivateKeyBuffer = Buffer.from(keyPair['private_key'], 'base64');
      let encryptedPasswordBuffer = Buffer.from(keyPair['password'], 'base64');

      try {
        let decryptedPasswordBuffer = await generateDecrypted(username, password, encryptedPasswordBuffer);
        let decryptedPrivateKeyBuffer = await generateDecrypted(username, password, encryptedPrivateKeyBuffer);

        let decryptedPassword = Buffer.from(decryptedPasswordBuffer).toString();
        let decryptedPrivateKey = Buffer.from(decryptedPrivateKeyBuffer).toString();

        if (decryptedPassword === password) {
          saveCredentials(username, keyPair['public_key'], decryptedPrivateKey, decryptedPassword);
          localStorage.setItem('type', 'doctor');

          window.location.replace("profile");
          alert('Login successful --> Redirecting to profile page');
          console.log('Login successful');
        }
        else {
          alert('Wrong User credentials');
          console.log('Wrong User credentials');
        }
      } catch (error) {
        alert('Wrong User credentials!');
        console.log('Wrong User credentials');
      }

    } else {
      alert('No user found');
      console.log('No user found');
    }
  };
  // let navigate = useNavigate();
  // const history = useHistory();
  const handleClick = () => {
    window.location.href = 'http://localhost:3000';
  };
  return (
    <div>
      <h1 className='login-header'>Doctor Login</h1>
      {/* Add login form here */}
      <div className="login-page">
        {/* <h2> Patient Login </h2> */}

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Username (EmailId):
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <Link to="/doctor/register" >
              Not have an account ? Register up here
            </Link>
          </div>

        </form>
        <div className='backButton'>
          <Link to='/'><button type="button" className='btn btn-outline-danger'  >Home</button></Link>
        </div>
      </div>

    </div>
  );
}

export default DoctorLoginPage;