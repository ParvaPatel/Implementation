// import crypto from 'crypto-browserify';
import { Buffer } from 'buffer';

const getAESKey = async (username, password) => {
  let encoder = new TextEncoder();
  let secretKey = await crypto.subtle.importKey(
      "raw",
      encoder.encode(username + password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
  );
  let AESKey = await crypto.subtle.deriveKey({
      "name": "PBKDF2",
      salt: Buffer.from(username),
      "iterations": 100000,
      "hash": "SHA-256"
  },
      secretKey,
      { "name": "AES-CBC", "length": 256 },
      true,
      ["encrypt", "decrypt"]
  );
  return AESKey;
}

export default getAESKey;
