// GET /api/license (Authorization: Bearer <token>) -> current plan for this install.
// DELETE /api/license -> signs this install out.
import { json, preflight, bearer, body, tokenCustomer, customerRecord, revokeToken, issueToken, publicPlan } from '../lib/pro.mjs';

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  const token = bearer(req);
  if (req.method === 'DELETE' || (req.method === 'POST' && new URL(req.url).searchParams.get('signout'))) {
    await revokeToken(token).catch(() => {});
    return json({ ok: true });
  }
  const customerId = await tokenCustomer(token);
  if (!customerId) return json({ pro: false, status: 'signed_out' }, 401);
  // POST ?issue=1: a signed-in page asks for a separate licence for the extension in this browser.
  if (req.method === 'POST' && new URL(req.url).searchParams.get('issue')) {
    const rec = await customerRecord(customerId);
    const fresh = await issueToken(customerId, (await body(req)).label || 'extension');
    return json({ token: fresh, ...publicPlan(rec) });
  }
  try {
    const fresh = new URL(req.url).searchParams.get('fresh') === '1';
    return json(publicPlan(await customerRecord(customerId, { fresh })));
  } catch (err) {
    console.error('license', err);
    return json({ error: 'Could not check the plan right now' }, 503);
  }
};

export const config = { path: '/api/license', method: ['GET', 'POST', 'DELETE', 'OPTIONS'] };
