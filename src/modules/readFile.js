import { resolve } from 'path';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';
import { showCurrentDirectory } from '../utils/index.js';

export const readFile = async (currDir, fileForReadName) => {
  const filePath = resolve(currDir, fileForReadName);

  const readableStream = createReadStream(filePath, { encoding: 'utf-8' });

  readableStream.on('data', (chunk) => {
    stdout.write(chunk);
  });

  readableStream.on('end', () => {
    showCurrentDirectory(currDir);
  });

  readableStream.on('error', (err) => {
    console.error(ERROR_TEXT_EXECUTION);
  });
};
