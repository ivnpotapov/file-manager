import { ERROR_TEXT_EXECUTION } from '../constants/index.js';
import { copyFile, removeFile } from './index.js';

export const moveFile = async (currDir, oldMoveFilePath, newMoveFilePath) => {
  try {
    await copyFile(currDir, oldMoveFilePath, newMoveFilePath);

    await removeFile(currDir, oldMoveFilePath);
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
