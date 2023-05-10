import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Web3 from 'web3';

import { patientRegistryContract } from './connectSmartContracts/patientDataSC.mjs'
import { doctorRegistryContract } from './connectSmartContracts/doctorDataSC.mjs'
import { medicalRecordsManagementContract } from './connectSmartContracts/medicalRecordsManagementSC.mjs'

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

const web3 = new Web3('http://localhost:8545');


app.post('/p/', async (req, res) => {

    // const userId = req.params.userId;
    const data = req.body.data;
    const privateKey = Buffer.from(data['privateAddress'], 'base64');
    const publicKey = Buffer.from(data['publicAddress'].substring(2), 'base64');
    const password = Buffer.from(data['password'], 'base64');
    const email = data['emailAddress'];

    const userDetails = await patientRegistryContract.methods.getPatientInfo(email).call();

    // new account registration
    if (userDetails[0] == "") {

        const options = {
            from: data['publicAddress'],
            gas: 3000000,
            gasPrice: '20000000000'
        };
        const updateMedicalRecords = await medicalRecordsManagementContract.methods.createPatient().send(options);
        const result = await patientRegistryContract.methods.addPatientInfo(
            email,
            privateKey,
            publicKey,
            password,
        ).send(options);
        res.json(result);
    }
    // account already exists
    else {
        res.json("Account already exists");
    }
});
app.get('/p/:email', async (req, res) => {
    const email = req.params.email;
    const userDetails = await patientRegistryContract.methods.getPatientInfo(email).call();

    if (userDetails[0] == "") {
        res.sendStatus(404);
    }
    else {
        let public_key = "0x" + Buffer.from(userDetails[2].substring(2), 'hex').toString('base64');
        let private_key = Buffer.from(userDetails[1].substring(2), 'hex').toString('base64');
        let password = Buffer.from(userDetails[3].substring(2), 'hex').toString('base64');
        const patientData = await medicalRecordsManagementContract.methods.getPatient(public_key).call();
        // console.log(patientData[0],patientData[1]);
        let response = {
            username: userDetails[0],
            private_key: private_key,
            public_key: public_key,
            password: password,
            ipfsHashes: patientData[0],
            doctorAccessList: patientData[1]
        }
        res.json(response);
    }
});


app.post('/d/', async (req, res) => {

    const data = req.body.data;
    const privateKey = Buffer.from(data['privateAddress'], 'base64');
    const publicKey = Buffer.from(data['publicAddress'].substring(2), 'base64');
    const password = Buffer.from(data['password'], 'base64');
    const email = data['emailAddress'];

    const userDetails = await doctorRegistryContract.methods.getDoctorInfo(email).call();

    // new account registration
    if (userDetails[0] == "") {

        const options = {
            from: data['publicAddress'],
            gas: 3000000,
            gasPrice: '20000000000'
        };
        // console.log(data['emailAddress'],data['doctorName'],data['doctorId'],data['specialization']);
        await medicalRecordsManagementContract.methods.createDoctor(data['emailAddress'], data['doctorName'], data['doctorId'], data['specialization']).send(options).
            then((receipt) => {
                console.log(receipt); // print the transaction receipt
            }).catch((error) => {
                console.error(error); // print any error that occurs
            });
        const result = await doctorRegistryContract.methods.addDoctorInfo(
            email,
            privateKey,
            publicKey,
            password,
        ).send(options);
        res.json(result);
    }
    // account already exists
    else {
        res.json("Account already exists");
    }
});
app.get('/d/:email', async (req, res) => {
    const email = req.params.email;
    const userDetails = await doctorRegistryContract.methods.getDoctorInfo(email).call();
    if (userDetails[0] == "") {
        res.sendStatus(404);
    }
    else {
        let public_key = "0x" + Buffer.from(userDetails[2].substring(2), 'hex').toString('base64');
        let private_key = Buffer.from(userDetails[1].substring(2), 'hex').toString('base64');
        let password = Buffer.from(userDetails[3].substring(2), 'hex').toString('base64');
        const doctorData = await medicalRecordsManagementContract.methods.getDoctor(public_key).call();
        let response = {
            username: userDetails[0],
            private_key: private_key,
            public_key: public_key,
            password: password,
            doctorData: doctorData
        }
        res.json(response);
    }
});


