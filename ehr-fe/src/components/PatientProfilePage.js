import React ,{ useEffect, useState} from 'react';
import { Navigate } from 'react-router';
import '../css/PatientProfilePage.css';
// import {}
import { Container, Navbar, Nav ,Dropdown } from 'react-bootstrap';
const PatientProfilePage = () => {
    // var num = 1;
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
      if(type !== "patient"){
        // if(num==1){
        //   alert('Session Expired');
        //   num++;
        // }
        window.location.href = "/patient/login";
        return <Navigate to = "/patient/login" />
      }
    },[]
    );

    

    const handleSubmit = async (event) => {
      event.preventDefault();
      localStorage.clear();
      // window.location.replace("login");
      window.location.href = "/patient/login";
      console.log("working");
    }

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
                Patient Access List
              </Nav>
                <Dropdown className=" px-0 me-0">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Welcome {username}
                  </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item  onClick={handleSubmit} >Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
            </Navbar.Collapse>
          </Container>
        </Navbar>


          

                {console.log(username)}
                {console.log(publicAddress)}
                {console.log(privateAddress)}
                {console.log(password)}
            <h2>
                Patient Logged in.
               
            </h2>
        </div>
    );
}
export default PatientProfilePage;


//  localStorage.setItem('username', JSON.stringify(username));
//  localStorage.setItem('publicAddress', JSON.stringify(publicAddress));
//  localStorage.setItem('privateAddress', JSON.stringify(privateAddress));
//  localStorage.setItem('password', JSON.stringify(password));