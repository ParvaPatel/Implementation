import React from 'react';

const saveCredentials = (emailAddress, publicAddress, privateAddress) => {
    localStorage.setItem('emailAddress', emailAddress);
    sessionStorage.setItem('publicAddress', privateAddress);
    sessionStorage.setItem('privateAddress', privateAddress);
}
export default saveCredentials;