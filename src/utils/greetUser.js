import { showCurrentDirectory } from './index.js';

export const greetUser = (currDir) => {
  const rawUsername = process.argv.find((el) => el.startsWith('--username=')).split('=')[1];
  const username = rawUsername.charAt(0).toUpperCase() + rawUsername.slice(1);

  console.log(`Welcome to the File Manager, ${username}!`);

  showCurrentDirectory(currDir);

  return username;
};
