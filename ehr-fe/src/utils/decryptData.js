import { Buffer } from 'buffer';
import {encrypt,decrypt,generatePrivate,getPublic,cipher} from 'eccrypto';
import {ethers} from 'ethers';
const decryptData = async ({buffer,privateKey}) => {

    
    const parsedEncryptedData = {
        iv: buffer.slice(0,16),
        ephemPublicKey: buffer.slice(16,81),
        ciphertext: buffer.slice(81,-32),
        mac: buffer.slice(-32)
    }
    const decrypted = await decrypt(
        Buffer.from(privateKey,'hex'),
        parsedEncryptedData
    );

    return decrypted;

}
export default decryptData;