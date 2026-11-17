import { innerPage } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'terms';

export default {
  slug,
  title: 'Terms of Service | PocketView',
  description: 'The terms for using the free PocketView extension and for buying PocketView Pro: billing, renewals, cancellation, acceptable use and liability.',
  priority: 0.2,
  updated: '2026-11-18',
  crumbs: [['Terms', '/' + slug]],
  html: innerPage({
    slug,
    crumbs: [['Terms', '/' + slug]],
    h1: 'Terms of service',
    lead: 'Plain terms for a simple product. Last updated 18 November 2026.',
    body: `
<h2>Who we are</h2>
<p>PocketView and PocketView Pro are sold by ${SITE.seller} (“we”). You can reach us at <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>

<h2>The free extension</h2>
<p>You may use the free PocketView extension for personal and commercial work at no cost. It is provided as it is, and features may change between versions.</p>

<h2>PocketView Pro</h2>
<ul>
  <li><strong>Billing:</strong> Pro is a subscription billed in US dollars, monthly or yearly, through Stripe. Applicable taxes are shown at checkout.</li>
  <li><strong>Renewal:</strong> your plan renews automatically at the end of each period until you cancel.</li>
  <li><strong>Cancelling:</strong> cancel any time from <a href="/account">your account</a>. Pro stays active until the end of the period you paid for and is not renewed.</li>
  <li><strong>Refunds:</strong> see the <a href="/refund">refund policy</a>.</li>
  <li><strong>Price changes:</strong> if the price changes, we tell you by email at least 30 days before your next renewal. You can cancel before it applies.</li>
  <li><strong>Seats:</strong> one Pro plan is for one person, who may use it on up to 5 computers.</li>
</ul>

<h2>Acceptable use</h2>
<p>Do not use PocketView to break the law, to get around another site’s access controls, or to resell or share a Pro licence. We may end a plan that is used this way.</p>

<h2>Your content</h2>
<p>Websites, screenshots, recordings and mockups you make with PocketView are yours. They are created on your computer and we never receive them.</p>

<h2>Liability</h2>
<p>PocketView is a testing and presentation tool. A simulator cannot match every real device exactly, so always check important releases on real hardware. To the extent the law allows, our total liability is limited to the amount you paid us in the 12 months before a claim.</p>

<h2>Changes</h2>
<p>We may update these terms. Material changes are announced on the <a href="/changelog">changelog</a> and, for Pro customers, by email.</p>
`,
  }),
};
