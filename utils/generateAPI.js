import { exec } from 'child_process';
import loadEnv from './loadEnv.js';

const env = loadEnv('.env');
const url = env.VITE_OPENAPI_URL;

const command = `npx openapi-typescript ${url} --output src/api/api.types.ts && prettier src/api/api.types.ts --write`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Ошибка: ${stderr}`);
    return;
  }
  console.log(stdout);
});
