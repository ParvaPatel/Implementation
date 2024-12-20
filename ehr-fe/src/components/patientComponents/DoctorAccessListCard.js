
import React from 'react';

const DoctorAccessListCard = (props) => {
    const doctor = props.doctor;
    const num = props.num
   
    return (
        <>
                <th scope="row">{num}</th>
                <td>{doctor[1]}</td>
                <td>{doctor[0]}</td>
                <td>{doctor[2]}</td>
                <td>{doctor[3]}</td>
        </>
    );
}
export default DoctorAccessListCard;