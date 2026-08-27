import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, text, html, smtpConfig } = body;

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json({ error: 'Missing required fields (to, subject, text/html)' }, { status: 400 });
    }

    // Determine SMTP password
    // Use env var for public checkouts to avoid exposing password in frontend
    // Use smtpConfig.password if provided (e.g., for admin panel tests)
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
      secure, // true for 465, false for other ports
      auth: {
        user,
        pass: smtpPassword,
      },
    });

    const mailOptions = {
      from: `Lyra On Earth <${user}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
