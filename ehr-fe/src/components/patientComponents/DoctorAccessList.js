import React from 'react';
import DoctorAccessListCard from './DoctorAccessListCard';
import { useEffect, useState } from "react";
import useFetch from '../../utils/useFetch';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import NavbarPatient from '../NavbarPatient'
import CodeModal from '../CodeModal';

const DoctorAccessList = () => {
    // const doctors;
    var backendURL = 'http://localhost:5000';
    var patientAddress = localStorage.getItem('publicAddress');
    console.log(patientAddress);
    var url = backendURL + '/getAccessedDoctorList/'+patientAddress;
    const { data: doctorAccessList, isPending, error } = useFetch(url);
    console.log(doctorAccessList);
    var num=1;
    var username = localStorage.getItem('username');
    const [modalOpen, setModalOpen] = useState(false);
    const [code, setCode] = useState("");



    const handleSubmit = async (event) => {
        event.preventDefault();

        if(code){
            var doctorAddress = event.target.value;
            console.log(doctorAddress, patientAddress);
            
            await fetch(backendURL + "/removeDoctorAccess/", {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "doctorAddress": doctorAddress,
                    "patientAddress": patientAddress
                })
            }).then((response) => {
                console.log(response);
                localStorage.setItem('doctorAccessList', JSON.stringify(JSON.parse(localStorage.getItem('doctorAccessList')).filter((doctor) => doctor !== doctorAddress)));
                window.location.reload();
            });
        }
        
        else{
            openModal();
        }
        // Do something with the input value
    }

    const openModal = () => {
        setCode("");
        setModalOpen(true);        
    };
    
    const closeModal =async () => {
        setModalOpen(false);
    };



    return (

        <>
                   <CodeModal code={code} modalOpen={modalOpen} closeModal={closeModal} setCode={setCode}/>
                        <NavbarPatient username={username}/>

            <h1>Doctor Access List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">License ID</th>
                        <th scope="col">Specialization</th>
                        {/* <th scope="col">Email</th> */}
                        <th scope="col">RevokeAccess</th>



                    </tr>
                </thead>

                {isPending && <div> Loading... </div>}
                {error && <div>{error} </div>}
                {doctorAccessList && doctorAccessList.map((doctor) => (
                    <>
                        <tr>
                            <DoctorAccessListCard doctor={doctor} key={doctor[4] } num={num++}/>
                            <th><button type="button" value={doctor[4]} onClick={handleSubmit} className='btn btn-outline-danger'  >RevokeAccess</button></th>
                        </tr>
                    </>
                    ))
                }
                {/* {doctorAccessList} */}

            </table>

        </>
    )
}
export default DoctorAccessList;