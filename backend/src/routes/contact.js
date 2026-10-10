'use strict';

const { clean, validate } = require('../utils/validation');
const { LIMITS } = require('../utils/validation');
const { buildMail, sendMail } = require('../utils/mail');
const { resendConfigured, smtpConfigured } = require('../config/env');

async function contactRouter(req, res) {
  const payload = req.body || {};

  if (clean(payload.company_website)) {
    return res.json({ ok: true });
  }

  const renderedAt = Number(payload.renderedAt);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < LIMITS.minFormFillMs) {
    return res.status(400).json({ ok: false, error: 'Submission rejected.' });
  }

  const { errors, data } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: 'Please fix the highlighted fields.', fields: errors });
  }

  if (!smtpConfigured && !resendConfigured) {
    console.error('[error] No email provider configured, cannot deliver message.');
    return res.status(503).json({ ok: false, error: 'Messaging is temporarily unavailable. Please email me directly.' });
  }

  try {
    await sendMail(buildMail(data));
    return res.json({ ok: true });
  } catch (err) {
    console.error('[error] Failed to send contact message:', err.message);
    return res.status(500).json({ ok: false, error: 'Could not send your message. Please try again.' });
  }
}

module.exports = contactRouter;
