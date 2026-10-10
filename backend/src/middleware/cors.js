'use strict';

const { ALLOWED_ORIGINS } = require('../config/env');

const cleanedAllowedOrigins = (ALLOWED_ORIGINS || []).map((o) => o.replace(/\/+$/, ''));
const allowsWildcard = cleanedAllowedOrigins.includes('*') || cleanedAllowedOrigins.length === 0;

function corsMiddleware(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  const origin = req.headers.origin;
  const normalizedOrigin = origin ? origin.replace(/\/+$/, '') : null;
  const isLocalOrigin = origin && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const isAllowed = !origin || allowsWildcard || isLocalOrigin || cleanedAllowedOrigins.includes(normalizedOrigin);

  if (origin && !isAllowed) {
    console.warn(`[cors] Rejected origin: ${origin}. Allowed: ${cleanedAllowedOrigins.join(', ')}`);
    return res.status(403).json({ ok: false, error: 'Origin not allowed.' });
  }

  res.setHeader('Access-Control-Allow-Origin', origin || (allowsWildcard ? '*' : cleanedAllowedOrigins[0]) || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

module.exports = corsMiddleware;
