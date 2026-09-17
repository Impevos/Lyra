'use client';

import Script from 'next/script';

interface PayTRIframeProps {
  /** PayTR API'den alınan iframe token'ı */
  paytrToken: string;
}

export default function PayTRIframe({ paytrToken }: PayTRIframeProps) {
  if (!paytrToken) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Script 
        src="https://www.paytr.com/js/iframeResizer.min.js"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).iFrameResize) {
            (window as any).iFrameResize({}, '#paytriframe');
          }
        }}
      />
      <iframe
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
        frameBorder="0"
        scrolling="no"
        style={{
          width: '100%',
          border: 'none',
        }}
      />
    </div>
  );
}
