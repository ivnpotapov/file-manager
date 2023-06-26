import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'path';

import { ERROR_TEXT_EXECUTION } from '../constants/index.js';
export const copyFile = async (currDir, oldCopyFilePath, newCopyFilePath) => {
  const readPath = resolve(currDir, oldCopyFilePath);
  const fileName = basename(oldCopyFilePath);
  const writePath = resolve(currDir, newCopyFilePath, fileName);

  const readStream = createReadStream(readPath);
  const writeStream = createWriteStream(writePath);

  readStream.pipe(writeStream);

  readStream.on('error', (err) => {
    console.log(ERROR_TEXT_EXECUTION);
  });

  writeStream.on('error', (err) => {
    console.log(ERROR_TEXT_EXECUTION);
  });

  return new Promise((resolve) => {
    writeStream.on('finish', () => {
      resolve(null);
    });
  });
};
