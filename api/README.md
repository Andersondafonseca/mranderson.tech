# Vercel API (Serverless)

## /api/contact

Sends contact form submissions via Resend.

### Env vars (Vercel Project → Settings → Environment Variables)
- `RESEND_API_KEY` (required)
- `CONTACT_TO` (optional, default: `anderson@assenti.net`)
- `CONTACT_FROM` (optional, default: `mranderson.tech <onboarding@resend.dev>`)
- `CONTACT_SUBJECT_PREFIX` (optional, default: `[mranderson.tech] `)

### Notes
To use a sender like `contato@mranderson.tech`, you must verify the domain in Resend (SPF/DKIM).
Otherwise, keep `onboarding@resend.dev` and rely on subject + body + reply-to.
