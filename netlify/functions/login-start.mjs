// POST /api/login/start { email } -> emails a 6 digit code if this email has a PocketView plan.
// Always answers the same way so the endpoint does not reveal who is a customer.
import { json, preflight, body, store, normEmail, validEmail, customerByEmail, newCode, codeHash, sendEmail } from '../lib/pro.mjs';

const WAIT_MS = 45 * 1000;

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const email = normEmail((await body(req)).email);
  if (!validEmail(email)) return json({ error: 'Enter a valid email address' }, 400);
  const s = store();
  const key = `code/${email}`;
  const prev = await s.get(key, { type: 'json' });
  if (prev && Date.now() - prev.sentAt < WAIT_MS) return json({ ok: true, wait: Math.ceil((WAIT_MS - (Date.now() - prev.sentAt)) / 1000) });
  try {
    const rec = await customerByEmail(email);
    if (rec?.subscriptionId) {
      const code = newCode();
      await s.setJSON(key, { h: codeHash(email, code), exp: Date.now() + 10 * 60 * 1000, tries: 0, sentAt: Date.now(), customerId: rec.customerId });
      await sendEmail({
        to: email,
        subject: `${code} is your PocketView sign-in code`,
        text: `Your PocketView sign-in code is ${code}\n\nIt expires in 10 minutes. If you did not ask for it, you can ignore this email.\n\nPocketView\nhttps://getpocketview.com`,
        html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:440px;margin:0 auto;padding:28px;color:#0d1016">
<p style="font-size:15px;margin:0 0 18px">Your PocketView sign-in code:</p>
<p style="font-size:34px;font-weight:800;letter-spacing:6px;margin:0 0 18px">${code}</p>
<p style="font-size:14px;color:#5b6372;margin:0 0 6px">It expires in 10 minutes.</p>
<p style="font-size:14px;color:#5b6372;margin:0">If you did not ask for it, you can ignore this email.</p>
<p style="font-size:13px;color:#9aa1ad;margin:28px 0 0">PocketView · <a href="https://getpocketview.com" style="color:#9aa1ad">getpocketview.com</a></p></div>`,
      });
    } else {
      await s.setJSON(key, { h: null, exp: 0, tries: 0, sentAt: Date.now() });
    }
    return json({ ok: true });
  } catch (err) {
    console.error('login-start', err);
    return json({ error: 'Could not send the code right now. Please try again.' }, 500);
  }
};

export const config = { path: '/api/login/start' };
