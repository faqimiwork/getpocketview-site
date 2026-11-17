// Shared helpers for PocketView Pro: Stripe REST calls, licence store, responses.
// Stripe is the source of truth for subscriptions; Netlify Blobs keeps a cache of each
// customer's plan plus the licence tokens handed to installed extensions.
import { getStore } from '@netlify/blobs';
import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const SITE_URL = 'https://getpocketview.com';
// Return links go back to the site that started the flow, so deploy previews can be tested end to end.
export function siteOrigin(req) {
  try {
    const o = new URL(req.url).origin;
    if (o === SITE_URL || /^https:\/\/[a-z0-9-]+--getpocketview\.netlify\.app$/.test(o)) return o;
  } catch {}
  return SITE_URL;
}
export const LOOKUP = { monthly: 'pocketview_pro_monthly', yearly: 'pocketview_pro_yearly' };
const PRO_STATUSES = new Set(['active', 'trialing', 'past_due']);
const MAX_TOKENS = 5; // installs per customer; the oldest is signed out when a new one signs in
const STALE_MS = 12 * 60 * 60 * 1000;

// Live and sandbox data are kept apart, so a test subscription never unlocks Pro in live mode.
export const isLive = () => /^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY || '');
export const store = () => getStore({ name: isLive() ? 'pocketview-pro-live' : 'pocketview-pro-test', consistency: 'strong' });

