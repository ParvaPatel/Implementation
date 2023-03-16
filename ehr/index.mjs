import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Web3 from 'web3';

import {patientRegistryContract} from './connectSmartContracts/patientDataSC.mjs'


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
        let response = {
            username: userDetails[0],
            private_key: Buffer.from(userDetails[1].substring(2), 'hex').toString('base64'),
            public_key: "0x" + Buffer.from(userDetails[2].substring(2), 'hex').toString('base64'),
            password: Buffer.from(userDetails[3].substring(2), 'hex').toString('base64')
        }
        res.json(response);
    }
});

app.listen(port, () => {
    console.log('Server listening on port 5000');
});
