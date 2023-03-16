// import crypto from 'crypto-browserify';
import getAESKey from "./getAESKey";
import { Buffer } from 'buffer';


const generateEncrypted = async (username, password, data) => {

    const AESKey = await getAESKey(username, password);
    const iv = Buffer.from((username + 'username12345678901234567890').slice(0, 16));

    const encryptedData = await crypto.subtle.encrypt({
        name: "AES-CBC",
        iv: iv,
    }, AESKey, Buffer.from(data));


    return encryptedData;
}
export default generateEncrypted;