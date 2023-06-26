import { dirname } from 'path';

export const goUpper = (currDir) => {
  let newPath = currDir;
  let rootDir = dirname('');

  if (newPath !== rootDir) {
    const parentDir = dirname(currDir);
    newPath = parentDir;
  }

  return newPath;
};
