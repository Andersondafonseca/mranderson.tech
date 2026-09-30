const json = (res: any, status: number, body: any) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json(res, 500, { ok: false, error: 'Canal de pedidos temporariamente indisponível.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const phone = String(body?.phone || '').trim();
    const petName = String(body?.petName || '').trim();
    const cep = String(body?.cep || '').trim();
    const style = String(body?.style || '').trim();
    const notes = String(body?.notes || '').trim();
    const photoDataUrl = String(body?.photoDataUrl || '');

    if (!name || !email || !phone || !petName || !cep || !style || !photoDataUrl) {
      return json(res, 400, { ok: false, error: 'Preencha todos os campos obrigatórios.' });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json(res, 400, { ok: false, error: 'E-mail inválido.' });
    }

    const match = photoDataUrl.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/);
    if (!match) return json(res, 400, { ok: false, error: 'Formato de imagem não suportado.' });
    const content = match[2];
    if (content.length > 4_000_000) return json(res, 413, { ok: false, error: 'Imagem muito grande.' });

    const orderRef = 'PF-' + Date.now().toString(36).toUpperCase();
    const to = process.env.PETFRAME_ORDER_TO || process.env.CONTACT_TO || 'anderson@assenti.net';
    const from = process.env.PETFRAME_FROM || process.env.CONTACT_FROM || 'Petframe <onboarding@resend.dev>';

    const html = `
      <div style="font-family:Arial,sans-serif;color:#2f211b;line-height:1.5">
        <h2>Novo pedido Petframe — ${escapeHtml(orderRef)}</h2>
        <p><b>Cliente:</b> ${escapeHtml(name)} · ${escapeHtml(email)} · ${escapeHtml(phone)}</p>
        <p><b>Pet:</b> ${escapeHtml(petName)}</p>
        <p><b>Estilo:</b> ${escapeHtml(style)}</p>
        <p><b>CEP:</b> ${escapeHtml(cep)}</p>
        <p><b>Produto:</b> Quadro personalizado 30×40 — R$ 199 + frete</p>
        ${notes ? `<p><b>Observações:</b> ${escapeHtml(notes)}</p>` : ''}
        <hr>
        <p><b>Próxima ação:</b> calcular frete, enviar valor total e link Mercado Pago ao cliente.</p>
        <p style="font-size:12px;color:#766">A foto segue anexa e deve ser usada somente para execução do pedido, salvo autorização separada para marketing.</p>
      </div>
    `.trim();

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[Petframe] Novo pedido ${orderRef} — ${petName}`,
        html,
        attachments: [{ filename: `petframe-${orderRef}.jpg`, content }],
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => '');
      console.error('Petframe order email failed', detail);
      return json(res, 502, { ok: false, error: 'Não conseguimos registrar o pedido agora. Tente novamente.' });
    }

    return json(res, 200, { ok: true, orderRef });
  } catch (error) {
    console.error('Petframe order error', error);
    return json(res, 500, { ok: false, error: 'Erro ao registrar o pedido.' });
  }
}
