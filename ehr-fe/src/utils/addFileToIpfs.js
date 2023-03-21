import { Buffer } from 'buffer';


const addFileToIpfs = async ({file,ipfs}) => {


    const buffer = Buffer.from(await file.arrayBuffer());
    const { cid } = await ipfs.add(buffer);
    return cid.toString();
    // console.log(file.data);
    // const cid = await ipfs.add(file);
    // return cid;
}
export default addFileToIpfs;