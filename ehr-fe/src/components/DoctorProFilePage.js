import React ,{ useEffect, useState} from 'react';
import { Container, Navbar, Nav ,Dropdown } from 'react-bootstrap';
import { Navigate } from 'react-router';

const DoctorProfilePage = () => {
    // var num=1;
    const [type, setType] = useState("");
    const [username, setUsername] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [privateAddress, setPrivateAddress] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
      const type = localStorage.getItem('type');
      const username = localStorage.getItem('username');
      const publicAddress = localStorage.getItem('publicAddress');
      const privateAddress = localStorage.getItem('privateAddress');
      const password = localStorage.getItem('password');
      if(username){
         setUsername(username);
      }
      if(publicAddress){
         setPublicAddress(publicAddress);
      }
      if(privateAddress){
        setPrivateAddress(privateAddress);
      }
      if(password){
         setPassword(password);
      }
      if(type){
        setType(type);
      }
      if(type !== "doctor"){
        // if(num==1){
        //   alert('Session Expired');
        //   num++;
        // }
        window.location.href = "/doctor/login";
        return <Navigate to = "/doctor/login" />
      }
    },[]
    );
    return(
        <div>
        <Navbar bg="dark" expand="lg" className="px-0 mx-0">
          <Container className="px-0 mx-2 text-white ">
            <Navbar.Brand href="#home" className="text-white bg-dark">EHR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-1 px-3 ">
                All Health Records
              </Nav>
              <Nav className="ms-1 px-3 ">
                Doctor Access List
              </Nav>
                <Dropdown className=" px-0 me-0">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Welcome {username}
                  </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>
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