// import crypto from 'crypto-browserify';
import getAESKey from "./getAESKey";
import { Buffer } from 'buffer';


const generateDecrypted = async (username, password, data) => {

    const AESKey = await getAESKey(username, password);
    const iv = Buffer.from((username + 'username12345678901234567890').slice(0, 16));

    // console.log(data);

    let decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-CBC",
            iv: iv,
        },
        AESKey,
        data
    );

    return decryptedData;
}
export default generateDecrypted;