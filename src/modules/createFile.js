import { appendFile } from 'fs/promises';
import { resolve } from 'path';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const createFile = async (currDir, newFileName) => {
  const filePath = resolve(currDir, newFileName);

  try {
    await appendFile(filePath, '');
  } catch (errorAppend) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
