'use strict';

const path = require('path');

// Ensure .env is loaded from backend directory or project root
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
require('dotenv').config();

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || (process.env.RESEND_API_KEY ? 'resend' : 'smtp');
const PORT = Number(process.env.PORT) || 4173;
const MAIL_TO = process.env.MAIL_TO || 'sinhadivyanshi2205@gmail.com';
const MAIL_FROM = process.env.MAIL_FROM || 'onboarding@resend.dev';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const resendConfigured = Boolean(RESEND_API_KEY);
const smtpConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

if (!resendConfigured && !smtpConfigured) {
  console.warn(
    '[warn] No email provider configured. Set RESEND_API_KEY or SMTP_* in .env — submissions will not be delivered.'
  );
}

module.exports = {
  PORT,
  MAIL_TO,
  MAIL_FROM,
  ALLOWED_ORIGINS,
  EMAIL_PROVIDER,
  RESEND_API_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  resendConfigured,
  smtpConfigured,
};
