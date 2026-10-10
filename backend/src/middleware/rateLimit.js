'use strict';

const rateLimit = require('express-rate-limit');

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'Too many messages sent. Please try again later.' },
});

module.exports = contactLimiter;