app.get('/doctorList/', async (req, res) => {
    const doctorList = await medicalRecordsManagementContract.methods.getAllDoctors().call();
    console.log(doctorList);
    res.json(doctorList);
});
app.get('/getAccessedDoctorList/:patientAddress', async (req, res) => {
    const patientAddress = req.params.patientAddress;
    const doctorList = await medicalRecordsManagementContract.methods.getAccessedDoctorList(patientAddress).call();
    res.json(doctorList);
});
app.get('/getAccessedPatientList/:doctorAddress', async (req, res) => {
    const doctorAddress = req.params.doctorAddress;
    const patientList = await medicalRecordsManagementContract.methods.getAccessedPatientList(doctorAddress).call();
    res.json(patientList);
});


app.post('/addDoctorAccess/', async (req, res) => {

    const data = req.body;
    // const data = req.body.data;

    console.log(data)
    const patientAddress = data['patientAddress'];
    const doctorAddress = data['doctorAddress'];
    console.log(patientAddress, doctorAddress);
    const options = {
        from: patientAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    const result = await medicalRecordsManagementContract.methods.grantAccess(doctorAddress).send(options);
    res.json(result);
});
app.post('/removeDoctorAccess/', async (req, res) => {
    const data = req.body;
    // const data = req.body.data;
    const patientAddress = data['patientAddress'];
    const doctorAddress = data['doctorAddress'];
    console.log(patientAddress, doctorAddress);
    const options = {
        from: patientAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    const result = await medicalRecordsManagementContract.methods.revokeAccess(doctorAddress).send(options);
    res.json(result);
});
app.post('/getPatientDataForDoctor/', async (req, res) => {
    const data = req.body;
    // const data = req.body.data;
    const patientAddress = data['patientAddress'];
    const doctorAddress = data['doctorAddress'];
    console.log(patientAddress, doctorAddress);
    const options = {
        from: doctorAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    try {
        const result = await medicalRecordsManagementContract.methods.getPatientDataForDoctor(patientAddress).call(options);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json("You do not have access to this patient data");
    }
});
app.post('/addPatientDataForDoctor/', async (req, res) => {
    const data = req.body;
    // const data = req.body.data;
    const patientAddress = data['patientAddress'];
    const doctorAddress = data['doctorAddress'];
    const patientData = data['patientData'];
    console.log(patientAddress, doctorAddress, patientData);
    const options = {
        from: doctorAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    try {
        const result = await medicalRecordsManagementContract.methods.addPatientDataForDoctor(patientAddress, patientData).send(options);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json("You do not have access to this patient data");
    }
});
app.get('/getPatientDataForPatient/:patientAddress', async (req, res) => {
    const patientAddress = req.params.patientAddress;
    const options = {
        from: patientAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    const result = await medicalRecordsManagementContract.methods.getPatientDataForPatient().call(options);
    const pendingResult = await medicalRecordsManagementContract.methods.getPendingIpfs().call(options);
    res.json({ result, pendingResult });
});

app.post('/recordApprove/:patientAddress', async (req, res) => {
    const {patientAddress} = req.params;
    const { ipfsHash } = req.body;
    console.log(patientAddress);
    const options = {
        from: patientAddress,
        gas: 3000000,
        gasPrice: '20000000000'
    };
    const result = await medicalRecordsManagementContract.methods.recordApprove(patientAddress, ipfsHash).send(options);
    console.log(result);
    res.json({ message: "Success", result });
})

app.listen(port, () => {
    console.log('Server listening on port 5000');
});
