import { innerPage } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'refund';

export default {
  slug,
  title: 'Refund Policy | PocketView',
  description: 'PocketView Pro comes with a 14 day refund on your first payment. How to ask for a refund, what happens to renewals and how cancelling works.',
  priority: 0.2,
  updated: '2026-11-18',
  crumbs: [['Refunds', '/' + slug]],
  html: innerPage({
    slug,
    crumbs: [['Refunds', '/' + slug]],
    h1: 'Refund policy',
    lead: 'If Pro is not right for you, you get your money back. Last updated 18 November 2026.',
    body: `
<h2>First payment: 14 days</h2>
<p>Email <a href="mailto:${SITE.email}">${SITE.email}</a> within 14 days of your first Pro payment, from the address you paid with, and we refund it in full. No questions needed.</p>

<h2>Renewals</h2>
<p>Renewals are not refunded automatically. If you forgot to cancel a yearly plan, email us within 7 days of the renewal and we will refund it.</p>

<h2>Cancelling</h2>
<p>You can cancel any time from <a href="/account">your account</a>. Pro stays on until the end of the period you paid for and you are not charged again.</p>

<h2>How refunds are paid</h2>
<p>Refunds go back to the card or wallet you paid with through Stripe. Most banks show them within 5 to 10 business days.</p>
`,
  }),
};
