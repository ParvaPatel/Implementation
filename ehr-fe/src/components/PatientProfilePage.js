import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import '../css/PatientProfilePage.css';
// import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
// import DoctorAccessList from './patientComponents/DoctorAccessList';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import NavbarPatient from './NavbarPatient'
import IpfsCard from './doctorComponents/IpfsCard';

const PatientProfilePage = ({ipfs}) => {
  var num = 1;
  var backendURL = 'http://localhost:5000';
  const [type, setType] = useState("");
  const [username, setUsername] = useState("");
  const [publicAddress, setPublicAddress] = useState("");
  const [privateAddress, setPrivateAddress] = useState("");
  const [password, setPassword] = useState("");
  const [ipfsHashes, setIpfsHashes] = useState([]);
  const [doctorAccessList, setDoctorAccessList] = useState([]);


  useEffect(() => {

    const type = localStorage.getItem('type')||"";
    const username = localStorage.getItem('username')||"";
    const publicAddress = localStorage.getItem('publicAddress')||"";
    const privateAddress = localStorage.getItem('privateAddress')||"";
    const password = localStorage.getItem('password')||"";
    const ipfsHashes = JSON.parse(localStorage.getItem('ipfsHashes'))||[];
    const doctorAccessList = JSON.parse(localStorage.getItem('doctorAccessList'))||[];


    setUsername(username);
    setPublicAddress(publicAddress);
    setPrivateAddress(privateAddress);
    setPassword(password);
    setType(type);
    setIpfsHashes(ipfsHashes);
    setDoctorAccessList(doctorAccessList);

    if (type !== "patient") {
      if (num == 1) {
        alert('Session Expired');
        num++;
      }
      window.location.href = "/patient/login";
      return <Navigate to="/patient/login" />
    }
    fetch(backendURL + "/getPatientDataForPatient/" + publicAddress, {
      method: "GET",
      cache: "no-cache"
    }).then(response => response.json()).
      then(data => {
        console.log(data);
        setIpfsHashes(data);
        localStorage.setItem('ipfsHashes', JSON.stringify(data));
      });
  }, []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.clear();
    // window.location.replace("login");
    window.location.href = "/patient/login";
    console.log("working");
  }

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `./patientComponents/doctorAccessList.js`;
    navigate(path);
  }

  return (

    <div>
                  <NavbarPatient username={username}/>


      <h2>
        Patient Logged in.
      </h2>

      <div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Patient Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details of patient.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Patient</dd>
              </div>
              {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
              </div> */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{username}</dd>
              </div>
              {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">$120,000</dd>
              </div> */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">

                    {ipfsHashes && ipfsHashes.map((ipfsHash, index) => (
                      <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                            {/* <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> */}
                            {/* <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                            </svg> */}
                            <span className="ms-2 w-0 flex-1 truncate" >                
                                    <IpfsCard ipfsHash={ipfsHash} ipfs={ipfs} style={{cursor:"pointer"}} key={index} num={num++} />
                            </span>
                        </div>
                        {/* <div className="ms-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
                        </div> */}
                      </li>
                      ))}
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