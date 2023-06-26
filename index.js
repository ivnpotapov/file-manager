import { homedir } from 'os';
import { createInterface } from 'readline';
import { stdin, stdout } from 'process';
import { greetUser, sayGoodbye, showCurrentDirectory } from './src/utils/index.js';
import {
  COMMAND_ADD,
  COMMAND_CAT,
  COMMAND_CD,
  COMMAND_COMPRESS,
  COMMAND_CP,
  COMMAND_DECOMPRESS,
  COMMAND_EXIT,
  COMMAND_HASH,
  COMMAND_LS,
  COMMAND_MV,
  COMMAND_OS,
  COMMAND_RM,
  COMMAND_RN,
  COMMAND_UP,
  ERROR_TEXT_EXECUTION,
  ERROR_TEXT_INPUT,
} from './src/constants/index.js';
import {
  goUpper,
  changeDirectory,
  getFilesList,
  readFile,
  createFile,
  renameFile,
  copyFile,
  removeFile,
  moveFile,
  getOsInfo,
  getHash,
  compressFile,
  decompressFile,
} from './src/modules/index.js';

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
          const fileForReadPath = args[0];
          await readFile(currDir, fileForReadPath);
          break;

        case COMMAND_ADD:
          const newCreateFileName = args[0];
          await createFile(currDir, newCreateFileName);
          break;

        case COMMAND_RN:
          const oldRenameFilePath = args[0];
          const newRenameFilePath = args[1];
          await renameFile(currDir, oldRenameFilePath, newRenameFilePath);
          break;

        case COMMAND_CP:
          const oldCopyFilePath = args[0];
          const newCopyFilePath = args[1];
          await copyFile(currDir, oldCopyFilePath, newCopyFilePath);
          break;

        case COMMAND_MV:
          const oldMoveFilePath = args[0];
          const newMoveFilePath = args[1];
          await moveFile(currDir, oldMoveFilePath, newMoveFilePath);
          break;

        case COMMAND_RM:
          const fileForRemovePath = args[0];
          await removeFile(currDir, fileForRemovePath);
          break;

        case COMMAND_OS:
          const argv = args[0];
          getOsInfo(currDir, argv);
          break;

        case COMMAND_HASH:
          const fileForHashPath = args[0];
          await getHash(currDir, fileForHashPath);
          break;

        case COMMAND_COMPRESS:
          const fileForCompressPath = args[0];
          const newArchivePath = args[1];
          await compressFile(currDir, fileForCompressPath, newArchivePath);
          break;

        case COMMAND_DECOMPRESS:
          const archivePath = args[0];
          const decompressFilePath = args[1];
          await decompressFile(currDir, archivePath, decompressFilePath);
          break;

        case COMMAND_EXIT:
          readline.close();
          break;

        default:
          console.log(ERROR_TEXT_INPUT);
          break;
      }

      showCurrentDirectory(currDir);
    });

    readline.on('close', sayGoodbye.bind(null, username));
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};

await getFileManager();
