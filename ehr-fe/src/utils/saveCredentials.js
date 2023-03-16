import React from 'react';

const saveCredentials = (username, publicAddress, privateAddress, password) => {
    localStorage.setItem('username', username);
    localStorage.setItem('publicAddress', publicAddress);
    localStorage.setItem('privateAddress', privateAddress);
    localStorage.setItem('password', password);
}
export default saveCredentials;