import {create} from 'ipfs-http-client';
import { Buffer } from 'buffer';

const ipfs = create('http://localhost:5001');

const addFileToIpfs = async (file) => {


    const buffer = Buffer.from(await file.arrayBuffer());
    const { cid } = await ipfs.add(buffer);
    return cid.toString();
    // console.log(file.data);
    // const cid = await ipfs.add(file);
    // return cid;
}
export default addFileToIpfs;