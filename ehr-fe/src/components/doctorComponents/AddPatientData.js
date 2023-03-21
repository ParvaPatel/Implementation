import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import addFileToIpfs from '../../utils/addFileToIpfs';
import getFileFromIpfs from '../../utils/getFileFromIpfs';
import IpfsCard from './IpfsCard';
import NavbarDoctor from '../NavbarDoctor';
const AddPatientData = ({ipfs}) => {

    const location = useLocation();
    const patientAdd = location.state.patient;
    const backendURL = 'http://localhost:5000';
    const [ipfsList, setIpfsList] = useState([]);
    const [file, setFile] = useState(null);
    const doctorAdd = localStorage.getItem('publicAddress');
    const username = localStorage.getItem('username');
    var num = 1;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cid = await addFileToIpfs({file,ipfs});
        console.log(cid);
 
        fetch(backendURL + "/addPatientDataForDoctor/", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                'patientAddress': patientAdd,
                'doctorAddress': doctorAdd,
                'patientData': cid
            })
        }).then((response) => response.json()).
            then((data) => {
                // getIpfsHashes();
                window.location.reload();
            });

        // // const formData = new FormData();
        // // formData.append("file", file);
        // console.log(cid);
        // const data = await getFileFromIpfs(cid);
        // const url = URL.createObjectURL(data);
        // window.open(url, '_blank');
        // console.log(data);

    };
    useEffect(() => {
        fetch(backendURL + "/getPatientDataForDoctor/", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                'patientAddress': patientAdd,
                'doctorAddress': doctorAdd

            })
        }).then((response) => response.json()).
            then((data) => {
                setIpfsList(data);
            });
    }, []);

    return (
        <>
            <NavbarDoctor username={username}/>
            <h1>Patient Name Records</h1>
            <table class="table table-hover px-5">

                <thead className="table-primary px-5">
                    <tr>
                        <th scope="col">Patient Attribute</th>
                        <th scope="col">Patient Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Patient Name</td>
                        <td>Dummy_Name</td>
                    </tr>
                    <tr>
                        <td>Patient Age</td>
                        <td>Dummy_Age</td>
                    </tr>
                    <tr>
                        <td>Patient Gender</td>
                        <td>Dummy_Gender</td>
                    </tr>
                </tbody>

                <thead className="table-primary px-5">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">IPFS Hashes</th>
                    </tr>
                </thead>
                <tbody>
                    {ipfsList && ipfsList.map((ipfsHash, index) => (
                        <IpfsCard ipfsHash={ipfsHash} ipfs={ipfs} key={index} num={num++} />
                    ))
                    }
                </tbody>

            </table>
            <div className='px-2'>
                <div class="mb-3 d-inline-block w-75 px-2">
                    <label for="formFile" className="form-label px-1">Add Patient Record</label>
                    <input class="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} id="formFile" />
                </div>
                <button className='btn btn-outline-success' onClick={handleSubmit}> Add data </button>
            </div>

        </>
    );
}
export default AddPatientData;