'use strict';

const { resendConfigured, smtpConfigured, EMAIL_PROVIDER } = require('../config/env');

function healthRouter(req, res) {
  res.json({ ok: true, provider: EMAIL_PROVIDER, smtp: smtpConfigured, resend: resendConfigured });
}

module.exports = healthRouter;
