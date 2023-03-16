pragma solidity ^0.8.17;

contract PatientRegistry {

    struct PatientInfo {
        string email;
        bytes private_key;
        bytes public_key;
        bytes password;
    }

    // Mapping to store the data in each table
    mapping(string => PatientInfo) public patientinfo;

    // Functions to add and remove data from the tables
    function addPatientInfo(string memory _email, bytes memory _private_key, bytes memory _public_key, bytes memory _password) public {
        patientinfo[_email] = PatientInfo(_email, _private_key, _public_key, _password);
    }

    function getPatientInfo(string memory _email) view public returns (PatientInfo memory){
        return patientinfo[_email];
    }
}