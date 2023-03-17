// PatientRegisterPage.js
import React, { useState } from 'react';
import "../css/Register.css";
import Web3 from 'web3';
import { Buffer } from 'buffer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import generateKeyPair from '../utils/generateKeyPair';
import PatientProfilePage from './PatientProfilePage';
import saveCredentials from  '../utils/saveCredentials';
// import getAESKey from '../utils/getAESKey';
import generateEncryptedPrivateKey_Password from '../utils/generateEncryptedPrivateKey_Password';


const PatientRegisterPage = () => {

    var backendURL = 'http://localhost:5000'
    const [patientName, setPatientName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState('');
    const [privateAddress, setPrivateAddress] = useState('');
    const [publicAddress, setPublicAddress] = useState('');
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const [encryptedPrivateKey,encryptedPassword] = await generateEncryptedPrivateKey_Password(emailAddress,password,privateAddress);
      // console.log(encryptedPrivateKey);
      let publicKeyString = publicAddress.toString('base64');

      // console.log(publicKeyString);

      const encryptedPrivateKeyString = Buffer.from(encryptedPrivateKey).toString('base64');
      const encryptedPasswordString = Buffer.from(encryptedPassword).toString('base64');
      const data = {
        patientName: patientName, 
        privateAddress: encryptedPrivateKeyString, 
        publicAddress: publicKeyString, 
        password: encryptedPasswordString,
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        age: age,
        gender: gender
      };
      // console.log(data);

      let response = await fetch(backendURL + "/p/", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            'data': data
        })
      });
      const response_ = await response.json();
      
      if (response.ok) {
        
        if(response_ === "Account already exists"){
          alert("Already Registered");
          console.log("Already Registered");
        }else{
          alert("Registered Successfully");
          console.log("Registered Successfully");
          saveCredentials(data.emailAddress,data.publicAddress, privateAddress,password);
          localStorage.setItem('type', 'patient');
          window.location.replace("profile");
        }
        return true;
      }else{
        alert("Error in Registration");
        console.log("Error in Registration");
      }



      // Connect to blockchain
      // const web3 = new Web3('http://127.0.0.1:8545');
      
      // web3.eth.getAccounts().then(accounts => {
      //     console.log(accounts);
      // });
      // const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      // web3.eth.getAccounts().then((accounts) => {
      //   accounts.forEach((address) => {
      //     const privateKey = web3.eth.getPrivateKey(address);
      //     const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      //     console.log(`Address: ${account.address}, Private Key: ${account.privateKey}`);
      //   });
      // })
      // .catch((error) => {
      //   console.error(error);
      // });




      // web3.eth.net.isListening().then(() => {
      //   console.log('Ganache is running');
      // }).catch(() => {
      //   console.log('Ganache is not running');
      // });
      // const { address } = web3.eth.accounts.create();
      // console.log("Account : "+account.address);

      // TODO: handle form submission
    };
    

  return (
    <div>
      <h1>Patient Registration</h1>
        <div className="register-page">
        <form onSubmit={handleSubmit}>
          <label>
            Patient Name:
            <input
              type="text"
              value={patientName}
              onChange={(event) => setPatientName(event.target.value)}
              required
            />
          </label>

          <label>
            Contact Number:
            <input
              type="tel"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              required
            />
          </label>

          <label>
            Email Address:
            <input
              type="email"
              value={emailAddress}
              onChange={(event) => setEmailAddress(event.target.value)}
              required
            />
          </label>

          <label>
            Gender:
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
            />
          </label>
         
          <label>
          Private Address:
          <input
            type="text"
            value={privateAddress}
            onChange={(e) => setPrivateAddress(e.target.value)}
          />
        </label>

        <label>
          Public Address:
          <input
            type="text"
            value={publicAddress}
            onChange={(e) => setPublicAddress(e.target.value)}
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
          <button type="submit">Register</button>
        </form>
      </div>
  
    </div>
  );
}

export default PatientRegisterPage;
