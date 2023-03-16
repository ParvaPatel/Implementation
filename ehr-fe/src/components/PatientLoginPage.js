// PatientLoginPage.js
import React, { useState } from 'react';
import '../css/Login.css';
import {Link} from 'react-router-dom';
import generateEncrypted from '../utils/generateEncrypted';
import generateDecrypted from '../utils/generateDecrypted';
import getAESKey from '../utils/getAESKey';
import { Buffer } from 'buffer';
// import React from 'react';

const PatientLoginPage = () => {
  var backendURL = 'http://localhost:5000'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [PrivateAddress, setPrivateAddress] = useState('');
  // const [PublicAddress, setPublicAddress] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const AESKey = await getAESKey(username, password);
    // const iv = Buffer.from((username + 'username12345678901234567890').slice(0, 16));

    console.log(username, password);
    
    const encryptedPassword = await generateEncrypted(username, password, password);

    let response = await fetch(backendURL + "/p/" + username, {
      method: "GET",
      cache: "no-cache"
    })

    if (response.ok) {
      let keyPair = await response.json()
      console.log(keyPair);

    //   let decryptedPrivateKey = await crypto.subtle.decrypt(
    //     {
    //         name: "AES-CBC",
    //         iv: iv,
    //     },
    //     AESKey,
    //     Buffer.from(keyPair['private_key'], 'base64')
    // )
    // console.log(decryptedPrivateKey);
      let encryptedPrivateKeyBuffer = Buffer.from(keyPair['private_key'],'base64');
      let encryptedPasswordBuffer = Buffer.from(keyPair['password'],'base64');
      
      let decryptedPassword = await generateDecrypted(username, password, encryptedPasswordBuffer);
      let decryptedPrivateKey = await generateDecrypted(username, password, encryptedPrivateKeyBuffer);
      console.log(Buffer.from(decryptedPrivateKey).toString());
      console.log(Buffer.from(decryptedPassword).toString());
    } else {
        console.log('No user found');
    }


    // console.log(encryptedPassword);


    // Your login authentication logic here
  };

  return (
    <div>
      <h1 className='login-header'>Patient Login</h1>
      {/* Add login form here */}
      <div className="login-page">
      {/* <h2> Patient Login </h2> */}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
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
