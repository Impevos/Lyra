import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function wrapInTemplate(text: string, subject: string) {
  // Convert double newlines to paragraphs, single newlines to <br>
  const htmlContent = text
    .split(/\n{2,}/)
    .map(p => `<p style="margin: 0 0 15px 0; line-height: 1.8;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="background-color: #FDFCF7; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FDFCF7; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #EAD8C0; box-shadow: 0 4px 20px rgba(91, 28, 42, 0.04); overflow: hidden;">
          <!-- HEADER -->
          <tr>
            <td align="center" style="background-color: #5B1C2A; padding: 35px 20px; border-bottom: 3px solid #C5A880;">
              <img src="https://lyraonearth.com/Lyra-Logo-White.png" alt="Lyra On Earth" style="height: 65px; width: auto; display: block;" />
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding: 40px 30px; color: #3A3530; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${htmlContent}
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="background-color: #F9F6F0; border-top: 1px solid #EAD8C0; padding: 30px 20px; color: #7A7570; font-size: 12px;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 15px; width: auto; margin-left: auto; margin-right: auto;">
                <tr>
                  <td align="center">
                    <a href="https://lyraonearth.com" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Web Sitesi</a>
                    <span style="color: #EAD8C0;">|</span>
                    <a href="https://instagram.com/lyraonearth" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 10px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">Instagram</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Bu e-posta <strong>Lyra On Earth</strong> tarafından otomatik olarak gönderilmiştir.<br>
                © 2026 Lyra On Earth. Tüm Hakları Saklıdır.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, text, html, smtpConfig } = body;

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Missing required fields (to, subject, text/html)' }, { status: 400 });
    }

    // Determine SMTP password
    const smtpPassword = process.env.SMTP_PASSWORD || smtpConfig?.password;

    if (!smtpPassword) {
      return NextResponse.json({ error: 'SMTP password is not configured on the server (SMTP_PASSWORD env var) and was not provided in the request.' }, { status: 500 });
    }

    const host = process.env.SMTP_HOST || smtpConfig?.host || 'smtp.hostinger.com';
    const port = Number(process.env.SMTP_PORT || smtpConfig?.port || 465);
    const secure = process.env.SMTP_SECURE === 'false' ? false : (smtpConfig?.secure ?? true);
    const user = process.env.SMTP_USER || smtpConfig?.user || 'info@lyraonearth.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass: smtpPassword,
      },
    });

    let finalHtml = html;
    let attachments: any[] = [];

    // If no HTML is provided, wrap plain text in the brand template
    if (!finalHtml && text) {
      finalHtml = wrapInTemplate(text, subject);

      // Attempt to load the logo locally to attach as an inline image (CID)
      try {
        const logoPath = path.join(process.cwd(), 'public', 'Lyra-Logo-White.png');
        if (fs.existsSync(logoPath)) {
          finalHtml = finalHtml.replace(
            'https://lyraonearth.com/Lyra-Logo-White.png',
            'cid:lyralogo'
          );
          attachments.push({
            filename: 'Lyra-Logo-White.png',
            path: logoPath,
            cid: 'lyralogo'
          });
        }
      } catch (err) {
        console.error('Failed to attach logo inline:', err);
      }
    }

    const mailOptions = {
      from: `Lyra On Earth <${user}>`,
      to,
      subject,
      text: text || '',
      html: finalHtml,
      attachments
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
