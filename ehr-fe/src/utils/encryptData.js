import { Buffer } from 'buffer';
import {encrypt,decrypt,generatePrivate,getPublic,cipher} from 'eccrypto';
import {ethers} from 'ethers';
const encryptData = async ({buffer}) => {


    const privateKey = Buffer.from("ae223d61d769758fee742c6221d94d4f2d305844c15486358d31a887d12ec17e",'hex');
    const publicKey = getPublic(privateKey);

    console.log(buffer);


    const encryptedData = await encrypt(
        publicKey, 
        buffer
    );
    const ivBuffer = Buffer.from(encryptedData.iv, 'hex');
    const ephemPublicKeyBuffer = Buffer.from(encryptedData.ephemPublicKey, 'hex');
    const ciphertextBuffer = Buffer.from(encryptedData.ciphertext, 'hex');
    const macBuffer = Buffer.from(encryptedData.mac, 'hex');
    const dataBuffer = Buffer.concat([ivBuffer, ephemPublicKeyBuffer, ciphertextBuffer, macBuffer]);

    console.log(dataBuffer)

    // const parsedEncryptedData = {
    //     iv: dataBuffer.slice(0,16),
    //     ephemPublicKey: dataBuffer.slice(16,81),
    //     ciphertext: dataBuffer.slice(81,-32),
    //     mac: dataBuffer.slice(-32)
    // }
    // console.log(encryptedData)
    // console.log(parsedEncryptedData)
    // const decrypted = await decrypt(
    //     Buffer.from(privateKey),
    //     parsedEncryptedData
    // );

    // console.log(decrypted.toString());

    return dataBuffer;
    


}
export default encryptData;