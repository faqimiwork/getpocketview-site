import { innerPage } from '../layout.mjs';

const slug = 'changelog';

// Newest first. Add an entry for every release and every new device.
const entries = [
  ['1.4.0', 'November 2026', [
    '59 new devices, 95 in total: iPhone 18 Pro and 18 Pro Max, every iPhone back to iPhone 5, and 44 Android phones',
    'New Android phones: Galaxy S26 Ultra, Pixel 11 Pro and 11 Pro XL, Pixel 10 series, Xiaomi 17 series, Redmi Note 17, Motorola Razr 70 Ultra and Moto G87, Galaxy A17, Infinix Hot 70',
    'Older and work devices for real-world testing: Galaxy S20 to S22, Note20 Ultra, OnePlus Nord 2, OPPO Find X3 Pro, Huawei P30 Pro, Zebra TC78 and MC330',
    'iPhone names split so each model has its own entry (iPhone 16, 16 Plus, 15, 15 Plus, 14 series and more)',
  ]],
  ['1.3.0', 'November 2026', [
    'New look: lime and ink theme, new icon with iPhone Duo and a phone',
    'Mockup Studio backgrounds: PocketView dark and Lime',
    'Free version shows 2 devices side by side',
    'Sites that try to break out of the frame now reload in a contained mode instead of taking over the tab',
  ]],
  ['1.2.0', 'November 2026', [
    'Foldables redrawn to match the real devices: iPhone Duo, Galaxy Z Fold8, Z Fold8 Ultra, Z Flip8, Xiaomi 18 Fold',
    'Official colours for every foldable',
    'App mode: preview your site as an installed PWA, standalone or fullscreen, with a launch splash',
    'New device picker with search, quick sets and an on-screen tray',
  ]],
  ['1.1.0', 'November 2026', [
    'Record MP4 and GIF with touch ripples',
    'Mockup Studio: backgrounds, headline, tilt, shadow and export sizes',
    'Ambient light behind each device, taken from the page colours',
    'Developer tools: dark mode, display-mode emulation, setup links',
  ]],
  ['1.0.0', 'November 2026', [
    'First version: 36 devices, sync scroll, real mobile user agents, screenshots',
  ]],
];

export default {
  slug,
  title: 'PocketView Changelog: New Devices and Features',
  description: 'Every PocketView release: new phones and foldables, new features and fixes. Updated with each version of the mobile simulator for Chrome.',
  priority: 0.5,
  crumbs: [['Changelog', '/' + slug]],
  html: innerPage({
    slug,
    crumbs: [['Changelog', '/' + slug]],
    h1: 'Changelog',
    lead: 'New devices land as phones launch. Here is everything that changed, newest first.',
    body: entries.map(([v, when, items]) => `
<h2>${v} <span class="meta" style="font-size:16px;font-weight:500;letter-spacing:0">${when}</span></h2>
<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join(''),
  }),
};
