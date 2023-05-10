import DoctorRegistry from '../build/contracts/DoctorRegistry.json' assert {type: "json"};

import Web3 from "web3";

const web3 = new Web3("http://localhost:8545");
const abi = DoctorRegistry.abi; // ABI of your contract
const address = "0x825d8A067c63e53b17B85FD099460E3485613cb9" // address of your contract on the network
export const doctorRegistryContract= new web3.eth.Contract(abi, address);

