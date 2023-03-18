import React from 'react';
import { Link } from 'react-router-dom';

const PatientAccessListCard = (props) => {
    const ipfs = props.ipfs;
    const num = props.num
    // const num = props.num
    return (
        <>
            <tr>
                <th>{num}</th>
                <th>{ipfs}</th>
            </tr>
        </>
    );
}
export default PatientAccessListCard;