// import crypto from 'crypto-browserify';
import getAESKey from "./getAESKey";
import { Buffer } from 'buffer';


const generateEncryptedPrivateKey_Password = async (username, password, privateKey) => {

    const AESKey = await getAESKey(username, password);
    const iv = Buffer.from((username + 'username12345678901234567890').slice(0, 16));

    // console.log(AESKey);

    const encryptedPrivateKey = await crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: iv,
    }, AESKey, Buffer.from(privateKey));

    
    
    const encryptedPassword = await crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: iv,
    }, AESKey, Buffer.from(password));

    // console.log(encryptedPrivateKey,encryptedPassword);

    return [encryptedPrivateKey,encryptedPassword];
}
export default generateEncryptedPrivateKey_Password;