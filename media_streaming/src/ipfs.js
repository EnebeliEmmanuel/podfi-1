// src/ipfs.js
import { create } from 'ipfs-http-client';

const ipfs = create('https://ipfs.infura.io:5001/api/v0');

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error('Error uploading file to IPFS: ', error);
  }
};
