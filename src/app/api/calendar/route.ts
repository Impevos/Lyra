import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Yalnızca randevulu (tarihi ve saati olan) işlemler için takvim kaydı oluşturacağız
    if (!data.date || !data.time) {
      return NextResponse.json({ message: 'Tarih ve saat bilgisi eksik, takvim kaydı oluşturulmadı.' }, { status: 400 });
    }

    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Private key içerisindeki "\n" karakterlerinin doğru okunabilmesi için replace yapıyoruz
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'lyraonearth@gmail.com';

    if (!serviceAccountEmail || !privateKey) {
      console.error('Google Calendar credentials eksik.');
      return NextResponse.json({ message: 'Takvim entegrasyonu ayarlanmamış.' }, { status: 500 });
    }

    // Google API için JWT Client oluştur
    const client = new JWT({
      email: serviceAccountEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth: client as any });

    // Tarihi doğru formata çevirme (DD.MM.YYYY formatından YYYY-MM-DD'ye)
    // frontend'den data.date "25.10.2023" veya "25/10/2023" gibi gelebilir
    // TR locale ile gönderdiğimiz için DD.MM.YYYY olduğunu varsayıyoruz
    let year, month, day;
    if (data.date.includes('.')) {
      [day, month, year] = data.date.split('.');
    } else if (data.date.includes('/')) {
      [day, month, year] = data.date.split('/');
    } else {
      // Eğer farklı bir formatta geldiyse fallback
      [day, month, year] = data.date.split('.');
    }

    const [hour, minute] = data.time.split(':');
    
    // Etkinlik başlangıç zamanı (Türkiye saati)
    const startDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00+03:00`);
    
    // Varsayılan süre: 60 dakika
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    // Google Takvim Event objesi
    const event = {
      summary: `${data.productTitle} – ${data.name}`,
      description: `
E-posta: ${data.email}
Telefon: ${data.phone}
Instagram: ${data.instagram || 'Belirtilmemiş'}

Beklentisi:
${data.expectations || 'Belirtilmemiş'}

Kendisi Hakkında:
${data.aboutSelf || 'Belirtilmemiş'}
      `,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'Europe/Istanbul',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'Europe/Istanbul',
      },
      // Otomatik Google Meet linki oluşturması için (opsiyonel ancak faydalı)
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      conferenceDataVersion: 1, // Meet linkini aktif edebilmek için 1 olması şart
    });

    return NextResponse.json({ 
      success: true, 
      eventLink: response.data.htmlLink,
      meetLink: response.data.hangoutLink 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Google Calendar Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
