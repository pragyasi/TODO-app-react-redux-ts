// jest-puppeteer.config.js
module.exports = {
  launch: {
    dumpio: true,
    headless: true
  },
  browser: 'chromium',
  browserContext: 'default',
  server: {
    command: `npm start`,
    port: 3000,
    launchTimeout: 16000,
    debug: true,
  },
}