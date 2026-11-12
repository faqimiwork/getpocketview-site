// Site-wide settings. Change STORE_URL once the Chrome Web Store listing is live.
export const SITE = {
  name: 'PocketView',
  url: 'https://getpocketview.com',
  tagline: 'See your site on every screen.',
  // TODO: replace with the real listing URL after the Chrome Web Store approves PocketView.
  storeUrl: 'https://chromewebstore.google.com/search/PocketView',
  storeIsLive: false,
  email: 'hello@getpocketview.com',
  themeColor: '#0d1016',
  ogImage: '/assets/img/og.png',
  year: 2026,
};

// Top navigation. Items with `children` render as a dropdown.
export const NAV = [
  { label: 'Simulator', href: '/mobile-simulator' },
  {
    label: 'Devices',
    children: [
      { label: 'iPhone simulator', href: '/iphone-simulator', note: 'iPhone 17 to SE' },
      { label: 'Android simulator', href: '/android-simulator', note: 'Galaxy and Pixel' },
      { label: 'Foldable simulator', href: '/foldable-simulator', note: 'Z Fold8, Z Flip8, iPhone Duo' },
    ],
  },
  { label: 'Mockups', href: '/mockup-generator' },
  {
    label: 'Guides',
    children: [
      { label: 'Responsive checker', href: '/responsive-checker', note: 'Check any site in 30 seconds' },
      { label: 'Mobile view in Chrome', href: '/mobile-view-chrome', note: '3 ways, step by step' },
      { label: 'Viewport sizes', href: '/viewport-sizes', note: 'Every phone and tablet, 2026' },
      { label: 'Mobile friendly test', href: '/mobile-friendly-test', note: 'Free checklist' },
    ],
  },
  { label: 'Blog', href: '/blog' },
];

export const FOOTER = [
  { title: 'Product', links: [['Mobile simulator', '/mobile-simulator'], ['Responsive viewer', '/responsive-viewer'], ['Mockup generator', '/mockup-generator'], ['Changelog', '/changelog']] },
  { title: 'Devices', links: [['iPhone simulator', '/iphone-simulator'], ['Android simulator', '/android-simulator'], ['Foldable simulator', '/foldable-simulator'], ['Viewport sizes', '/viewport-sizes']] },
  { title: 'Guides', links: [['Responsive checker', '/responsive-checker'], ['Mobile view in Chrome', '/mobile-view-chrome'], ['Mobile friendly test', '/mobile-friendly-test'], ['Blog', '/blog']] },
  { title: 'Company', links: [['Alternatives', '/alternatives'], ['Privacy', '/privacy'], ['Contact', 'mailto:hello@getpocketview.com']] },
];
