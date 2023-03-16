import React ,{ useEffect, useState} from 'react';

const PatientProfilePage = () => {
    const [username, setUsername] = useState("");
    const [publicAddress, setPublicAddress] = useState("");
    const [privateAddress, setPrivateAddress] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
      
      const username = localStorage.getItem('username');
      const publicAddress = localStorage.getItem('publicAddress');
      const privateAddress = localStorage.getItem('privateAddress');
      const password = localStorage.getItem('password');
      if(username){
         setUsername(username);
      }
      if(publicAddress){
         setPublicAddress(publicAddress);
      }
      if(privateAddress){
        setPrivateAddress(privateAddress);
      }
      if(password){
         setPassword(password);
      }
    }
    );
    return(
        <div>
            <h2>
                Patient Logged in.
                {console.log(username)}
                {console.log(publicAddress)}
                {console.log(privateAddress)}
                {console.log(password)}
            </h2>
        </div>
    );
}
export default PatientProfilePage;


//  localStorage.setItem('username', JSON.stringify(username));
//  localStorage.setItem('publicAddress', JSON.stringify(publicAddress));
//  localStorage.setItem('privateAddress', JSON.stringify(privateAddress));
//  localStorage.setItem('password', JSON.stringify(password));