import { readdir } from 'fs/promises';
import { showCurrentDirectory } from '../utils/index.js';
import { ERROR_TEXT_EXECUTION } from '../constants/index.js';

const TEXT_DIR = 'Directory';
const TEXT_FILE = 'File';

export const getFilesList = async (currDir) => {
  try {
    const entries = await readdir(currDir, { withFileTypes: true });
    const table = [];

    for (const entry of entries) {
      const type = entry.isDirectory() ? TEXT_DIR : TEXT_FILE;
      table.push({ name: entry.name, type });
    }

    const tableSorted = table.sort((a, b) => {
      if (a.type === TEXT_DIR && b.type !== TEXT_DIR) {
        return -1;
      } else if (a.type !== TEXT_DIR && b.type === TEXT_DIR) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    console.table(tableSorted);

    showCurrentDirectory(currDir);
  } catch (err) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
