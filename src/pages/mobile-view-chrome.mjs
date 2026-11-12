import { innerPage, shot, faqBlock } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'mobile-view-chrome';
const faq = [
  ['How do I switch Chrome back to desktop view?', '<p>In DevTools, click the device toolbar icon again or press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> on Mac). In PocketView, click the extension icon again or the close button in its top bar and the tab goes back to the normal page.</p>'],
  ['Why does my site look different on my real phone?', '<p>Usually one of four things: the phone’s browser engine (Safari on iPhone renders some CSS differently), a different font being available, the on-screen keyboard or browser bars taking space, or the phone using a display zoom setting that changes the viewport. Check the viewport meta tag first: without <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>, phones show a zoomed-out desktop page.</p>'],
  ['Can I see mobile view on Chrome for Android or iPhone?', '<p>Chrome on a phone already shows the mobile version. To see the desktop version there, open the menu and tick Desktop site. Untick it to go back.</p>'],
];

export default {
  slug,
  title: 'How to Get Mobile View in Chrome (3 Ways)',
  description: 'Three ways to see a website in mobile view on Chrome: DevTools device mode, a mobile view extension, and side-by-side devices with PocketView.',
  priority: 0.8,
  type: 'article',
  crumbs: [['Mobile view in Chrome', '/' + slug]],
  faq,
  schema: [{
    '@context': 'https://schema.org', '@type': 'HowTo',
    name: 'How to see mobile view in Chrome',
    step: [
      { '@type': 'HowToStep', name: 'Open DevTools', text: 'Press F12, or Ctrl+Shift+I on Windows and Cmd+Option+I on Mac.' },
      { '@type': 'HowToStep', name: 'Turn on the device toolbar', text: 'Press Ctrl+Shift+M (Cmd+Shift+M on Mac) or click the phone and tablet icon.' },
      { '@type': 'HowToStep', name: 'Choose a device', text: 'Pick a phone from the Dimensions menu, then reload the page so the mobile user agent applies.' },
    ],
  }],
  html: innerPage({
    slug,
    crumbs: [['Mobile view in Chrome', '/' + slug]],
    h1: 'How to see mobile view in Chrome',
    lead: 'There are three ways to see a website as it looks on a phone, all inside desktop Chrome. Here is each one step by step, and when to use which.',
    body: `
<h2>Way 1: Chrome DevTools device mode</h2>
<p>Built into Chrome, free, and good for quick checks of one device.</p>
<ol class="steps">
  <li><strong>Open DevTools.</strong><span> Press <kbd>F12</kbd>, or <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> on Windows and <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> on Mac.</span></li>
  <li><strong>Turn on the device toolbar.</strong><span> Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> on Mac), or click the phone and tablet icon at the top left of DevTools.</span></li>
  <li><strong>Choose a device.</strong><span> Pick one from the Dimensions menu at the top of the page, or type a width and height.</span></li>
  <li><strong>Reload the page.</strong><span> Some sites only send their mobile version after a reload with the mobile user agent.</span></li>
</ol>
<p><strong>Good:</strong> no install, network throttling, CSS inspection right next to the page. <strong>Limits:</strong> one device at a time, no device frame, the DevTools panel takes half your screen, and the device list is short on new phones and foldables.</p>

<h2>Way 2: a mobile view extension</h2>
<p>A mobile view extension opens the page at phone size with one click, without opening DevTools. Most show a single phone and change the window or frame size. Check that the one you choose also sets the mobile user agent; otherwise sites that detect phones on the server will still send the desktop version.</p>

<h2>Way 3: side by side devices with PocketView</h2>
<p>PocketView is a mobile view extension that shows several devices at once, each with a real frame, its own user agent and touch scrolling.</p>
<ol class="steps">
  <li><strong>Add PocketView to Chrome</strong><span> and pin it to the toolbar.</span></li>
  <li><strong>Click the icon on any page</strong><span> or press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>. The page opens on two phones.</span></li>
  <li><strong>Change devices</strong><span> from the Devices menu: iPhone, Galaxy, Pixel, foldables, iPad or laptops.</span></li>
  <li><strong>Scroll one device</strong><span> and the other follows. Press <kbd>R</kbd> to rotate, <kbd>S</kbd> for a screenshot.</span></li>
</ol>
${shot('iphone', 'Mobile view in Chrome with PocketView showing an iPhone 17 Pro Max and an iPhone SE')}

<h2>Which way to use when</h2>
<div class="table-wrap"><table>
<thead><tr><th>You want to</th><th>Use</th></tr></thead>
<tbody>
<tr><td>Inspect and fix one CSS rule at a phone width</td><td>DevTools device mode</td></tr>
<tr><td>Test network speed or CPU throttling</td><td>DevTools device mode</td></tr>
<tr><td>See your site on phone, tablet and laptop together</td><td>PocketView</td></tr>
<tr><td>Check new phones and foldables</td><td>PocketView</td></tr>
<tr><td>Record a demo or make a mockup for a client</td><td>PocketView</td></tr>
<tr><td>Find a bug that only happens in Safari</td><td>A real iPhone</td></tr>
</tbody></table></div>

<h2>Mobile view on Chrome for Android</h2>
<p>On a phone, Chrome shows the mobile version by default. To check the desktop version from your phone, tap the three-dot menu and tick <strong>Desktop site</strong>. Tap it again to return to mobile view. On iPhone, Chrome has the same option under the menu as <strong>Request Desktop Site</strong>.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Related: <a href="/responsive-checker">how to check a site on every screen size</a> and the <a href="/viewport-sizes">phone viewport sizes</a> table.</p>
`,
  }),
};
