import {create} from 'ipfs-http-client';

const ipfs = create('http://localhost:5001');

const getFileFromIpfs = async (cid) => {
    // const stream = await ipfs.cat(cid);
    // let data = "";
    // for await (const chunk of stream) {
    //     data += chunk.toString();
    // }
    // return data;
    const stream = ipfs.cat(cid);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return new Blob(chunks, { type: 'application/pdf' });



    
}
export default getFileFromIpfs;