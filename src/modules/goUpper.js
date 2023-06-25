import { dirname } from 'path';
import { showCurrentDirectory } from '../utils/index.js';

export const goUpper = (currDir) => {
  let newPath = currDir;
  let rootDir = dirname('');

  if (newPath !== rootDir) {
    const parentDir = dirname(currDir);
    newPath = parentDir;
  }

  showCurrentDirectory(newPath);

  return newPath;
};
