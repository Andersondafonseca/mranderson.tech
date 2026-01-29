// Simple contact endpoint for Vercel.
// Sends email via Resend API.
//
// ENV required:
// - RESEND_API_KEY
// Optional:
// - CONTACT_TO (default: anderson@assenti.net)
// - CONTACT_FROM (default: "mranderson.tech <onboarding@resend.dev>")
// - CONTACT_SUBJECT_PREFIX (default: "[mranderson.tech] ")

const json = (res: any, status: number, body: any) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(res, 500, { ok: false, error: 'Server not configured (RESEND_API_KEY missing)' });

  const to = process.env.CONTACT_TO || 'anderson@assenti.net';
  const from = process.env.CONTACT_FROM || 'mranderson.tech <onboarding@resend.dev>';
  const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || '[mranderson.tech] ';

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const name = String(body?.name || '').trim();
  const email = String(body?.email || '').trim();
  const phone = String(body?.phone || '').trim();
  const subject = String(body?.subject || '').trim();
  const message = String(body?.message || '').trim();

  if (!name || !email || !subject || !message) {
    return json(res, 400, { ok: false, error: 'Missing required fields' });
  }

  // Very light validation
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return json(res, 400, { ok: false, error: 'Invalid email' });
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    subject: escapeHtml(subject),
    message: escapeHtml(message),
  };

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
      <h2 style="margin: 0 0 12px;">Novo contato via mranderson.tech</h2>
      <p style="margin: 0 0 12px;">Este e-mail foi enviado pelo formulário da página de palestras/contato.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="margin: 0;"><b>Nome:</b> ${safe.name}</p>
      <p style="margin: 0;"><b>Email:</b> ${safe.email}</p>
      ${safe.phone ? `<p style="margin: 0;"><b>Telefone/WhatsApp:</b> ${safe.phone}</p>` : ''}
      <p style="margin: 0;"><b>Assunto:</b> ${safe.subject}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="white-space: pre-wrap; margin: 0;">${safe.message}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 16px 0;" />
      <p style="margin: 0; color: #666; font-size: 12px;">Origem: mranderson.tech • Endpoint: /api/contact</p>
    </div>
  `.trim();

  const payload = {
    from,
    to,
    subject: `${subjectPrefix}${subject}`,
    reply_to: email,
    html,
  };

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    return json(res, 502, { ok: false, error: 'Email provider error', details: text });
  }

  return json(res, 200, { ok: true });
}
