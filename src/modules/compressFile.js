import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { resolve, basename } from 'path';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const compressFile = async (currDir, fileForCompressPath, newArchivePath) => {
  try {
    const filePath = resolve(currDir, fileForCompressPath);
    const archiveFileName = `${basename(fileForCompressPath)}.gz`;
    const archivePath = resolve(currDir, newArchivePath, archiveFileName);
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(archivePath);

    const brotliStream = createBrotliCompress();

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
