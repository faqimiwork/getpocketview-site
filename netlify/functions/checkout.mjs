// POST /api/checkout { plan: 'monthly' | 'yearly', email? } -> { url } of a Stripe Checkout page.
import { json, preflight, body, stripe, LOOKUP, siteOrigin, normEmail, validEmail } from '../lib/pro.mjs';

export default async (req) => {
  const pre = preflight(req); if (pre) return pre;
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  const { plan = 'yearly', email, source = 'web' } = await body(req);
  const site = siteOrigin(req);
  const lookup = LOOKUP[plan];
  if (!lookup) return json({ error: 'Unknown plan' }, 400);
  try {
    const prices = await stripe('GET', 'prices', { lookup_keys: [lookup], active: true, limit: 1 });
    const price = prices.data[0];
    if (!price) return json({ error: 'Plan not available yet' }, 503);
    const e = normEmail(email);
    const session = await stripe('POST', 'checkout/sessions', {
      mode: 'subscription',
      line_items: [{ price: price.id, quantity: 1 }],
      success_url: `${site}/pro/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/pro?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_email: validEmail(e) ? e : undefined,
      client_reference_id: String(source).slice(0, 40),
      subscription_data: { metadata: { app: 'pocketview', plan } },
      metadata: { app: 'pocketview', plan, source: String(source).slice(0, 40) },
    });
    return json({ url: session.url });
  } catch (err) {
    console.error('checkout', err);
    return json({ error: 'Could not start checkout. Please try again.' }, 500);
  }
};

export const config = { path: '/api/checkout' };
