import React from 'react';
import { Link } from 'react-router-dom';

const PatientAccessListCard = (props) => {
    const patient = props.patient;
    const num = props.num
    return (
        <>
            <tr>
                <th scope="row">{num}</th>
                <td>Patient Name</td>
                <td>Email</td>
                {/* <td>{patient[2]}</td> */}
                <td>{patient}</td>

                <td><Link to="AddViewData" state = {{patient}}> <button type="button" className='btn btn-outline-info'> Add/View Data </button> </Link></td>
                {/* <td><button type="button" className='btn btn-info'>Add/View Data</button></td> */}
            </tr>
        </>
    );
}
export default PatientAccessListCard;