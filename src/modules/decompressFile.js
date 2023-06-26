import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { resolve, basename } from 'path';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const decompressFile = async (currDir, archivePath, decompressFilePath) => {
  try {
    const archiveFilePath = resolve(currDir, archivePath);
    const fileName = basename(archivePath).slice(0, -3);
    const filePath = resolve(currDir, decompressFilePath, fileName);
    const readStream = createReadStream(archiveFilePath);
    const writeStream = createWriteStream(filePath);

    const brotliStream = createBrotliDecompress();

    readStream.pipe(brotliStream).pipe(writeStream);

    return new Promise((resolve) => {
      writeStream.on('finish', () => {
        resolve(null);
      });
    });
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
