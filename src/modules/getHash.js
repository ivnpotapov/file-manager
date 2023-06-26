import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';
export const getHash = async (currDir, fileForHashPath) => {
  const filePath = resolve(currDir, fileForHashPath);
  const readStream = createReadStream(filePath);
  const hash = createHash('sha256');

  readStream.on('data', (chunk) => {
    hash.update(chunk);
  });

  readStream.on('error', (error) => {
    console.log(ERROR_TEXT_EXECUTION);
  });

  return new Promise((resolve) => {
    readStream.on('end', () => {
      console.log(hash.digest('hex'));

      resolve(null);
    });
  });
};
