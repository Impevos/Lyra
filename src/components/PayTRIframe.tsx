'use client';

interface PayTRIframeProps {
  /** PayTR API'den alınan iframe token'ı */
  paytrToken: string;
}

export default function PayTRIframe({ paytrToken }: PayTRIframeProps) {
  if (!paytrToken) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <iframe
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
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
