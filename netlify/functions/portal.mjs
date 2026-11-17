// POST /api/portal (Authorization: Bearer <token>) -> { url } of the Stripe customer portal.
import { json, preflight, bearer, tokenCustomer, stripe, portalConfigId, siteOrigin } from '../lib/pro.mjs';

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const customerId = await tokenCustomer(bearer(req));
  if (!customerId) return json({ error: 'Please sign in again' }, 401);
  try {
    const session = await stripe('POST', 'billing_portal/sessions', {
      customer: customerId,
      return_url: `${siteOrigin(req)}/account`,
      configuration: (await portalConfigId()) || undefined,
    });
    return json({ url: session.url });
  } catch (err) {
    console.error('portal', err);
    return json({ error: 'Could not open the billing page. Please try again.' }, 500);
  }
};

export const config = { path: '/api/portal' };
