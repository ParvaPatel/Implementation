// DoctorRegisterPage.js
import React, { useState } from 'react';
import "../css/Register.css";
const DoctorRegisterPage = () => {
    const [doctorName, setDoctorName] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [specilization, setSpecilization] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState('');
    const [PrivateAddress, setPrivateAddress] = useState('');
    const [PublicAddress, setPublicAddress] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // console.log(patientName);
      // TODO: handle form submission
    };
  return (
    <div>
      <h1>Doctor Registration</h1>
      {/* Add registration form here */}
      <div className="register-page">
        <h1>Register as a Doctor</h1>
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