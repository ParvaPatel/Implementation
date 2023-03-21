import React from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
const NavbarDoctor = (props) => {
    const username = props.username;
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/doctor/login");
        console.log("working");
    }
    return (
        <Navbar bg="dark" expand="lg" className="px-0 mx-0">
            <Container className="px-0 mx-2 text-white ">
                <Navbar.Brand onClick={() => navigate("/doctor/profile")} className="text-white bg-dark">EHR</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-1 px-3 " onClick={() => navigate("/doctor/profile/patientAccessList")}>
                        Patient Access List
                    </Nav>
                    <Dropdown className=" px-0 me-0">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Welcome {username}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleSubmit}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavbarDoctor;