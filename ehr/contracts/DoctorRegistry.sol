pragma solidity ^0.8.17;

contract DoctorRegistry {

    struct DoctorInfo {
        string email;
        bytes private_key;
        bytes public_key;
        bytes password;
    }

    // Mapping to store the data in each table
    mapping(string => DoctorInfo) public doctorinfo;

    // Functions to add and remove data from the tables
    function addDoctorInfo(string memory _email, bytes memory _private_key, bytes memory _public_key, bytes memory _password) public {
        doctorinfo[_email] = DoctorInfo(_email, _private_key, _public_key, _password);
    }

    function getDoctorInfo(string memory _email) view public returns (DoctorInfo memory){
        return doctorinfo[_email];
    }
}