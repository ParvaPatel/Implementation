import React from 'react';
import DoctorAccessListCard from './DoctorAccessListCard';
import { useEffect, useState } from "react";
import useFetch from '../../utils/useFetch';

const DoctorAccessList = () => {
    // const doctors;
    var backendURL = 'http://localhost:5000';
    var url = backendURL + '/doctorList';
    const { data: doctorList, isPending, error } = useFetch(url);

    // const [doctorList, setDoctorList] = useState([]);
    // const names = async () => {
    //     const res = await fetch('http://localhost:5000/doctorList');
    //     console.log(res);
    //     setDoctorList(await res.json());
    // }

    


    // useEffect(() => {
    //     names();
    // }, []);


    return (

        <>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Doctor Name</th>
                        <th scope="col">License ID</th>
                        <th scope="col">Specialization</th>
                        <th scope="col">Email</th>

                    </tr>
                </thead>

                {isPending && <div> Loading... </div>}
                {error && <div>{error} </div>}
                {doctorList && doctorList.map((doctor) => (
                    <DoctorAccessListCard doctor={doctor} key={doctor[4]} />
                    ))
                }


                
                


            </table>

        </>
    )
}
export default DoctorAccessList;