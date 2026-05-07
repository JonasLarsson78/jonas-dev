import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body as { name?: string; email?: string; message?: string }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const timestamp = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
  const site = 'jonas-dev-se.vercel.app'
  const html = `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">

        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f 0%,#1e40af 100%);padding:28px 32px">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.1em;color:rgba(255,255,255,0.6);text-transform:uppercase">Nytt meddelande via</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#ffffff">${site}</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 32px 0">
            <p style="margin:0 0 6px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#6b7280;text-transform:uppercase">Från</p>
            <p style="margin:0;font-size:17px;font-weight:600;color:#111827">${name}</p>
            <a href="mailto:${email}" style="font-size:14px;color:#1d4ed8;text-decoration:none">${email}</a>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px 0">
            <p style="margin:0 0 10px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#6b7280;text-transform:uppercase">Meddelande</p>
            <div style="background:#f9fafb;border-left:3px solid #1d4ed8;border-radius:4px;padding:16px 18px">
              <p style="margin:0;font-size:15px;line-height:1.65;color:#374151;white-space:pre-wrap">${message}</p>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 32px">
            <a href="mailto:${email}" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:10px 22px;border-radius:6px">Svara på meddelandet</a>
          </td>
        </tr>

        <tr>
          <td style="padding:16px 32px 24px;border-top:1px solid #f0f0f0">
            <p style="margin:0;font-size:12px;color:#9ca3af">Skickat ${timestamp} via kontaktformuläret på jonaslarsson.dev</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const text = `Nytt meddelande från kontaktformuläret\n\nFrån: ${name} <${email}>\n\n${message}\n\nSkickat: ${timestamp}`
  const from = 'jonas-dev-se.vercel.app'
  await transporter.sendMail({
    from: `${from} <${process.env.SMTP_USER}>`,
    replyTo: `"${name}" <${email}>`,
    to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
    subject: `Nytt meddelande från ${name} via ${from}`,
    text,
    html,
  })

  return res.status(200).json({ ok: true })
}
