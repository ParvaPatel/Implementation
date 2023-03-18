// PatientLoginPage.js
import React, { useState } from 'react';
import '../css/Login.css';
import { Link } from 'react-router-dom';
import generateDecrypted from '../utils/generateDecrypted';
import saveCredentials from '../utils/saveCredentials';
import { Buffer } from 'buffer';
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const PatientLoginPage = () => {
  var backendURL = 'http://localhost:5000'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [PrivateAddress, setPrivateAddress] = useState('');
  // const [PublicAddress, setPublicAddress] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello");
    let response = await fetch(backendURL + "/p/" + username, {
      method: "GET",
      cache: "no-cache"
    })

    if (response.ok) {
      let keyPair = await response.json()

      console.log(keyPair['doctorAccessList']);
      console.log(keyPair['ipfsHashes']);

      let encryptedPrivateKeyBuffer = Buffer.from(keyPair['private_key'], 'base64');
      let encryptedPasswordBuffer = Buffer.from(keyPair['password'], 'base64');

      // let decryptedPassword = "dfd";
      // let decryptedPrivateKey = "cvrver";
      try {
        let decryptedPasswordBuffer = await generateDecrypted(username, password, encryptedPasswordBuffer);
        let decryptedPrivateKeyBuffer = await generateDecrypted(username, password, encryptedPrivateKeyBuffer);

        let decryptedPassword = Buffer.from(decryptedPasswordBuffer).toString();
        let decryptedPrivateKey = Buffer.from(decryptedPrivateKeyBuffer).toString();

        if (decryptedPassword === password) {
          saveCredentials(username, keyPair['public_key'], decryptedPrivateKey, decryptedPassword);
          localStorage.setItem('ipfsHashes', JSON.stringify(keyPair['ipfsHashes']));
          localStorage.setItem('doctorAccessList', JSON.stringify(keyPair['doctorAccessList']));
          localStorage.setItem('type', 'patient');
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
    <>

      <div className="Logindiv">
        <h1 className='login-header'>Patient Login</h1>
        <div className="login-page">

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
              <Link to="/patient/register" >
                For new users Click here to Register
              </Link>
            </div>
          </form>
          <div className='backButton'>
          <Link to='/'><button type="button" className='btn btn-outline-danger'  >Home</button></Link>

          </div>

        </div>


      </div>
    </>
  );
}
export default PatientLoginPage;
