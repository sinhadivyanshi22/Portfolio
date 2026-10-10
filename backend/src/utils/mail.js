'use strict';

const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const {
  MAIL_TO,
  MAIL_FROM,
  RESEND_API_KEY,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  EMAIL_PROVIDER,
  resendConfigured,
  smtpConfigured,
} = require('../config/env');

const { escapeHtml } = require('./validation');

let resendClient = null;
let transporter = null;

function getResendClient() {
  if (!resendClient && RESEND_API_KEY) {
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

if (resendConfigured) {
  getResendClient();
}

if (smtpConfigured) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

function buildMail({ name, email, subject, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const stamp = new Date().toISOString();

  return {
    from: MAIL_FROM,
    to: MAIL_TO,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      message,
      '',
      '--',
      `Sent: ${stamp}`,
    ].join('\n'),
    html: `
      <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#0b0b10;color:#e2e8f0;padding:24px;border-radius:12px;border:1px solid #1e293b">
        <p style="margin:0 0 16px;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#00f2fe">New portfolio message</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr><td style="padding:6px 12px 6px 0;color:#94a3b8;white-space:nowrap">Name</td><td style="padding:6px 0;font-weight:700">${safeName}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#94a3b8;white-space:nowrap">Email</td><td style="padding:6px 0"><a href="mailto:${safeEmail}" style="color:#00f2fe">${safeEmail}</a></td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#94a3b8;white-space:nowrap">Subject</td><td style="padding:6px 0">${safeSubject}</td></tr>
        </table>
        <hr style="border:0;border-top:1px solid #1e293b;margin:20px 0" />
        <div style="font-size:14px;line-height:1.65">${safeMessage}</div>
        <p style="margin:20px 0 0;font-size:11px;color:#64748b">Sent: ${stamp}</p>
      </div>
    `.trim(),
  };
}

async function sendMail(mail) {
  const provider = (EMAIL_PROVIDER || '').toLowerCase();

  if (provider === 'resend' || (resendConfigured && !smtpConfigured)) {
    return sendViaResend(mail);
  }

  if (provider === 'smtp' && smtpConfigured && transporter) {
    return transporter.sendMail(mail);
  }

  if (resendConfigured) {
    return sendViaResend(mail);
  }

  if (smtpConfigured && transporter) {
    return transporter.sendMail(mail);
  }

  throw new Error('No email provider configured');
}

async function sendViaResend(mail) {
  const client = getResendClient();
  if (!client) {
    throw new Error('Resend client is not initialized. Please verify RESEND_API_KEY in .env.');
  }

  const { from, to, replyTo, subject, text, html } = mail;
  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    replyTo: replyTo,
    reply_to: replyTo,
    subject,
    text,
    html,
  };

  const { data, error } = await client.emails.send(payload);
  if (error) {
    console.error('[resend] API error:', JSON.stringify(error));
    throw new Error(error.message || 'Resend API returned an error.');
  }
  console.log('[resend] Email sent, id:', data?.id);
  return data;
}

module.exports = { buildMail, sendMail, sendViaResend };
