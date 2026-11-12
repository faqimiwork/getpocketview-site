import { innerPage, shot, faqBlock } from '../layout.mjs';

const slug = 'responsive-viewer';
const faq = [
  ['What breakpoints should I test?', '<p>Test the widths your CSS framework switches at, plus the most common real devices. With Tailwind that is 640, 768, 1024, 1280 and 1536 px. Add 360 and 390 px for small and average phones, and 820 px for an iPad in portrait.</p>'],
  ['Can I save a set of devices?', '<p>Yes. PocketView remembers your last devices, and Copy setup link saves the devices, orientation and mode in a link you can bookmark or send to a teammate.</p>'],
  ['Does it work with Tailwind, Bootstrap and other frameworks?', '<p>Yes. PocketView does not touch your CSS. It sets a real viewport width, so every media query and container query fires as it would on the device.</p>'],
  ['How many screens can I view at once?', '<p>Two side by side in the free version, from any mix of phones, tablets, foldables and laptops. Pro, coming later, will allow more at once.</p>'],
];

export default {
  slug,
  title: 'Responsive Viewer: See Every Breakpoint at Once',
  description: 'View your site at phone, tablet and desktop sizes together. Drag to any width, read the breakpoint ruler and scroll every view in sync.',
  priority: 0.9,
  crumbs: [['Responsive viewer', '/' + slug]],
  faq,
  html: innerPage({
    slug,
    crumbs: [['Responsive viewer', '/' + slug]],
    h1: 'Every breakpoint, one screen',
    lead: 'PocketView is a responsive viewer for Chrome: put a phone next to a tablet or a laptop, drag any view to the exact width you need, and scroll them all together.',
    heroShot: shot('responsive', 'Responsive viewer with a resizable view at 820 pixels and an iPhone 17 Pro', { eager: true, cls: 'hero-shot' }),
    body: `
<h2>See phone, tablet and desktop together</h2>
<p>Responsive bugs hide in the gaps between screen sizes: a menu that wraps at 820 px, a card grid that squeezes at 390 px, a hero image that crops badly on a tablet. Looking at one size at a time means you miss them. With PocketView you pick two devices from 36 (any mix of phones, foldables, tablets and laptops) and see the same page on both at once.</p>
<p>Quick sets save clicks: <strong>iPhone + Android</strong>, <strong>Phone + Tablet</strong>, <strong>Small vs Large</strong>, <strong>Mobile + Desktop</strong> and <strong>Foldables</strong>.</p>

<h2>Drag to any width with the breakpoint ruler</h2>
<p>The <strong>Responsive</strong> device has drag handles on its sides and bottom. As you drag, a ruler along the top marks the common breakpoints, so you can see exactly where your layout switches:</p>
<div class="table-wrap"><table>
<thead><tr><th>Name</th><th class="num">Min width</th><th>Typical device</th></tr></thead>
<tbody>
<tr><td><code>sm</code></td><td class="num">640 px</td><td>Large phones in landscape</td></tr>
<tr><td><code>md</code></td><td class="num">768 px</td><td>Small tablets in portrait</td></tr>
<tr><td><code>lg</code></td><td class="num">1024 px</td><td>Tablets in landscape, small laptops</td></tr>
<tr><td><code>xl</code></td><td class="num">1280 px</td><td>Laptops</td></tr>
<tr><td><code>2xl</code></td><td class="num">1536 px</td><td>Large desktop screens</td></tr>
</tbody></table></div>
<p>Width chips (360, 390, 768, 1024, 1280, 1440) jump straight to the sizes people use most.</p>

<h2>Sync scroll and clicks</h2>
<p>Scroll one view and the others follow to the same point on the page. Click a link and every device navigates. That makes it easy to compare one section, such as a pricing table, across all your screens without hunting for it in each one.</p>
${shot('sync', 'Two phones scrolled to the same section with sync scroll', { caption: 'Sync scroll keeps every device on the same section.' })}

<h2>Common breakpoints and why they matter</h2>
<p>Breakpoints are not about devices; they are about where your content breaks. Still, real device widths cluster in a few places worth checking every time:</p>
<ul>
  <li><strong>360 px:</strong> many Android phones, the smallest width most sites need to support.</li>
  <li><strong>390 to 402 px:</strong> most current iPhones.</li>
  <li><strong>412 to 440 px:</strong> large Android phones and Pro Max iPhones.</li>
  <li><strong>744 to 834 px:</strong> iPads in portrait and open book-style foldables.</li>
  <li><strong>1280 to 1440 px:</strong> most laptops.</li>
</ul>
<p>Need the exact numbers? See the full <a href="/viewport-sizes">phone and tablet viewport sizes</a> table.</p>

<h2>Questions</h2>
${faqBlock(faq)}
<p>Want a quick pass on one site? Try the <a href="/responsive-checker">responsive checker</a> guide, or compare <a href="/alternatives">responsive viewer extensions</a>.</p>
`,
  }),
};
