'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = require('./app');
const { PORT, MAIL_TO } = require('./config/env');

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[ok] Portfolio server running at http://localhost:${PORT}`);
  console.log(`[ok] Contact endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`[ok] Deliver to: ${MAIL_TO}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[error] Port ${PORT} is already in use. Change PORT in .env.`);
  } else {
    console.error('[error] Server failed to start:', err.message);
  }
  process.exit(1);
});
