import decryptData from "./decryptData";

const getFileFromIpfs = async ({ipfsHash,ipfs,code}) => {
    // const stream = await ipfs.cat(cid);
    // let data = "";
    // for await (const chunk of stream) {
    //     data += chunk.toString();
    // }
    // return data;
    const privateKey = code;
    const stream = ipfs.cat(ipfsHash);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    console.log(buffer);
    const decryptedData = await decryptData({buffer,privateKey});

    console.log(decryptedData);






    return new Blob([decryptedData], { type: 'application/pdf' });



    
}
export default getFileFromIpfs;