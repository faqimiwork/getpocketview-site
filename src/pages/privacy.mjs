import { innerPage } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'privacy';

export default {
  slug,
  title: 'Privacy Policy | PocketView',
  description: 'PocketView collects no data: no accounts, no analytics, no servers. What the extension stores on your device, why it needs its permissions.',
  priority: 0.3,
  updated: '2026-11-12',
  crumbs: [['Privacy', '/' + slug]],
  html: innerPage({
    slug,
    crumbs: [['Privacy', '/' + slug]],
    h1: 'Privacy policy',
    lead: 'Short version: PocketView collects nothing. No accounts, no analytics, no servers. Last updated 12 November 2026.',
    body: `
<h2>Data we collect</h2>
<p>None. The extension does not collect, store on any server, sell or share personal data, browsing history, website content or usage analytics.</p>

<h2>Data stored on your device</h2>
<p>PocketView saves your settings (selected devices, custom devices, orientation, zoom and view options) in Chrome’s local extension storage. This data stays in your browser and is removed when you uninstall the extension.</p>

<h2>Permissions and why we need them</h2>
<ul>
  <li><strong>Access to websites:</strong> to load the site you choose inside the device frames, set a mobile user agent for those frames and run the helper scripts for sync scroll and touch. Changes apply only inside the simulator tab and are removed when it closes.</li>
  <li><strong>Network request rules:</strong> to remove frame-blocking headers and set the user agent, only for frames inside the simulator tab.</li>
  <li><strong>Scripting:</strong> to add the frame helper scripts while a simulator tab is open.</li>
  <li><strong>Storage:</strong> to remember your settings on your device.</li>
  <li><strong>Context menus:</strong> to add “Open link in PocketView” to the right-click menu.</li>
  <li><strong>Screen recording:</strong> recording asks you to share the current tab each time. Only the device area is kept, and the file is saved to your computer.</li>
</ul>

<h2>Screenshots and recordings</h2>
<p>Screenshots, videos and GIFs are created on your computer and saved to your Downloads folder. They are never uploaded.</p>

<h2>This website</h2>
<p>getpocketview.com uses no cookies and no advertising trackers. If we add visitor statistics, we will use a cookie-free, privacy-friendly counter and list it here.</p>

<h2>Contact</h2>
<p>Questions about privacy: <a href="mailto:${SITE.email}">${SITE.email}</a>.</p>
`,
  }),
};
