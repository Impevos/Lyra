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
        <!-- OUTER BORDER BOX FOR LUXURY LOOK -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #DFC15D; box-shadow: 0 10px 30px rgba(91, 28, 42, 0.06); overflow: hidden;">
          
          <!-- TOP GLOWING WINE HEADER -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #4A121E 0%, #5B1C2A 100%); background-color: #5B1C2A; padding: 40px 20px; border-bottom: 2px solid #DFC15D;">
              <img src="https://lyraonearth.com/Lyra-Logo-White.png" alt="Lyra On Earth" style="height: 70px; width: auto; display: block;" />
            </td>
          </tr>
          
          <!-- CONTENT -->
          <tr>
            <td style="padding: 45px 35px 35px 35px; color: #3A3530; font-size: 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${htmlContent}
              
              <!-- Celestial Divider -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 35px 0;">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; width: 50px; height: 1px; background-color: #DFC15D; vertical-align: middle;"></div>
                    <span style="color: #DFC15D; font-size: 14px; margin: 0 10px; vertical-align: middle;">✦</span>
                    <div style="display: inline-block; width: 50px; height: 1px; background-color: #DFC15D; vertical-align: middle;"></div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 13px; color: #7A7570; text-align: center; font-style: italic; font-family: Georgia, serif;">
                Gökyüzünün rehberliği ve enerjinin şifası sizinle olsun.
              </p>
            </td>
          </tr>
          
          <!-- FOOTER -->
          <tr>
            <td align="center" style="background-color: #FAF8F5; border-top: 1px solid #EAD8C0; padding: 35px 20px; color: #7A7570; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; width: auto; margin-left: auto; margin-right: auto;">
                <tr>
                  <td align="center">
                    <a href="https://lyraonearth.com" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 15px; letter-spacing: 0.05em;">Web Sitesi</a>
                    <span style="color: #DFC15D; font-size: 14px;">•</span>
                    <a href="https://www.instagram.com/lyra.onearth/" style="color: #5B1C2A; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 15px; letter-spacing: 0.05em;">Instagram</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; line-height: 1.6; font-size: 11px; color: #9A9590; letter-spacing: 0.02em;">
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
