import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

const NavbarPatient = (props) => {
    const username = props.username;
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/patient/login");
        console.log("working");
      }
    
    
    return (
        <>
            <Navbar bg="dark" expand="lg" className='w-100'>
                <Container className="px-0 mx-2 text-white w-100">
                    <Navbar.Brand  className="text-white bg-dark" onClick={() => navigate("/patient/profile")}>EHR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-1 px-3 ">
                            All Health Records
                        </Nav>
                        <Nav className="ms-1 px-3 " onClick={() => navigate("/patient/profile/docList")}>
                            Doctor  List
                        </Nav>
                        <Nav className="ms-1 px-3 " onClick={() => navigate("/patient/profile/docAccessList")}>
                            Doctor Access List
                        </Nav>
                        <div className='w-90 '>
                            <Dropdown className=" ps-9 me-0 ">
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Welcome {username}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleSubmit} >Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}
export default NavbarPatient;