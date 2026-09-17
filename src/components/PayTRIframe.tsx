'use client';

import { useState, useEffect } from 'react';

interface PayTRIframeProps {
  /** Müşteri e-posta adresi */
  email: string;
  /** Kuruş cinsinden ödeme tutarı (100 TL = 10000) */
  paymentAmount: number;
  /** Müşteri adı soyadı */
  userName: string;
  /** Müşteri adresi */
  userAddress: string;
  /** Müşteri telefonu */
  userPhone: string;
  /** Benzersiz sipariş numarası */
  merchantOid: string;
  /** Base64 encoded sepet bilgisi: btoa(JSON.stringify([["Ürün Adı","Fiyat",Adet]])) */
  userBasket: string;
}

export default function PayTRIframe({
  email,
  paymentAmount,
  userName,
  userAddress,
  userPhone,
  merchantOid,
  userBasket,
}: PayTRIframeProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('/api/paytr/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            payment_amount: paymentAmount,
            user_name: userName,
            user_address: userAddress,
            user_phone: userPhone,
            merchant_oid: merchantOid,
            user_basket: userBasket,
            user_ip: '', // Sunucu tarafında headers'tan alınabilir
          }),
        });

        const data = await res.json();

        if (data.token) {
          setToken(data.token);
        } else {
          setError(data.error || 'Token alınamadı.');
        }
      } catch (err: any) {
        setError(err.message || 'Bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [email, paymentAmount, userName, userAddress, userPhone, merchantOid, userBasket]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p style={{ color: '#5B1C2A', fontSize: '14px', fontWeight: 600 }}>
          Ödeme formu yükleniyor...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p style={{ color: '#c0392b', fontSize: '14px', fontWeight: 600 }}>
          Ödeme formu yüklenemedi: {error}
        </p>
      </div>
    );
  }

  if (!token) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <iframe
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${token}`}
        frameBorder="0"
        scrolling="no"
        style={{
          width: '100%',
          height: '600px',
          border: 'none',
        }}
      />

      {/* PayTR iframe yüksekliğini otomatik ayarlayan script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              window.addEventListener('message', function (event) {
                if (event.data && typeof event.data === 'object' && event.data.iframe_height) {
                  var iframe = document.getElementById('paytriframe');
                  if (iframe) {
                    iframe.style.height = event.data.iframe_height + 'px';
                  }
                }
              });
            })();
          `,
        }}
      />
    </div>
  );
}
