'use client';

import { useEffect, useRef } from 'react';

interface PayTRIframeProps {
  /** PayTR API'den alınan iframe token'ı */
  paytrToken: string;
}

export default function PayTRIframe({ paytrToken }: PayTRIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object' && event.data.iframe_height) {
        if (iframeRef.current) {
          iframeRef.current.style.height = event.data.iframe_height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!paytrToken) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <iframe
        ref={iframeRef}
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
        frameBorder="0"
        scrolling="no"
        style={{
          width: '100%',
          height: '600px', // Fallback height
          border: 'none',
        }}
      />
    </div>
  );
}
