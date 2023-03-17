import DoctorRegistry from '../build/contracts/DoctorRegistry.json' assert {type: "json"};

import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const abi = DoctorRegistry.abi; // ABI of your contract
const address = "0x5061e641d56960D9F5FD3aa3dC7b0C794a205e19" // address of your contract on the network
export const doctorRegistryContract= new web3.eth.Contract(abi, address);

