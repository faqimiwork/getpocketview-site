// POST /api/claim { session_id, label? } -> licence token for a finished Checkout session.
// The success page calls this once and hands the token to the extension.
import { json, preflight, body, stripe, store, syncCustomer, issueToken, publicPlan } from '../lib/pro.mjs';

const MAX_CLAIMS = 3;

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const { session_id: id, label } = await body(req);
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id || '')) return json({ error: 'Invalid session' }, 400);
  try {
    const session = await stripe('GET', `checkout/sessions/${id}`);
    if (session.metadata?.app !== 'pocketview' || session.mode !== 'subscription') return json({ error: 'Invalid session' }, 400);
    if (session.status !== 'complete' || !session.customer) return json({ error: 'Payment is not complete yet' }, 409);
    // Sessions expire from Stripe's list after 30 days; a claim link older than a day is not honoured.
    if (Date.now() / 1000 - session.created > 24 * 3600) return json({ error: 'This link has expired. Sign in with your email instead.' }, 410);
    const s = store();
    const key = `claim/${id}`;
    const n = Number((await s.get(key)) || 0);
    if (n >= MAX_CLAIMS) return json({ error: 'This link was already used. Sign in with your email instead.' }, 429);
    await s.set(key, String(n + 1));
    const rec = await syncCustomer(session.customer);
    const token = await issueToken(session.customer, label || 'checkout');
    return json({ token, ...publicPlan(rec) });
  } catch (err) {
    console.error('claim', err);
    return json({ error: 'Could not confirm the payment. Please refresh the page.' }, 500);
  }
};

export const config = { path: '/api/claim' };
