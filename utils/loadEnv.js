import { readFileSync } from 'fs';

function loadEnv(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const env = {};

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, value] = trimmedLine.split('=');
      env[key] = value;
    }
  }

  return env;
}

export default loadEnv;
