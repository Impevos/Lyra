import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      payment_amount,   // Kuruş cinsinden (100.00 TL = 10000)
      user_name,
      user_address,
      user_phone,
      user_basket,       // Dizi olarak gelir: [["Ürün", "150.00", 1]]
      merchant_oid,      // Benzersiz sipariş numarası
    } = body;
    
    // Güvenli Base64 Çevirisi (btoa yerine Buffer kullanarak Türkçe karakter sorununu çözer)
    const user_basket_encoded = Buffer.from(JSON.stringify(user_basket)).toString('base64');

    // --- ENV ---
    const merchant_id   = (process.env.PAYTR_MERCHANT_ID || '').trim();
    // PayTR keys/salts are exactly alphanumeric. Remove any invisible chars.
    const merchant_key  = (process.env.PAYTR_MERCHANT_KEY || '').replace(/[^a-zA-Z0-9]/g, '');
    const merchant_salt = (process.env.PAYTR_MERCHANT_SALT || '').replace(/[^a-zA-Z0-9]/g, '');
    
    const safeEmail = (email || '').trim();

    if (!merchant_id || !merchant_key || !merchant_salt) {
      return NextResponse.json(
        { error: 'PayTR credentials eksik. PAYTR_MERCHANT_ID, PAYTR_MERCHANT_KEY, PAYTR_MERCHANT_SALT env değişkenlerini kontrol edin.' },
        { status: 500 }
      );
    }

    // --- USER IP (Vercel / Reverse Proxy) ---
    const headersList = await headers();
    const user_ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      '127.0.0.1';

    // --- Sabit Parametreler ---
    const no_installment  = '0';    // 0 = taksit aktif, 1 = sadece tek çekim
    const max_installment = '0';    // 0 = tüm taksit seçenekleri açık
    const currency        = 'TL';
    const test_mode       = process.env.PAYTR_TEST_MODE || '1';
    const timeout_limit   = '30';   // Dakika
    const debug_on        = '1';    // 1 = hata detayları açık
    const lang            = 'tr';

    // Callback & Redirect URL'leri
    const merchant_ok_url   = process.env.PAYTR_OK_URL   || 'https://lyraonearth.com/odeme/basarili';
    const merchant_fail_url = process.env.PAYTR_FAIL_URL || 'https://lyraonearth.com/odeme/basarisiz';

    // --- HMAC-SHA256 HASH (PayTR Dokümantasyonu) ---
    // Sıralama KRİTİK:
    // merchant_id + user_ip + merchant_oid + email + payment_amount +
    // user_basket + no_installment + max_installment + currency + test_mode
    const hashStr =
      merchant_id +
      user_ip +
      merchant_oid +
      safeEmail +
      String(payment_amount) +
      user_basket_encoded +
      no_installment +
      max_installment +
      currency +
      test_mode;

    const paytr_token = crypto
      .createHmac('sha256', merchant_key + merchant_salt)
      .update(hashStr)
      .digest('base64');

    // --- PayTR API İsteği ---
    const params = new URLSearchParams({
      merchant_id,
      user_ip,
      merchant_oid,
      email: safeEmail,
      payment_amount: String(payment_amount),
      paytr_token,
      user_basket: user_basket_encoded,
      debug_on,
      no_installment,
      max_installment,
      currency,
      test_mode,
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      timeout_limit,
      lang,
    });

    const response = await fetch('https://www.paytr.com/odeme/api/get-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const result = await response.json();

    if (result.status === 'success') {
      return NextResponse.json({ token: result.token });
    } else {
      console.error('PayTR Token Error:', result);
      return NextResponse.json(
        { 
          error: 'PayTR token alınamadı.', 
          reason: result.reason,
          debug: {
            hashStr,
            tokenGenerated: paytr_token,
            merchantIdLen: merchant_id.length,
            keyLen: merchant_key.length,
            saltLen: merchant_salt.length,
            basketBase64: user_basket_encoded,
            ip: user_ip,
          }
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('PayTR Token Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
