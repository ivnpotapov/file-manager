import { appendFile } from 'fs/promises';
import { resolve } from 'path';
import { showCurrentDirectory } from '../utils/index.js';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const createFile = async (currDir, newFileName) => {
  const filePath = resolve(currDir, newFileName);
  console.log('filePath', filePath);
  try {
    await appendFile(filePath, '');
    showCurrentDirectory(currDir);
  } catch (errorAppend) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
