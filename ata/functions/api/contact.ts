/**
 * Contact form backend — accepts POST with { name, email, message, topic? }
 * and either (a) forwards via Resend if RESEND_API_KEY is set, or
 * (b) logs + stores in CONTACT_KV if bound.
 *
 * Env vars:
 *   RESEND_API_KEY — optional, your Resend key
 *   CONTACT_TO — where to deliver (e.g. "wxzata@proton.me")
 *   CONTACT_FROM — verified sender (e.g. "WXZA <no-reply@wxza.net>")
 *
 * KV bindings (optional fallback if Resend not configured):
 *   CONTACT_KV — a KV namespace to archive submissions
 */

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  CONTACT_KV?: KVNamespace;
}

interface Payload {
  name?: string;
  email?: string;
  message?: string;
  topic?: string;
  company?: string;
  // Honeypot — bots fill this, humans don't (it's hidden in the form)
  _gotcha?: string;
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
  });
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  });

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  // Honeypot trap
  if (body._gotcha) return json(200, { ok: true });

  const name = (body.name ?? '').trim().slice(0, 200);
  const email = (body.email ?? '').trim().slice(0, 320);
  const message = (body.message ?? '').trim().slice(0, 5000);
  const topic = (body.topic ?? 'general').trim().slice(0, 50);
  const company = (body.company ?? '').trim().slice(0, 200);

  if (!name || !email || !message) {
    return json(400, { error: 'name, email, and message are required' });
  }
  if (!isEmail(email)) {
    return json(400, { error: 'That email address looks off.' });
  }
  if (message.length < 10) {
    return json(400, { error: 'Tell us a little more (at least 10 chars).' });
  }

  const submittedAt = new Date().toISOString();
  const record = { name, email, message, topic, company, submittedAt };

  // Archive in KV if available (keyed by ISO timestamp + random suffix)
  if (env.CONTACT_KV) {
    const key = `contact:${submittedAt}:${crypto.randomUUID().slice(0, 8)}`;
    try {
      await env.CONTACT_KV.put(key, JSON.stringify(record));
    } catch (e) {
      console.error('KV archive failed', e);
    }
  }

  // Send via Resend if configured
  if (env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM) {
    const subject = `[WXZA ${topic}] ${name}${company ? ` — ${company}` : ''}`;
    const plainText = [
      `From: ${name} <${email}>`,
      company ? `Company: ${company}` : null,
      `Topic: ${topic}`,
      `When: ${submittedAt}`,
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM,
        to: [env.CONTACT_TO],
        reply_to: email,
        subject,
        text: plainText,
      }),
    });

    if (!resend.ok) {
      const errText = await resend.text();
      console.error('Resend failed', resend.status, errText);
      return json(502, { error: 'Message received but delivery failed. Please email wxzata@proton.me.' });
    }

    return json(200, { ok: true, delivered: true });
  }

  // Graceful degradation: if neither Resend nor KV is configured, log and accept
  console.log('Contact submission (unrouted)', record);
  return json(200, { ok: true, delivered: false });
};
