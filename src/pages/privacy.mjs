import { innerPage } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'privacy';

export default {
  slug,
  title: 'Privacy Policy | PocketView',
  description: 'The free PocketView extension collects no data. PocketView Pro stores only your email and plan. What we keep, who processes it and why we need each permission.',
  priority: 0.3,
  updated: '2026-11-18',
  crumbs: [['Privacy', '/' + slug]],
  html: innerPage({
    slug,
    crumbs: [['Privacy', '/' + slug]],
    h1: 'Privacy policy',
    lead: 'Short version: the free extension collects nothing. If you buy Pro, we keep your email and plan so Pro works on your computers. Last updated 18 November 2026.',
    body: `
<h2>Data we collect</h2>
<p>The free extension collects nothing. It does not collect, store on any server, sell or share personal data, browsing history, website content or usage analytics.</p>

<h2>PocketView Pro</h2>
<p>If you buy Pro, we keep only what is needed to run your plan:</p>
<ul>
  <li><strong>Your email address and plan</strong> (monthly or yearly, renewal date, status), to know you are a Pro customer and to send sign-in codes.</li>
  <li><strong>A licence key for each computer you sign in on</strong>, stored on that computer and checked against our server about once a day. We store only a scrambled (hashed) copy.</li>
</ul>
<p>Payments are processed by <a href="https://stripe.com/privacy" rel="noopener">Stripe</a>. Your card details go straight to Stripe and we never see them. Sign-in code emails are sent through <a href="https://resend.com/legal/privacy-policy" rel="noopener">Resend</a>. Plan data is stored with our host, Netlify. We do not sell or share this data, and we do not use it for advertising.</p>
<p>To delete your data, cancel your plan and email us. We remove your email and licence keys within 30 days, except records the law requires us to keep for tax.</p>

<h2>Data stored on your device</h2>
<p>PocketView saves your settings (selected devices, custom devices, orientation, zoom and view options) in Chrome’s local extension storage. This data stays in your browser and is removed when you uninstall the extension.</p>

<h2>Permissions and why we need them</h2>
<ul>
  <li><strong>Access to websites:</strong> to load the site you choose inside the device frames, set a mobile user agent for those frames and run the helper scripts for sync scroll and touch. Changes apply only inside the simulator tab and are removed when it closes.</li>
  <li><strong>Network request rules:</strong> to remove frame-blocking headers and set the user agent, only for frames inside the simulator tab.</li>
  <li><strong>Scripting:</strong> to add the frame helper scripts while a simulator tab is open.</li>
  <li><strong>Storage:</strong> to remember your settings, Studio projects and, for Pro, your licence key on your device.</li>
  <li><strong>Context menus:</strong> to add “Open link in PocketView” to the right-click menu.</li>
  <li><strong>Screen recording:</strong> recording asks you to share the current tab each time. Only the device area is kept, and the file is saved to your computer.</li>
</ul>

<h2>Screenshots and recordings</h2>
<p>Screenshots, videos and GIFs are created on your computer and saved to your Downloads folder. They are never uploaded.</p>

<h2>This website</h2>
<p>getpocketview.com uses no cookies and no advertising trackers. When you sign in, the account page keeps your licence key in your browser’s local storage until you sign out. If we add visitor statistics, we will use a cookie-free, privacy-friendly counter and list it here.</p>

<h2>Contact</h2>
<p>Questions about privacy: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
`,
  }),
};
