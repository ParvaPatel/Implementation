import MedicalRecordsManagement from '../build/contracts/MedicalRecordsManagement.json' assert {type: "json"};

import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const abi = MedicalRecordsManagement.abi; // ABI of your contract
const address = "0x55451733a417739641A56f898aA924aEc3E71a4B" // address of your contract on the network
export const medicalRecordsManagementContract= new web3.eth.Contract(abi, address);

