/**
 * AYI proxy — transparent passthrough to Google Generative Language API
 * with the API key injected server-side so it never reaches the client bundle.
 *
 * The @google/genai SDK is configured on the client with:
 *   new GoogleGenAI({ apiKey: 'proxied', httpOptions: { baseUrl: '/api/ayi' } })
 *
 * The SDK then calls e.g. `/api/ayi/v1beta/models/gemini-...:generateContent`,
 * which Cloudflare Pages catches via the `[[path]]` catch-all and this handler
 * forwards upstream with the real key attached.
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   GEMINI_API_KEY — your Gemini API key
 *   AYI_RATE_LIMIT_PER_MIN — optional, defaults to 20
 */

interface Env {
  GEMINI_API_KEY: string;
  AYI_RATE_LIMIT_PER_MIN?: string;
}

const UPSTREAM = 'https://generativelanguage.googleapis.com';

// Simple in-memory rate limit (per-instance; CF scales, so this is advisory
// — the real safety comes from your billing cap and Google key restrictions).
const hits = new Map<string, number[]>();
function rateLimited(ip: string, limit: number): boolean {
  const now = Date.now();
  const window = 60_000;
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < window);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > limit;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  if (!env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'AYI is not configured on this deployment.' }),
      { status: 503, headers: { 'content-type': 'application/json' } }
    );
  }

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type, x-goog-api-key, x-goog-api-client',
        'access-control-max-age': '86400',
      },
    });
  }

  // Rate limit
  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const limit = parseInt(env.AYI_RATE_LIMIT_PER_MIN ?? '20', 10);
  if (rateLimited(ip, limit)) {
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again in a minute.' }),
      { status: 429, headers: { 'content-type': 'application/json' } }
    );
  }

  // Build upstream URL from the captured catch-all path segments
  const pathParts = Array.isArray(params.path) ? params.path : [params.path];
  const path = pathParts.filter(Boolean).join('/');
  const incomingUrl = new URL(request.url);
  const upstreamUrl = new URL(`${UPSTREAM}/${path}${incomingUrl.search}`);

  // Forward request, replacing the API key
  const upstreamHeaders = new Headers(request.headers);
  upstreamHeaders.set('x-goog-api-key', env.GEMINI_API_KEY);
  upstreamHeaders.delete('host');
  upstreamHeaders.delete('cf-connecting-ip');
  upstreamHeaders.delete('cf-ipcountry');
  upstreamHeaders.delete('cf-ray');
  upstreamHeaders.delete('cf-visitor');
  upstreamHeaders.delete('x-forwarded-for');
  upstreamHeaders.delete('x-forwarded-proto');
  upstreamHeaders.delete('x-real-ip');

  const upstreamResponse = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers: upstreamHeaders,
    body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
    // @ts-expect-error — CF Workers fetch accepts duplex for streaming bodies
    duplex: 'half',
  });

  // Pass through response, preserving streaming
  const responseHeaders = new Headers(upstreamResponse.headers);
  responseHeaders.set('access-control-allow-origin', '*');
  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
};
