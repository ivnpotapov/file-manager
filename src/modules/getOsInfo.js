import { ERROR_TEXT_EXECUTION, ERROR_TEXT_INPUT } from '../constants/index.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
export const getOsInfo = (currDir, argv) => {
  try {
    switch (argv) {
      case '--EOL':
        console.log(EOL);
        break;

      case '--cpus':
        const cpuS = cpus();
        console.log('amount of CPUS:', cpuS.length);
        cpuS.forEach((cpu, idx) => {
          const model = cpu.model;
          const speedGhz = (cpu.speed / 1000).toFixed(2);
          console.log('number:', idx + 1, 'model:', model, 'clock rate:', speedGhz);
        });
        break;

      case '--homedir':
        console.log(homedir());
        break;

      case '--username':
        console.log(userInfo().username);
        break;

      case '--architecture':
        console.log(arch());
        break;

      default:
        console.log(ERROR_TEXT_INPUT);
        break;
    }
  } catch (error) {
    console.log(ERROR_TEXT_EXECUTION);
  }
};
