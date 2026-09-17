import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // PayTR callback verisini application/x-www-form-urlencoded olarak gönderir
    const formData = await request.formData();

    const merchant_oid      = formData.get('merchant_oid') as string;
    const status            = formData.get('status') as string;        // 'success' | 'failed'
    const total_amount      = formData.get('total_amount') as string;
    const hash              = formData.get('hash') as string;
    const failed_reason_code = formData.get('failed_reason_code') as string;
    const failed_reason_msg  = formData.get('failed_reason_msg') as string;
    const test_mode         = formData.get('test_mode') as string;
    const payment_type      = formData.get('payment_type') as string;
    const currency          = formData.get('currency') as string;
    const payment_amount    = formData.get('payment_amount') as string;

    // --- ENV ---
    const merchant_key  = process.env.PAYTR_MERCHANT_KEY!;
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;

    // --- HASH DOĞRULAMASI ---
    // PayTR dokümantasyonuna göre:
    // hash = HMAC-SHA256(merchant_oid + merchant_salt + status + total_amount, merchant_key) → Base64
    const expectedHash = crypto
      .createHmac('sha256', merchant_key)
      .update(merchant_oid + merchant_salt + status + total_amount)
      .digest('base64');

    if (hash !== expectedHash) {
      console.error('PayTR Webhook: HASH doğrulaması BAŞARISIZ!', {
        merchant_oid,
        receivedHash: hash,
        expectedHash,
      });
      return new Response('HASH_MISMATCH', { status: 400 });
    }

    // --- İŞLEM SONUCU ---
    if (status === 'success') {
      // ✅ ÖDEME BAŞARILI
      // TODO: Sipariş onayı ve iş mantığı buraya eklenecek
      console.log('PayTR Webhook: Ödeme BAŞARILI', {
        merchant_oid,
        total_amount,
        payment_type,
        currency,
        payment_amount,
        test_mode,
      });
    } else {
      // ❌ ÖDEME BAŞARISIZ
      // TODO: Sipariş onayı ve iş mantığı buraya eklenecek
      console.log('PayTR Webhook: Ödeme BAŞARISIZ', {
        merchant_oid,
        failed_reason_code,
        failed_reason_msg,
        test_mode,
      });
    }

    // --- PayTR'nin beklediği yanıt ---
    // "OK" dönülmezse PayTR webhook'u tekrar tekrar gönderir.
    return new Response('OK', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error: any) {
    console.error('PayTR Webhook Route Error:', error);
    return new Response('ERROR', { status: 500 });
  }
}
