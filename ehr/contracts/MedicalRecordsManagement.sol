pragma solidity ^0.8.17;

contract MedicalRecordsManagement {

    event AccessChanged(address indexed patient, address indexed doctor, bool accessGranted);

    struct ipfsRecord{
        string[] ipfsHashes;
        address[] doctorAccessList;
    }
    struct doctor{
        string username;
        string name;
        string licenseId;
        string specialization;
        address[] patientAccessList;
    }

    struct toGetDoctorList{
        string username;
        string name;
        string licenseId;
        string specialization;
        address doctorAdd;
    }

    address[] public doctorAddresses;
    toGetDoctorList[] doctorList;
    mapping(address => ipfsRecord) patientRecords;
    mapping(address => doctor) doctorRecords;

    function createPatient() public {
        // require(patientRecords[msg.sender].ipfsHashes.length == 0, "Patient already exists");
        ipfsRecord memory i;
        patientRecords[msg.sender] = i;
    }
    function createDoctor(string memory _username, string memory _name, string memory _licenseId,  string memory _specialization) public {
        // require(doctorRecords[msg.sender].username == "", "Doctor already exists");

        doctor memory d;
        d.username = _username;
        d.name = _name;
        d.licenseId = _licenseId;
        d.specialization = _specialization;
        doctorRecords[msg.sender] = d;
        doctorAddresses.push(msg.sender);
        doctorList.push(toGetDoctorList(_username,_name,_licenseId,_specialization,msg.sender));

    }
    function getPatient(address add) view public returns (string[] memory, address[] memory ) {
        return (patientRecords[add].ipfsHashes,patientRecords[add].doctorAccessList);
    }
    function getDoctor(address add) view public returns (string memory, string memory, string memory, string memory, address[] memory){
        return (doctorRecords[add].username, doctorRecords[add].name,doctorRecords[add].licenseId,doctorRecords[add].specialization,doctorRecords[add].patientAccessList);
    }

    function grantAccess(address doctorAdd) public{
        patientRecords[msg.sender].doctorAccessList.push(doctorAdd);
        doctorRecords[doctorAdd].patientAccessList.push(msg.sender);
        emit AccessChanged(msg.sender, doctorAdd, true);
    }
    function revokeAccess(address doctorAdd) public {
        uint256 index;
        uint256 accessCount = patientRecords[msg.sender].doctorAccessList.length;

        // loop through the patient's doctor access list to find the doctor's address and its index
        for (uint256 i = 0; i < accessCount; i++) {
            if (patientRecords[msg.sender].doctorAccessList[i] == doctorAdd) {
                index = i;
                break;
            }
        }

        // remove the doctor's address from the patient's doctor access list
        if (index < accessCount) {
            patientRecords[msg.sender].doctorAccessList[index] = patientRecords[msg.sender].doctorAccessList[accessCount - 1];
            patientRecords[msg.sender].doctorAccessList.pop();
        }

        // remove the patient's address from the doctor's patient access list
        accessCount = doctorRecords[doctorAdd].patientAccessList.length;
        for (uint256 i = 0; i < accessCount; i++) {
            if (doctorRecords[doctorAdd].patientAccessList[i] == msg.sender) {
                index = i;
                break;
            }
        }
        if (index < accessCount) {
            doctorRecords[doctorAdd].patientAccessList[index] = doctorRecords[doctorAdd].patientAccessList[accessCount - 1];
            doctorRecords[doctorAdd].patientAccessList.pop();
        }

        emit AccessChanged(msg.sender, doctorAdd, false);
    }

    function getAccessedDoctorList(address patientAdd) view public  returns (address[] memory){
        return patientRecords[patientAdd].doctorAccessList;
    }
    function getAccessedPatientList(address doctorAdd) view public returns (address[] memory){
        return doctorRecords[doctorAdd].patientAccessList;
    }
    function getAllDoctors() view public returns(toGetDoctorList[] memory){
        return doctorList;
    }

    function checkAccess(address pAdd, address dAdd) view public returns(bool){
        uint256 accessCount = patientRecords[pAdd].doctorAccessList.length;
        for (uint256 i = 0; i < accessCount; i++) {
            if (patientRecords[pAdd].doctorAccessList[i] == dAdd) {
                return true;
            }
        }
        return false;
    }
    function getPatientDataForDoctor(address patientAdd) public view returns (string[] memory){
        require(checkAccess(patientAdd,msg.sender),"You do not have access to this patient data");
        return (patientRecords[patientAdd].ipfsHashes);
    }
    function addPatientDataForDoctor(address patientAdd, string memory data) public{
        require(checkAccess(patientAdd,msg.sender),"You do not have access");
        patientRecords[patientAdd].ipfsHashes.push(data);
    }
}