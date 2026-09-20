import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

// Send thank-you email directly via nodemailer (no internal fetch to avoid cold-start issues)
async function sendThankYouEmail(to: string, name: string, productTitle: string, amount: number) {
  const smtpPassword = process.env.SMTP_PASSWORD;
  if (!smtpPassword) {
    console.error('SMTP_PASSWORD not set, cannot send email');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'false' ? false : true,
    auth: {
      user: process.env.SMTP_USER || 'info@lyraonearth.com',
      pass: smtpPassword,
    },
  });

  const amountStr = amount > 0 ? `₺${(amount / 100).toFixed(2)}` : '';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Teşekkür Ederiz ✨</title></head>
<body style="background-color: #FDFCF7; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FDFCF7; padding: 40px 10px;">
    <tr><td align="center">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #DFC15D; box-shadow: 0 10px 30px rgba(91,28,42,0.06); overflow: hidden;">
        <!-- HEADER -->
        <tr><td align="center" style="background: linear-gradient(135deg, #4A121E 0%, #5B1C2A 100%); padding: 45px 20px; border-bottom: 2px solid #DFC15D;">
          <img src="https://lyraonearth.com/Lyra-Logo-White.png" alt="Lyra On Earth" style="height: 60px; width: auto; display: block; margin-bottom: 16px;" />
          <p style="margin: 0; font-size: 11px; color: #DFC15D; letter-spacing: 0.3em; text-transform: uppercase; font-weight: bold;">TEŞEKKÜR EDERİZ</p>
        </td></tr>
        <!-- ACCENT LINE -->
        <tr><td style="height: 3px; background: linear-gradient(90deg, #DFC15D, #A39B94, #DFC15D);"></td></tr>
        <!-- CONTENT -->
        <tr><td style="padding: 45px 35px 20px 35px; color: #3A3530; font-size: 15px;">
          <h1 style="margin: 0 0 8px 0; font-size: 22px; color: #3E0A16; font-family: Georgia, serif; font-weight: bold; text-align: center;">Sevgili ${name},</h1>
          <p style="margin: 0 0 24px 0; text-align: center; font-size: 13px; color: #A39B94; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">ÖDEMENİZ BAŞARIYLA ALINDI</p>
          <!-- PRODUCT BOX -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
            <tr><td style="padding: 20px 24px; background-color: #FBF8F4; border: 1px solid #EAD8C0;">
              <p style="margin: 0 0 4px 0; font-size: 11px; color: #A39B94; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">SATIN ALINAN</p>
              <p style="margin: 0; font-size: 18px; color: #3E0A16; font-weight: bold; font-family: Georgia, serif;">${productTitle}</p>
              ${amountStr ? `<p style="margin: 6px 0 0 0; font-size: 13px; color: #A39B94; font-weight: bold;">${amountStr}</p>` : ''}
            </td></tr>
          </table>
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">Bu yolculuğa adım attığınız için çok mutluyuz. Sizinle birlikte çalışmak bizim için büyük bir onur.</p>
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">Eğitim programınıza dair tüm bilgiler, erişim detayları ve içerikler en kısa sürede ayrı bir e-posta ile paylaşılacaktır.</p>
          <p style="margin: 0 0 16px 0; line-height: 1.8; font-size: 14px; color: #4A443F;">Herhangi bir sorunuz olursa <strong>@lyra.onearth</strong> Instagram hesabından veya <strong>info@lyraonearth.com</strong> adresinden ulaşabilirsiniz.</p>
        </td></tr>
        <!-- DIVIDER & SIGNATURE -->
        <tr><td align="center" style="padding: 0 35px 30px 35px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <div style="display:inline-block;width:50px;height:1px;background:#DFC15D;vertical-align:middle;"></div>
            <span style="color:#DFC15D;font-size:14px;margin:0 10px;vertical-align:middle;">✦</span>
            <div style="display:inline-block;width:50px;height:1px;background:#DFC15D;vertical-align:middle;"></div>
          </td></tr></table>
          <p style="margin: 16px 0 0 0; font-size: 15px; color: #3E0A16; font-family: Georgia, serif; font-style: italic; text-align: center;">Işığınız yolunuzu aydınlatsın. ✨</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #A39B94; font-weight: bold;">Deniz Bayraktar</p>
          <p style="margin: 2px 0 0 0; font-size: 11px; color: #9A9590; letter-spacing: 0.1em;">LYRA ON EARTH</p>
        </td></tr>
        <!-- FOOTER -->
        <tr><td align="center" style="background-color: #FAF8F5; border-top: 1px solid #EAD8C0; padding: 30px 20px; font-size: 11px; color: #9A9590;">
          <table border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;"><tr><td align="center">
            <a href="https://lyraonearth.com" style="color: #5B1C2A; text-decoration: none; font-weight: bold; margin: 0 12px;">Web Sitesi</a>
            <span style="color: #DFC15D;">•</span>
            <a href="https://www.instagram.com/lyra.onearth/" style="color: #5B1C2A; text-decoration: none; font-weight: bold; margin: 0 12px;">Instagram</a>
          </td></tr></table>
          <p style="margin: 0;">Bu e-posta Lyra On Earth tarafından otomatik olarak gönderilmiştir.<br>© 2026 Lyra On Earth. Tüm Hakları Saklıdır.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `Lyra On Earth <${process.env.SMTP_USER || 'info@lyraonearth.com'}>`,
    to,
    subject: `✨ Teşekkürler ${name} — ${productTitle} Kaydınız Alındı`,
    html,
    text: `Sevgili ${name}, ${productTitle} siparişinizin ödemesi başarıyla alınmıştır. En kısa sürede detaylar iletilecektir. Sevgiler, Lyra On Earth`,
  });
}