// ---------- responses ----------
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};
export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS } });
export const preflight = (req) => (req.method === 'OPTIONS' ? new Response(null, { status: 204, headers: CORS }) : null);
export async function body(req) {
  try { return await req.json(); } catch { return {}; }
}
export const bearer = (req) => (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
export const normEmail = (e) => String(e || '').trim().toLowerCase();
export const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;

// ---------- Stripe ----------
function form(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) v.forEach((x, i) => (typeof x === 'object' ? form(x, `${key}[${i}]`, out) : out.push([`${key}[${i}]`, String(x)])));
    else if (typeof v === 'object') form(v, key, out);
    else out.push([key, String(v)]);
  }
  return out;
}
export async function stripe(method, path, params) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
  let url = `https://api.stripe.com/v1/${path}`;
  const init = { method, headers: { Authorization: `Bearer ${key}` } };
  if (params) {
    const qs = new URLSearchParams(form(params)).toString();
    if (method === 'GET') url += (url.includes('?') ? '&' : '?') + qs;
    else { init.body = qs; init.headers['Content-Type'] = 'application/x-www-form-urlencoded'; }
  }
  const res = await fetch(url, init);
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data?.error?.message || `Stripe ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// Webhook signature check (same scheme as stripe.webhooks.constructEvent).
export function verifyStripeSignature(raw, header, secret, toleranceSec = 300) {
  if (!header || !secret) return false;
  const parts = Object.fromEntries(header.split(',').map((p) => p.split('=')).filter((p) => p.length === 2).map(([k, v]) => [k, v]));
  const sigs = header.split(',').filter((p) => p.startsWith('v1=')).map((p) => p.slice(3));
  const t = Number(parts.t);
  if (!t || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - t) > toleranceSec) return false;
  const expected = createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex');
  const a = Buffer.from(expected);
  return sigs.some((s) => { const b = Buffer.from(s); return b.length === a.length && timingSafeEqual(a, b); });
}

const isPocketView = (sub) => (sub.items?.data || []).some((it) => String(it.price?.lookup_key || '').startsWith('pocketview_pro'));
const planOf = (sub) => {
  const item = (sub.items?.data || []).find((it) => String(it.price?.lookup_key || '').startsWith('pocketview_pro'));
  return item?.price?.recurring?.interval === 'year' ? 'yearly' : 'monthly';
};
const periodEndOf = (sub) => sub.current_period_end || sub.items?.data?.[0]?.current_period_end || null;

// Reads the customer's PocketView subscriptions from Stripe and caches the result.
export async function syncCustomer(customerId) {
  const [customer, subs] = await Promise.all([
    stripe('GET', `customers/${customerId}`),
    stripe('GET', 'subscriptions', { customer: customerId, status: 'all', limit: 20, expand: ['data.items.data.price'] }),
  ]);
  const mine = subs.data.filter(isPocketView).sort((a, b) => (PRO_STATUSES.has(b.status) - PRO_STATUSES.has(a.status)) || b.created - a.created);
  const sub = mine[0] || null;
  const rec = {
    customerId,
    email: normEmail(customer.email),
    subscriptionId: sub?.id || null,
    status: sub?.status || 'none',
    plan: sub ? planOf(sub) : null,
    periodEnd: sub ? periodEndOf(sub) : null,
    cancelAtPeriodEnd: !!sub?.cancel_at_period_end,
    pro: !!sub && PRO_STATUSES.has(sub.status) && !customer.deleted,
    syncedAt: Date.now(),
  };
  const s = store();
  const old = await s.get(`cust/${customerId}`, { type: 'json' });
  if (old?.email && old.email !== rec.email) await s.delete(`email/${old.email}`);
  rec.tokens = old?.tokens || [];
  await s.setJSON(`cust/${customerId}`, rec);
  if (rec.email) await s.set(`email/${rec.email}`, customerId);
  return rec;
}

export async function customerRecord(customerId, { fresh = false } = {}) {
  const rec = await store().get(`cust/${customerId}`, { type: 'json' });
  if (!rec || fresh || Date.now() - (rec.syncedAt || 0) > STALE_MS) {
    try { return await syncCustomer(customerId); } catch (e) {
      // The customer no longer exists in Stripe (deleted, or from the other mode): no plan.
      if (e.status === 404) return { ...(rec || {}), customerId, subscriptionId: null, pro: false, status: 'none', plan: null, periodEnd: null };
      if (rec) return rec; // Stripe unreachable: use the cached plan for now
      throw e;
    }
  }
  return rec;
}

// Finds the Stripe customer that pays for PocketView with this email address.
export async function customerByEmail(email) {
  const s = store();
  const cached = await s.get(`email/${email}`);
  if (cached) {
    const rec = await customerRecord(cached);
    if (rec.email === email) return rec;
  }
  const found = await stripe('GET', 'customers', { email, limit: 10 });
  let best = null;
  for (const c of found.data) {
    const rec = await syncCustomer(c.id);
    if (rec.pro) return rec;
    if (rec.subscriptionId && !best) best = rec;
  }
  return best;
}

// ---------- licence tokens ----------
const hashToken = (t) => createHash('sha256').update(t).digest('hex');
export async function issueToken(customerId, label = '') {
  const token = 'pvl_' + randomBytes(24).toString('base64url');
  const h = hashToken(token);
  const s = store();
  const rec = (await s.get(`cust/${customerId}`, { type: 'json' })) || (await syncCustomer(customerId));
  const tokens = [...(rec.tokens || []), { h, at: Date.now(), label: String(label).slice(0, 60) }];
  while (tokens.length > MAX_TOKENS) {
    const old = tokens.shift();
    await s.delete(`lic/${old.h}`);
  }
  rec.tokens = tokens;
  await s.setJSON(`cust/${customerId}`, rec);
  await s.setJSON(`lic/${h}`, { customerId, at: Date.now() });
  return token;
}
export async function tokenCustomer(token) {
  if (!/^pvl_[A-Za-z0-9_-]{20,64}$/.test(token || '')) return null;
  const lic = await store().get(`lic/${hashToken(token)}`, { type: 'json' });
  return lic?.customerId || null;
}
export async function revokeToken(token) {
  const h = hashToken(token);
  const s = store();
  const lic = await s.get(`lic/${h}`, { type: 'json' });
  if (!lic) return;
  await s.delete(`lic/${h}`);
  const rec = await s.get(`cust/${lic.customerId}`, { type: 'json' });
  if (rec) { rec.tokens = (rec.tokens || []).filter((t) => t.h !== h); await s.setJSON(`cust/${lic.customerId}`, rec); }
}

export const publicPlan = (rec) => ({
  pro: !!rec?.pro,
  status: rec?.status || 'none',
  plan: rec?.plan || null,
  periodEnd: rec?.periodEnd || null,
  cancelAtPeriodEnd: !!rec?.cancelAtPeriodEnd,
  email: rec?.email || null,
});

// ---------- sign-in codes ----------
export const codeHash = (email, code) => createHash('sha256').update(`${email}:${code}:${process.env.STRIPE_WEBHOOK_SECRET || ''}`).digest('hex');
export const newCode = () => String(100000 + (randomBytes(4).readUInt32BE(0) % 900000));

export async function sendEmail({ to, subject, html, text }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.EMAIL_FROM || 'PocketView <hello@getpocketview.com>', to: [to], subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

let portalConfig = null;
export async function portalConfigId() {
  if (portalConfig) return portalConfig;
  const list = await stripe('GET', 'billing_portal/configurations', { active: true, limit: 50 });
  portalConfig = list.data.find((c) => c.metadata?.app === 'pocketview')?.id || null;
  return portalConfig;
}
