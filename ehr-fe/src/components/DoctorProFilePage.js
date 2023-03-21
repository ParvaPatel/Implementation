import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Navigate } from 'react-router';
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import NavbarDoctor from './NavbarDoctor';


const DoctorProfilePage = () => {
  var num = 1;
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const type = localStorage.getItem('type') || "";
    const username = localStorage.getItem('username') || "";
    const publicAddress = localStorage.getItem('publicAddress') || "";
    const privateAddress = localStorage.getItem('privateAddress') || "";
    const password = localStorage.getItem('password') || "";
    setUsername(username);
    setPublicAddress(publicAddress);
    setPrivateAddress(privateAddress);
    setPassword(password);
    setType(type);
    if (type !== "doctor") {
      if (num == 1) {
        alert('Session Expired');
        num++;
      }
      window.location.href = "/doctor/login";
      return <Navigate to="/doctor/login" />
    }
  }, []
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    // window.location.replace("login");
    window.location.href = "/doctor/login";
    console.log("working");
  }
  let navigate = useNavigate();

  // const history = useHistory();
  // const handleBackClick = () => {
  //   history.goBack();
  // };


  return (
    <div>
      <NavbarDoctor username={username} />

      {/* <button onClick={handleBackClick}>Back</button> */}
      <h2>
        {console.log(username)}
        {console.log(publicAddress)}
        {console.log(privateAddress)}
        {console.log(password)}
        Doctor Logged in.
      </h2>
    </div>
  );
}
export default DoctorProfilePage;