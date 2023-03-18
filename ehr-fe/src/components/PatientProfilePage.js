import React ,{ useEffect, useState} from 'react';
import { Navigate } from 'react-router';
import '../css/PatientProfilePage.css';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
// import DoctorAccessList from './patientComponents/DoctorAccessList';

// import {}
import { Container, Navbar, Nav ,Dropdown } from 'react-bootstrap';
const PatientProfilePage = () => {
    var num = 1;
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
        if(num==1){
          alert('Session Expired');
          num++;
        }
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

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
      let path = `./patientComponents/doctorAccessList.js`; 
      navigate(path);
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
              <Nav className="ms-1 px-3 " onClick={() => navigate("./docAccessList")}>
              {/* <button onClick={() => navigate("./patientComponents/doctorAccessList.js")}>
                Doctor Access List2
                </button> */}

              {/* <Button color="primary" className="px-4"
            onClick={routeChange}
              > */}
              {/* <Link to="#DoctorAccessList"> */}
                Doctor Access List
              {/* </Link> */}
              
              {/* </Button> */}

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

            <div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Applicant Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Application for</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">margotfoster@example.com</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$120,000</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">About</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                              </svg>
                              <span className="ms-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                            </div>
                            <div className="ms-4 flex-shrink-0">
                              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                              </svg>
                              <span className="ms-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                            </div>
                            <div className="ms-4 flex-shrink-0">
                              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

            </div>
        </div>
    );
}
export default PatientProfilePage;


//  localStorage.setItem('username', JSON.stringify(username));
//  localStorage.setItem('publicAddress', JSON.stringify(publicAddress));
//  localStorage.setItem('privateAddress', JSON.stringify(privateAddress));
//  localStorage.setItem('password', JSON.stringify(password));

