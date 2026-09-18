import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to');

  if (!to) {
    return NextResponse.json({ error: 'to parametresi eksik. Örnek: /api/email/test?to=test@gmail.com' }, { status: 400 });
  }

  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpUser = process.env.SMTP_USER || 'info@lyraonearth.com';
  const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = process.env.SMTP_SECURE === 'false' ? false : true;

  if (!smtpPassword) {
    return NextResponse.json({ error: 'SMTP_PASSWORD env değişkeni set edilmemiş' }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    // Verify SMTP connection first
    await transporter.verify();

    // Send test email
    const info = await transporter.sendMail({
      from: `Lyra On Earth <${smtpUser}>`,
      to,
      subject: '✅ Lyra - SMTP Test E-postası',
      html: `<h2>SMTP Test Başarılı</h2><p>Bu e-posta Lyra On Earth sunucusundan gönderilmiştir.</p><p><strong>SMTP Ayarları:</strong></p><ul><li>Host: ${smtpHost}</li><li>Port: ${smtpPort}</li><li>Secure: ${smtpSecure}</li><li>User: ${smtpUser}</li></ul>`,
      text: `SMTP Test Başarılı. Host: ${smtpHost}, Port: ${smtpPort}, User: ${smtpUser}`,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      to,
      from: smtpUser,
      smtp: { host: smtpHost, port: smtpPort, secure: smtpSecure }
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      smtp: { host: smtpHost, port: smtpPort, secure: smtpSecure, user: smtpUser, passwordSet: !!smtpPassword }
    }, { status: 500 });
  }
}
