'use server';

import { Resend } from 'resend';
import { business } from './theme';
import type { ContactFormState, QuickEnquiryState } from './contact-form';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// E.164-ish: optional +, then 7–15 digits, allowing spaces, dashes, parens.
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

function str(formData: FormData, key: string) {
  return (formData.get(key) ?? '').toString().trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type EnquiryEmail = {
  name: string;
  phone: string;
  email: string;
  service?: string;
  address?: string;
  message?: string;
};

type DeliverResult = { ok: true } | { ok: false; reason: 'config' | 'send' };

// Shared delivery: builds and sends the enquiry email via Resend.
async function deliverEnquiry(data: EnquiryEmail): Promise<DeliverResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set; cannot send enquiry.');
    return { ok: false, reason: 'config' };
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || business.email;
  // Must be an address on a domain verified in your Resend account.
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  const rows: [string, string][] = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email],
    ['Service required', data.service || 'Not specified'],
    ['Property address', data.address || 'Not specified'],
  ];

  const messageBlock = data.message
    ? `
    <p style="font-family:sans-serif;font-size:14px;margin-top:16px;"><strong>Message</strong></p>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;">${escapeHtml(data.message)}</p>`
    : '';

  const html = `
    <h2 style="margin:0 0 16px;font-family:sans-serif;">New enquiry from ${escapeHtml(business.name)} website</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;font-weight:600;vertical-align:top;">${label}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
        )
        .join('')}
    </table>${messageBlock}
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    ...(data.message ? ['', `Message:\n${data.message}`] : []),
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: `${business.name} Website <${from}>`,
      to: [to],
      replyTo: data.email,
      subject: `New enquiry: ${data.name}${data.service ? `, ${data.service}` : ''}`,
      html,
      text,
    });

    if (error) {
      console.error('Resend failed to send enquiry:', error);
      return { ok: false, reason: 'send' };
    }
  } catch (err) {
    console.error('Unexpected error sending enquiry:', err);
    return { ok: false, reason: 'send' };
  }

  return { ok: true };
}

const CONFIG_ERROR =
  'Sorry, the form is temporarily unavailable. Please call or email us directly.';
const SEND_ERROR = 'Sorry, something went wrong sending your enquiry. Please try again or call us.';
const SUCCESS = "Thanks, your enquiry is on its way. We'll be in touch within one business day.";

export async function sendContactEnquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = str(formData, 'name');
  const phone = str(formData, 'phone');
  const email = str(formData, 'email');
  const service = str(formData, 'service');
  const address = str(formData, 'address');
  const message = str(formData, 'message');

  const values: ContactFormState['values'] = {
    name,
    phone,
    email,
    service,
    address,
    message,
  };

  const errors: ContactFormState['errors'] = {};
  if (!name) errors.name = 'Please enter your name.';
  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (!PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number.';
  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (!message) errors.message = 'Please tell us about your matter.';

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please correct the highlighted fields and try again.',
      errors,
      values,
    };
  }

  const result = await deliverEnquiry({ name, phone, email, service, address, message });
  if (!result.ok) {
    return {
      status: 'error',
      message: result.reason === 'config' ? CONFIG_ERROR : SEND_ERROR,
      errors: {},
      values,
    };
  }

  return { status: 'success', message: SUCCESS, errors: {}, values: {} };
}

export async function sendQuickEnquiry(
  _prevState: QuickEnquiryState,
  formData: FormData,
): Promise<QuickEnquiryState> {
  const firstName = str(formData, 'firstName');
  const lastName = str(formData, 'lastName');
  const phone = str(formData, 'phone');
  const email = str(formData, 'email');
  const service = str(formData, 'service');

  const values: QuickEnquiryState['values'] = {
    firstName,
    lastName,
    phone,
    email,
    service,
  };

  const errors: QuickEnquiryState['errors'] = {};
  if (!firstName) errors.firstName = 'Required.';
  if (!lastName) errors.lastName = 'Required.';
  if (!phone) errors.phone = 'Please enter a phone number.';
  else if (!PHONE_RE.test(phone)) errors.phone = 'Please enter a valid phone number.';
  if (!email) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please correct the highlighted fields and try again.',
      errors,
      values,
    };
  }

  const result = await deliverEnquiry({
    name: `${firstName} ${lastName}`,
    phone,
    email,
    service,
  });
  if (!result.ok) {
    return {
      status: 'error',
      message: result.reason === 'config' ? CONFIG_ERROR : SEND_ERROR,
      errors: {},
      values,
    };
  }

  return { status: 'success', message: SUCCESS, errors: {}, values: {} };
}
