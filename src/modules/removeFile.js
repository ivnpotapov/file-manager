import { resolve } from 'path';
import { rm } from 'fs/promises';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const removeFile = async (currDir, fileForRemovePath) => {
  const filePath = resolve(currDir, fileForRemovePath);

  try {
    await rm(filePath);
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
