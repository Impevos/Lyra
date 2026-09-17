import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

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
    // Node.js specific hash logic as per PayTR documentation
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
      // Payment successful
      console.log(`Payment successful for order: ${merchant_oid}`);
      
      const { data: order, error: fetchError } = await supabase
        .from('orders')
        .select('*')
        .eq('merchant_oid', merchant_oid)
        .single();

      if (order && !fetchError) {
        await supabase
          .from('orders')
          .update({ status: 'success', updated_at: new Date().toISOString() })
          .eq('merchant_oid', merchant_oid);

        // Send email to customer
        try {
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (req.headers.get('host') ? `https://${req.headers.get('host')}` : 'https://lyraonearth.com');
          await fetch(`${baseUrl}/api/email/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: order.customer_email,
              subject: 'Siparişiniz Başarıyla Alındı - Lyra On Earth',
              text: `Merhaba ${order.customer_name},\n\n"${order.product_title}" isimli siparişinizin ödemesi (₺${(order.amount / 100).toFixed(2)}) başarıyla gerçekleştirilmiştir.\n\nSatın aldığınız içerik/hizmet ile ilgili detaylar en kısa sürede size iletilecektir.\n\nTeşekkür ederiz!`
            })
          });
        } catch (emailErr) {
          console.error("Failed to send customer email:", emailErr);
        }
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