export async function POST(req: NextRequest) {
  try {
    // PayTR callback data is sent as application/x-www-form-urlencoded
    const text = await req.text();
    const params = new URLSearchParams(text);
    
    const merchant_oid = params.get('merchant_oid');
    const status = params.get('status');
    const total_amount = params.get('total_amount');
    const hash = params.get('hash');

    if (!merchant_oid || !status || !total_amount || !hash) {
      return new NextResponse('Bad request', { status: 400 });
    }

    const merchant_key = (process.env.PAYTR_MERCHANT_KEY || '').replace(/[^a-zA-Z0-9]/g, '');
    const merchant_salt = (process.env.PAYTR_MERCHANT_SALT || '').replace(/[^a-zA-Z0-9]/g, '');

    // 1) Verify the hash to ensure the request is from PayTR
    const paytr_token_str = merchant_oid + merchant_salt + status + total_amount;
    const token = crypto
      .createHmac('sha256', merchant_key)
      .update(paytr_token_str)
      .digest('base64');

    if (token !== hash) {
      console.error('PAYTR notification failed: bad hash');
      return new NextResponse('PAYTR notification failed: bad hash', { status: 400 });
    }

    // 2) Handle the payment status
    if (status === 'success') {
      console.log(`Payment successful for order: ${merchant_oid}`);
      
      // Fetch order from Supabase
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('merchant_oid', merchant_oid)
        .single();

      if (order && !fetchError) {
        // Update order status
        await supabase
          .from('orders')
          .update({ status: 'success', updated_at: new Date().toISOString() })
          .eq('merchant_oid', merchant_oid);

        // Send thank-you email directly via nodemailer
        try {
          await sendThankYouEmail(
            order.customer_email,
            order.customer_name,
            order.product_title,
            order.amount
          );
          console.log(`Thank-you email sent to ${order.customer_email}`);
        } catch (emailErr) {
          console.error('Failed to send customer email:', emailErr);
        }
      } else {
        // Order not found in DB (edge case) — try to send a generic confirmation
        console.warn(`Order ${merchant_oid} not found in DB. fetchError:`, fetchError);
        // We still return OK so PayTR doesn't keep retrying
      }
      
    } else {
      // Payment failed
      const failed_reason_msg = params.get('failed_reason_msg') || 'Bilinmeyen hata';
      console.error(`Payment failed for order: ${merchant_oid}. Reason: ${failed_reason_msg}`);
      
      await supabase
        .from('orders')
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('merchant_oid', merchant_oid);
    }

    // 3) Respond with 'OK' so PayTR stops sending notifications
    return new NextResponse('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });

  } catch (error) {
    console.error('PayTR Callback Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
