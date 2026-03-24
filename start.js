// start.js
// one liner: pm2 stop 0 && git pull && npm install && bun run build && pm2 restart 0
const { exec } = require('child_process');

exec('bun run start -p 3000', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});