import { ethers } from 'ethers';

const generateKeyPair = () => {
  // Generate a new random wallet
  const wallet = ethers.Wallet.createRandom();

  // Extract the private key and public key
  const privateKey = wallet.privateKey;
  const publicKey = wallet.address;

  return { privateKey, publicKey };
};

export default generateKeyPair;
