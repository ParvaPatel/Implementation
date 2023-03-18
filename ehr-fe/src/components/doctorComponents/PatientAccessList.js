import React from 'react';
import PatientAccessListCard from './PatientAccessListCard';
// import { useEffect, useState } from "react";
import useFetch from '../../utils/useFetch';
// import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

const PatientAccessList = () => {
    // const patients;
    var backendURL = 'http://localhost:5000';
    var doctorAddress = localStorage.getItem('publicAddress');
    console.log(doctorAddress);
    var url = backendURL + '/getAccessedPatientList/'+doctorAddress;
    const { data: patientAccessList, isPending, error } = useFetch(url);
    console.log(patientAccessList);
    var num=1;
    return (

        <>
            <h1>Patient Access List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Patient Name</th>
                        <th scope="col">Email</th>
                        {/* <th scope="col">License ID</th> */}
                        {/* <th scope="col">Specialization</th> */}
                        {/* <th scope="col">Email</th> */}
                        <th scope="col">Public Address</th>

                        <th scope="col">View Data</th>



                    </tr>
                </thead>

                {isPending && <div> Loading... </div>}
                {error && <div>{error} </div>}
                {patientAccessList && patientAccessList.map((patient,i) => (
                    <>
{                    console.log(i)
}                    <PatientAccessListCard patient={patient} key={i} num={num++}/>
</>
))
                }
                {/* {patientAccessList} */}

            </table>

        </>
    )
}
export default PatientAccessList;