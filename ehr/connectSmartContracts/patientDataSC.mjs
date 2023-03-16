// import { ethers } from "ethers";
import PatientRegistry from '../build/contracts/PatientRegistry.json' assert {type: "json"};
// import ganache from "ganache";

// import fs from 'fs';

// const provider = new ethers.providers.Web3Provider(ganache.provider("http://localhost:8545"));
// const signer = provider.getSigner();

// // const abi = JSON.parse(fs.readFileSync("path/to/contract.abi", "utf8"));
// const abi = PatientRegistry.abi;
// const address = "0x5b0438e1F101F519352FFf4bE6F5E4e78B81f654";
// export const patientRegistryContract = new ethers.Contract(address, abi, signer);


import Web3 from "web3";


const web3 = new Web3("http://localhost:8545");
const abi = PatientRegistry.abi; // ABI of your contract
const address = "0xA06Ec4c71201A3E366455c55540D825Fd308c988" // address of your contract on the network
// 0x5b0438e1F101F519352FFf4bE6F5E4e78B81f654
export const patientRegistryContract= new web3.eth.Contract(abi, address);

