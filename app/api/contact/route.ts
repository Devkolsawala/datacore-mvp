import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Reuse transporter across warm Vercel invocations (avoids new TCP connection every request)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('GMAIL_USER or GMAIL_APP_PASSWORD is not set in environment variables.');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    // Explicit timeouts prevent Vercel functions from hanging
    connectionTimeout: 5000,
    greetingTimeout: 3000,
    socketTimeout: 8000,
  });

  return transporter;
}

export async function POST(req: Request) {
  // 1. Parse body
  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, phone, message } = body;

  // 2. Basic validation
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Name, email and phone are required' }, { status: 422 });
  }

  // 3. Send emails
  try {
    const mailer = getTransporter();
    const ownerEmail = process.env.GMAIL_USER!;

    // Send both emails IN PARALLEL — cuts the 3-4s delay to ~1-2s
    await Promise.all([

      // ── Email 1: Notification to you ──────────────────────────────────────
      mailer.sendMail({
        from: `"DataCore Contact" <${ownerEmail}>`,
        to: ownerEmail,
        replyTo: email,
        subject: `New Project Inquiry from ${name}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;background:#09090b;color:#e4e4e7;border-radius:12px;overflow:hidden;border:1px solid #27272a">
            <div style="background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:28px 32px">
              <h2 style="margin:0;font-size:18px;font-weight:700;color:#fff">📬 New Lead Received</h2>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8">DataCore Contact Form</p>
            </div>
            <div style="padding:28px 32px">
              <table style="width:100%;border-collapse:collapse">
                <tr>
                  <td style="padding:10px 0;width:80px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#71717a;vertical-align:top">Name</td>
                  <td style="padding:10px 0;font-size:14px;color:#e4e4e7">${name}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#71717a;vertical-align:top">Email</td>
                  <td style="padding:10px 0;font-size:14px;color:#60a5fa"><a href="mailto:${email}" style="color:#60a5fa;text-decoration:none">${email}</a></td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#71717a;vertical-align:top">Phone</td>
                  <td style="padding:10px 0;font-size:14px;color:#e4e4e7">${phone}</td>
                </tr>
                <tr style="border-top:1px solid #27272a">
                  <td style="padding:10px 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#71717a;vertical-align:top">Message</td>
                  <td style="padding:10px 0;font-size:14px;color:#a1a1aa">${message || '—'}</td>
                </tr>
              </table>
            </div>
            <div style="padding:16px 32px;background:#0a0a0a;border-top:1px solid #27272a">
              <p style="margin:0;font-size:12px;color:#52525b">
                Received · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>
          </div>
        `,
      }),

      // ── Email 2: Auto-reply confirmation to the sender ─────────────────────
      mailer.sendMail({
        from: `"DataCore" <${ownerEmail}>`,
        to: email,
        subject: `We got your message, ${name.split(' ')[0]}! — DataCore`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;background:#09090b;color:#e4e4e7;border-radius:12px;overflow:hidden;border:1px solid #27272a">
            <div style="background:linear-gradient(135deg,#1e3a5f,#0f172a);padding:28px 32px">
              <h2 style="margin:0;font-size:18px;font-weight:700;color:#fff">✅ Message Received!</h2>
              <p style="margin:6px 0 0;font-size:13px;color:#94a3b8">DataCore Solutions</p>
            </div>
            <div style="padding:28px 32px">
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#a1a1aa">
                Hi <strong style="color:#fff">${name.split(' ')[0]}</strong>, thanks for reaching out to
                <strong style="color:#fff">DataCore</strong>. We've received your inquiry and will get
                back to you within <strong style="color:#60a5fa">24 hours</strong>.
              </p>
              <div style="background:#18181b;border-radius:8px;border:1px solid #27272a;padding:16px 20px;margin-bottom:20px">
                <p style="margin:0 0 10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#52525b">Your Submission</p>
                <p style="margin:4px 0;font-size:13px;color:#d4d4d8"><span style="color:#71717a">Name: </span>${name}</p>
                <p style="margin:4px 0;font-size:13px;color:#d4d4d8"><span style="color:#71717a">Email: </span>${email}</p>
                <p style="margin:4px 0;font-size:13px;color:#d4d4d8"><span style="color:#71717a">Phone: </span>${phone}</p>
                ${message ? `<p style="margin:4px 0;font-size:13px;color:#d4d4d8"><span style="color:#71717a">Message: </span>${message}</p>` : ''}
              </div>
              <p style="margin:0;font-size:13px;color:#52525b">
                Questions? Reply to this email or reach us at
                <a href="mailto:dev.kolsawala45@gmail.com" style="color:#60a5fa;text-decoration:none">dev.kolsawala45@gmail.com</a>
              </p>
            </div>
            <div style="padding:16px 32px;background:#0a0a0a;border-top:1px solid #27272a">
              <p style="margin:0;font-size:11px;color:#3f3f46">© ${new Date().getFullYear()} DataCore Solutions. Surat, Gujarat, India.</p>
            </div>
          </div>
        `,
      }),

    ]);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    // Full error visible in: Vercel Dashboard → Project → Functions → Logs
    console.error('[contact/POST] Mail error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}