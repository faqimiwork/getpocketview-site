import { innerPage, shot, faqBlock } from '../layout.mjs';
import { SITE } from '../site.mjs';

const slug = 'test-website-on-mobile-without-a-phone';
const date = '2026-11-12';
const faq = [
  ['Can I test a website on mobile without a phone for free?', '<p>Yes. Chrome DevTools device mode is built in and free, and PocketView is a free extension that shows several phones side by side. Both run on any computer.</p>'],
  ['Is testing in a desktop browser accurate enough?', '<p>For layout, breakpoints and content, yes, as long as the tool uses each phone’s real viewport and user agent. Engine-specific bugs (Safari on iPhone) and real performance still need a real device before launch.</p>'],
];

export default {
  slug,
  date,
  readMins: 6,
  type: 'article',
  title: 'How to Test a Website on Mobile Without a Phone',
  h1: 'How to test a website on mobile without a phone',
  description: 'Four free ways to test a website on mobile from your computer, what each one catches, and the checks that still need a real phone before launch.',
  crumbs: [['Blog', '/blog'], ['Test on mobile without a phone', `/blog/${slug}`]],
  faq,
  schema: [{
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: 'How to test a website on mobile without a phone', datePublished: date, dateModified: date,
    author: { '@type': 'Organization', name: 'PocketView', url: SITE.url },
    publisher: { '@type': 'Organization', name: 'PocketView', logo: { '@type': 'ImageObject', url: SITE.url + '/assets/icons/pocketview-icon-512.png' } },
    image: SITE.url + '/assets/img/og.png', mainEntityOfPage: `${SITE.url}/blog/${slug}`,
  }],
  html: innerPage({
    slug: `blog-${slug}`,
    crumbs: [['Blog', '/blog'], ['Test on mobile without a phone', `/blog/${slug}`]],
    h1: 'How to test a website on mobile without a phone',
    lead: 'You can catch most mobile layout bugs from your laptop. Here are four free ways to do it, what each one is good at, and what still needs a real phone.',
    body: `
<p class="meta">Published 12 November 2026 · 6 min read</p>
<p>The short answer: open your site in a tool that sets a phone’s <strong>viewport</strong>, <strong>pixel ratio</strong> and <strong>user agent</strong>, then scroll the whole page at a few common sizes. A <a href="/mobile-simulator">mobile simulator</a> does that in one click. Below are the four options, from built-in to specialist.</p>

<h2>1. Chrome DevTools device mode</h2>
<p>Every copy of Chrome has a device mode. Press <kbd>F12</kbd>, then <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> (<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> on Mac), pick a phone from the Dimensions menu and reload.</p>
<ul>
  <li><strong>Good at:</strong> fixing one CSS rule at a time, with the inspector right beside the page; network and CPU throttling.</li>
  <li><strong>Misses:</strong> anything that only shows when you compare sizes, because you see one device at a time. The device list also lags behind new phones.</li>
</ul>
<p>Full steps are in our guide to <a href="/mobile-view-chrome">mobile view in Chrome</a>.</p>

<h2>2. A mobile simulator extension</h2>
<p>A simulator extension shows the page inside real device frames, often several at once. PocketView puts two phones side by side for free, keeps their scrolling in sync and sends each device’s own user agent, so sites that detect phones on the server send their mobile version.</p>
${shot('hero', 'Testing a website on an iPhone and a Galaxy phone side by side without a real phone')}
<ul>
  <li><strong>Good at:</strong> comparing sizes, checking the newest phones and foldables, recording a demo or bug report.</li>
  <li><strong>Misses:</strong> engine differences. On Chrome, an iPhone frame shows the iPhone layout, not Safari’s rendering.</li>
</ul>

<h2>3. Resize your browser window</h2>
<p>Drag the edge of the window until the page switches to its mobile layout. Free and instant, and a fine way to find where a breakpoint kicks in. But a narrow desktop window is not a phone: no touch, no mobile user agent, no high pixel ratio, and scrollbars take space a phone would not have. Use it to find breakpoints, not to sign off a design.</p>

<h2>4. Cloud device services</h2>
<p>Services that stream real phones from a data centre show the real browser engine, which makes them the closest you get to a phone without owning one. They are usually paid after a trial, slower to use, and need a tunnel to reach <code>localhost</code>. Keep them for the bugs a simulator cannot show.</p>

<h2>Which sizes to test</h2>
<p>You do not need every phone. These four widths cover most people:</p>
<div class="table-wrap"><table>
<thead><tr><th>Width</th><th>Why</th></tr></thead>
<tbody>
<tr><td>360 px</td><td>Small Android phones, the narrowest common width</td></tr>
<tr><td>390 to 402 px</td><td>Most current iPhones</td></tr>
<tr><td>430 to 440 px</td><td>Large phones (Pro Max, Plus, big Android phones)</td></tr>
<tr><td>768 to 834 px</td><td>Tablets in portrait and open foldables</td></tr>
</tbody></table></div>
<p>Exact numbers for every model are in the <a href="/viewport-sizes">viewport sizes</a> table.</p>

<h2>A 5-minute test routine</h2>
<ol class="steps">
  <li><strong>Small and large phone side by side.</strong><span> Scroll the whole page. Look for sideways scrolling, overlapping text and buttons that are too small to tap.</span></li>
  <li><strong>Open every menu and form.</strong><span> Mobile menus and long forms break most often.</span></li>
  <li><strong>Rotate to landscape.</strong><span> Sticky headers and cookie bars can cover half the screen.</span></li>
  <li><strong>Switch to a tablet.</strong><span> The in-between widths are where grids squeeze.</span></li>
  <li><strong>Check dark mode</strong><span> if your site supports it.</span></li>
</ol>
<p>For a longer list, use the <a href="/responsive-checker">responsive checker</a> checklist.</p>

<h2>What still needs a real phone</h2>
<ul>
  <li>Safari-only rendering bugs on iPhone (all iPhone browsers use Safari’s engine)</li>
  <li>The on-screen keyboard pushing content around in forms</li>
  <li>Real speed on a mid-range phone and a slow connection</li>
  <li>Native pickers for dates and selects, and video autoplay rules</li>
</ul>
<p>Borrow one iPhone and one Android phone for an hour before launch, and do everything else from your laptop.</p>

<h2>Questions</h2>
${faqBlock(faq)}
`,
  }),
};
