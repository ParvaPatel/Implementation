

const getFileFromIpfs = async ({ipfsHash,ipfs}) => {
    // const stream = await ipfs.cat(cid);
    // let data = "";
    // for await (const chunk of stream) {
    //     data += chunk.toString();
    // }
    // return data;
    const stream = ipfs.cat(ipfsHash);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    return new Blob(chunks, { type: 'application/pdf' });



    
}
export default getFileFromIpfs;