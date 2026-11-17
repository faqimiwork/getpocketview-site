// POST /api/login/verify { email, code, label? } -> licence token for this install.
import { json, preflight, body, store, normEmail, codeHash, issueToken, customerRecord, publicPlan } from '../lib/pro.mjs';

const MAX_TRIES = 5;

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const b = await body(req);
  const email = normEmail(b.email);
  const code = String(b.code || '').replace(/\D/g, '');
  const s = store();
  const key = `code/${email}`;
  const entry = await s.get(key, { type: 'json' });
  const bad = (msg = 'That code is not right. Check the email and try again.') => json({ error: msg }, 400);
  if (!entry || !entry.h || Date.now() > entry.exp) return bad('This code has expired. Ask for a new one.');
  if (entry.tries >= MAX_TRIES) return bad('Too many tries. Ask for a new code.');
  if (codeHash(email, code) !== entry.h) {
    entry.tries += 1;
    await s.setJSON(key, entry);
    return bad();
  }
  await s.delete(key);
  try {
    const rec = await customerRecord(entry.customerId, { fresh: true });
    const token = await issueToken(entry.customerId, b.label || 'email');
    return json({ token, ...publicPlan(rec) });
  } catch (err) {
    console.error('login-verify', err);
    return json({ error: 'Could not sign you in right now. Please try again.' }, 500);
  }
};

export const config = { path: '/api/login/verify' };
