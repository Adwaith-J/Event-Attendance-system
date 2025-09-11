import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

export default function QRScanner(){
  const [message, setMessage] = useState('');
  const html5QrRef = useRef(null);
  const base = 'http://localhost:4000';

  useEffect(() => {
    const qrRegionId = 'html5qr-region';
    const qrcode = new Html5Qrcode(qrRegionId);
    html5QrRef.current = qrcode;
    const config = { fps: 10, qrbox: 250 };

    qrcode.start(
      { facingMode: { exact: 'environment' } }, // prefer rear camera on mobile
      config,
      async (decodedText, decodedResult) => {
        // Stop scanning temporarily to avoid double hits
        await qrcode.stop();
        setMessage('Scanned: ' + decodedText);

        try {
          const res = await axios.post(`${base}/api/scan`, { registrationId: decodedText });
          setMessage(`Success: ${res.data.attendance.timestamp}`);
        } catch (err) {
          const status = err?.response?.status;
          if (status === 409) setMessage('Already marked present');
          else if (status === 404) setMessage('Participant not found');
          else setMessage('Scan/Server error');
        }

        // restart scanning after short delay
        setTimeout(() => qrcode.start({ facingMode: { exact: 'environment' } }, config, (d) => {}, (e) => {}), 1500);
      },
      (errorMessage) => {
        // parse errors if you need them
      }
    ).catch(err => {
      console.error('scan start error', err);
      setMessage('Camera start error or permission denied');
    });

    return () => {
      qrcode.clear().catch(e => console.log('clear error', e));
    };
  }, []);

  return (
    <div>
      <div id="html5qr-region" style={{ width: 300, height: 300 }}></div>
      <div style={{ marginTop: 8 }}>{message}</div>
      <div style={{ fontSize: 12, color: '#666' }}>
        Tip: If camera doesn't start, allow camera permission or test on HTTPS.
      </div>
    </div>
  );
}
