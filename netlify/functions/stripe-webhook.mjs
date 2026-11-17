// POST /api/stripe-webhook: keeps the cached plan of each customer in step with Stripe.
import { verifyStripeSignature, syncCustomer } from '../lib/pro.mjs';

const HANDLED = new Set([
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
]);

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const raw = await req.text();
  if (!verifyStripeSignature(raw, req.headers.get('stripe-signature'), process.env.STRIPE_WEBHOOK_SECRET)) {
    return new Response('Bad signature', { status: 400 });
  }
  let event;
  try { event = JSON.parse(raw); } catch { return new Response('Bad payload', { status: 400 }); }
  if (!HANDLED.has(event.type)) return new Response('Ignored', { status: 200 });
  const obj = event.data?.object || {};
  const customerId = typeof obj.customer === 'string' ? obj.customer : obj.customer?.id;
  if (!customerId) return new Response('No customer', { status: 200 });
  try {
    await syncCustomer(customerId);
    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('webhook', event.type, err);
    return new Response('Retry later', { status: 500 });
  }
};

export const config = { path: '/api/stripe-webhook' };
