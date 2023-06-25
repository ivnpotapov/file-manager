import { homedir } from 'os';
import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import { greetUser, sayGoodbye } from './src/utils/index.js';
import {
  COMMAND_ADD,
  COMMAND_CAT,
  COMMAND_CD,
  COMMAND_LS,
  COMMAND_UP,
  ERROR_TEXT_EXECUTION,
  ERROR_TEXT_INPUT,
} from './src/constants/index.js';
import { goUpper, changeDirectory, getFilesList, readFile, createFile } from './src/modules/index.js';

const getFileManager = async () => {
  try {
    const readline = createInterface({
      input: stdin,
      output: stdout,
    });

    let currDir = homedir();

    const username = greetUser(currDir);

    readline.on('line', async (line) => {
      const [command, ...args] = line
        .trim()
        .split(' ')
        .map((el) => el.trim());

      switch (command) {
        case COMMAND_UP:
          currDir = goUpper(currDir);
          break;

        case COMMAND_CD:
          const nextFolderPath = args[0];
          currDir = await changeDirectory(currDir, nextFolderPath);
          break;

        case COMMAND_LS:
          await getFilesList(currDir);
          break;

        case COMMAND_CAT:
          const fileForReadName = args[0];
          await readFile(currDir, fileForReadName);
          break;

        case COMMAND_ADD:
          const newFileName = args[0];
          console.log('newFileName', newFileName);
          await createFile(currDir, newFileName);
          break;

        default:
          console.log(ERROR_TEXT_INPUT);
          break;
      }
    });

    readline.on('close', sayGoodbye.bind(null, username));
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};

await getFileManager();
