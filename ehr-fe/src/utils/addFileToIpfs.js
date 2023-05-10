import { Buffer } from 'buffer';
import encryptData from './encryptData';

const addFileToIpfs = async ({file,ipfs}) => {


    const buffer = Buffer.from(await file.arrayBuffer());
    const encryptedData = await encryptData({buffer});
    // console.log(encryptedData);
    const { cid } = await ipfs.add(encryptedData);
    // return "Success";
    return cid.toString();
}
export default addFileToIpfs;