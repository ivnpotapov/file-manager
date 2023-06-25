import { resolve } from 'path';
import { access } from 'fs/promises';
import { showCurrentDirectory } from '../utils/index.js';
export const changeDirectory = async (currDir, nextFolderPath) => {
  let newPath = resolve(currDir, nextFolderPath);

  try {
    await access(newPath);
  } catch (error) {
    console.log(`Error: ${newPath} - directory doesn't exist`);
    newPath = currDir;
  }

  showCurrentDirectory(newPath);

  return newPath;
};
