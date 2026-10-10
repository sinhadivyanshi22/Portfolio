'use strict';

const path = require('path');
const express = require('express');

const corsMiddleware = require('./middleware/cors');
const contactLimiter = require('./middleware/rateLimit');
const healthRouter = require('./routes/health');
const contactRouter = require('./routes/contact');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: false, limit: '32kb' }));
app.use(corsMiddleware);

app.get('/api/health', healthRouter);
app.post('/api/contact', contactLimiter, contactRouter);

const FRONTEND_DIR = path.join(__dirname, '..', '..', 'frontend');

app.use(
  express.static(FRONTEND_DIR, {
    extensions: ['html'],
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
  })
);

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ ok: false, error: 'Not found.' });
  }
  res.status(404).sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error('[error] Unhandled request error:', err.message);
  res.status(500).json({ ok: false, error: 'Internal server error.' });
});

module.exports = app;
