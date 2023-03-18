
import React from 'react';

const DoctorAccessListCard = (props) => {
    const doctor = props.doctor;
    return (
        <>
            <tr>
                <th scope="row">1</th>
                <td>{doctor[0]}</td>
                <td>{doctor[1]}</td>
                <td>{doctor[2]}</td>
                <td>{doctor[3]}</td>

            </tr>
        </>
    );
}
export default DoctorAccessListCard;