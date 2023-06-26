import { rename } from 'node:fs/promises';
import { resolve } from 'path';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

export const renameFile = async (currDir, oldFilePath, newFilePath) => {
  const oldPath = resolve(currDir, oldFilePath);
  const newPath = resolve(currDir, newFilePath);

  try {
    await rename(oldPath, newPath);
  } catch (error) {
    console.error(ERROR_TEXT_EXECUTION);
  }
};
