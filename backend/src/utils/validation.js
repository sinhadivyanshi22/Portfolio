'use strict';

const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
  minMessage: 10,
  minFormFillMs: 1500,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function clean(value) {
  return typeof value === 'string' ? value.replace(/\0/g, '').trim() : '';
}

function validate(payload) {
  const name = clean(payload.name);
  const email = clean(payload.email);
  const subject = clean(payload.subject);
  const message = clean(payload.message);
  const errors = {};

  if (name.length < 2) errors.name = 'Please enter your name.';
  else if (name.length > LIMITS.name) errors.name = 'Name is too long.';

  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > LIMITS.email) errors.email = 'Email is too long.';

  if (subject.length < 3) errors.subject = 'Please add a subject.';
  else if (subject.length > LIMITS.subject) errors.subject = 'Subject is too long.';

  if (message.length < LIMITS.minMessage) errors.message = 'Message is too short.';
  else if (message.length > LIMITS.message) errors.message = 'Message is too long.';

  return { errors, data: { name, email, subject, message } };
}

module.exports = { LIMITS, EMAIL_RE, escapeHtml, clean, validate };
