import React from 'react';
import DoctorListCard from './DoctorListCard';
import { useEffect, useState } from "react";
import useFetch from '../../utils/useFetch';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import NavbarPatient from '../NavbarPatient'
import CodeModal from '../CodeModal';

const DoctorList = () => {
    // const doctors;
    var backendURL = 'http://localhost:5000';
    var url = backendURL + '/doctorList';
    const { data: doctorList, isPending, error } = useFetch(url);
    var num = 1;
    const [doctorAccessList,setDoctorAccessList] = useState([]);
    const username = localStorage.getItem('username');
    const [modalOpen, setModalOpen] = useState(false);
    const [code, setCode] = useState("");

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        if(code){
            var doctorAddress = event.target.value;
            var patientAddress = localStorage.getItem('publicAddress');
            console.log(doctorAddress, patientAddress);
            
            // const x = JSON.parse(localStorage.getItem('doctorAccessList'));
            // x.push(doctorAddress);
            // console.log(JSON.stringify(x));
            // localStorage.setItem('doctorAccessList', JSON.stringify(x));
            
            await fetch(backendURL + "/addDoctorAccess/", {
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
                var x = JSON.parse(localStorage.getItem('doctorAccessList'));
                x.push(doctorAddress);
                localStorage.setItem('doctorAccessList', JSON.stringify(x));
                window.location.reload();
            });
        }
        else{
            openModal();
        }

    }
    const openModal = () => {
        setCode("");
        setModalOpen(true);        
    };
    
    const closeModal =async () => {
        setModalOpen(false);
    };






    useEffect(() => {
        const doctorAccessList = localStorage.getItem('doctorAccessList');
        if(doctorAccessList){
            setDoctorAccessList(doctorAccessList);
            console.log(doctorAccessList);
        }
    },[]
    );
    
    return (

        <>
                           <CodeModal code={code} modalOpen={modalOpen} closeModal={closeModal} setCode={setCode}/>

                        <NavbarPatient username={username}/>

            <h1>Doctor List</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">License ID</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Grant Access</th>
                    </tr>
                </thead>

                {isPending && <div> Loading... </div>}
                {error && <div>{error} </div>}
                {/* { doctorList && doctorList.map((doctor)  => (
                      { (!doctorAccessList.includes(doctor[4]))  ? (<DoctorListCard doctor={doctor} key={doctor[4]} />) 
                                                                : (<h1>Fail</h1>)
                      }
                    )
                }                 */}
                {doctorList && doctorList.filter(doctor => !doctorAccessList.includes(doctor[4])).map(doctor => (
                    <>
                        <tr>
                            <DoctorListCard doctor={doctor} key={doctor[4]} num={num++} />
                            <td><button type="button" value={doctor[4]} onClick={handleSubmit} className='btn btn-outline-warning' >GrantAccess</button></td>
                        </tr>
                    </>
                ))}

{/* !doctorAccessList.includes(doctor[4]) */}
            </table>
        </>
    )
}
export default DoctorList;