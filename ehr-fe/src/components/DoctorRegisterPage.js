// DoctorRegisterPage.js
import React, { useState } from 'react';
import "../css/Register.css";
import {Buffer} from 'buffer';
import saveCredentials from  '../utils/saveCredentials';
import generateEncryptedPrivateKey_Password from '../utils/generateEncryptedPrivateKey_Password';

const DoctorRegisterPage = () => {

    var backendURL = 'http://localhost:5000'


    const [doctorName, setDoctorName] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [specilization, setSpecilization] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState('');
    const [privateAddress, setPrivateAddress] = useState('');
    const [publicAddress, setPublicAddress] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      const [encryptedPrivateKey,encryptedPassword] = await generateEncryptedPrivateKey_Password(emailAddress,password,privateAddress);
      let publicKeyString = publicAddress.toString('base64');

      const encryptedPrivateKeyString = Buffer.from(encryptedPrivateKey).toString('base64');
      const encryptedPasswordString = Buffer.from(encryptedPassword).toString('base64');


      const data = {
        doctorName: doctorName,
        privateAddress: encryptedPrivateKeyString,
        publicAddress: publicKeyString,
        password: encryptedPasswordString,
        contactNumber: contactNumber,
        emailAddress: emailAddress,
        age: age,
        gender: gender,
        doctorId: doctorId
      }

      let response = await fetch(backendURL + "/d/", {
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

      const responseData = await response.json();
      if (response.ok) {
        if(responseData === "Account already exists"){
          alert("Already Registered");
          console.log("Already Registered");
        }else{
          alert("Registered Successfully");
          console.log("Registered Successfully");
          saveCredentials(data.emailAddress,data.publicAddress, privateAddress,password);
          localStorage.setItem('type', 'doctor');
          window.location.replace("profile");
        }
        return true;
      }else{
        alert("Error in Registration");
        console.log("Error in Registration");
      }


    };
  return (
    <div>
      <h1>Doctor Registration</h1>
      {/* Add registration form here */}
      <div className="register-page">
        {/* <h1>Register as a Doctor</h1> */}
        <form onSubmit={handleSubmit}>
        <label>
            Doctor License Id:
            <input
              type="text"
              value={doctorId}
              onChange={(event) => setDoctorId(event.target.value)}
              required
            />
          </label>
          <label>
            Doctor Name:
            <input
              type="text"
              value={doctorName}
              onChange={(event) => setDoctorName(event.target.value)}
              required
            />
          </label>
          <label>
            Specilization:
            <input
              type="text"
              value={specilization}
              onChange={(event) => setSpecilization(event.target.value)}
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

export default DoctorRegisterPage;