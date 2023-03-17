// PatientLoginPage.js
import React, { useState } from 'react';
import '../css/Login.css';
import {Link} from 'react-router-dom';
import generateDecrypted from '../utils/generateDecrypted';
import saveCredentials from '../utils/saveCredentials';
import { Buffer } from 'buffer';

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

      console.log(keyPair);

      let encryptedPrivateKeyBuffer = Buffer.from(keyPair['private_key'],'base64');
      let encryptedPasswordBuffer = Buffer.from(keyPair['password'],'base64');
      
      // let decryptedPassword = "dfd";
      // let decryptedPrivateKey = "cvrver";
      try{
        let decryptedPasswordBuffer = await generateDecrypted(username, password, encryptedPasswordBuffer);
        let decryptedPrivateKeyBuffer = await generateDecrypted(username, password, encryptedPrivateKeyBuffer);

        let decryptedPassword = Buffer.from(decryptedPasswordBuffer).toString();
        let decryptedPrivateKey = Buffer.from(decryptedPrivateKeyBuffer).toString();

        if (decryptedPassword === password) {
          saveCredentials(username,keyPair['public_key'], decryptedPrivateKey, decryptedPassword);
          localStorage.setItem('type', 'patient');
          window.location.replace("profile");
          alert('Login successful --> Redirecting to profile page');
          console.log('Login successful');
        }
        else {
            alert('Wrong User credentials');
            console.log('Wrong User credentials');
          }
      } catch(error){
        alert('Wrong User credentials!');
        console.log('Wrong User credentials');
      }

    } else {
        alert('No user found');
        console.log('No user found');
    }

  };

  return (
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
        
        {/* <label>
          Private Address:
          <input
            type="text"
            value={PrivateAddress}
            onChange={(e) => setPrivateAddress(e.target.value)}
          />
        </label>
        <label>
          Public Address:
          <input
            type="text"
            value={PublicAddress}
            onChange={(e) => setPublicAddress(e.target.value)}
          />
        </label> */}
        <button type="submit">Login</button>
        <div className='navigateToRegister'>
        <Link  to="/patient/register" >
           For new users Click here to Register
        </Link>
        </div>
      </form>
        
    </div>
      
    </div>
  );
}
export default PatientLoginPage;
