// PocketView device library.
// Sizes are CSS viewport pixels (portrait). They match the values most browsers report,
// but real devices can differ slightly by OS version and display zoom settings.

const UA = {
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
  ipados: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
  android: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36',
  androidTablet: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36',
  desktop: null
};

// notch: island | notch | home | punch | none
// os: ios | ipados | android | androidTablet | desktop
// fold (optional): unfolded inner screen { w, h, radius }. w/h above is the folded cover screen.
// colors (optional): official finishes, offered as a per-device color switch.
function d(id, name, group, w, h, dpr, os, notch, radius, fold, colors) {
  return { id, name, group, w, h, dpr, os, ua: UA[os], notch, radius, fold: fold || null, colors: colors || null };
}

export const DEVICES = [
  // Free-size viewport with drag handles and a breakpoint ruler
  d('responsive', 'Responsive', 'Responsive', 390, 844, 2, 'desktop', 'none', 0),

  // Foldables (cover screen by default, use the Fold button to open)
  // iPhone Duo sizes follow WebKit's Safari 27.1 figures. Android foldable sizes are
  // estimated from panel resolution at the maker's usual pixel ratio.
  // fold.style: duo = iPhone Duo (side control column on the cover, wide inner screen),
  // wide = passport-style book fold (landscape inner screen), tall = classic tall fold.
  // coverBezel / coverCorner (optional): bezel width and hinge-side corner radius of the folded cover.
  // openBezel / openCorner (optional): bezel width and outer corner radius when unfolded.
  // notch (optional): camera cutout of the unfolded screen when it differs from the cover.
  d('iphone-duo', 'iPhone Duo', 'Foldable', 466, 678, 3, 'ios', 'island', 48, { w: 951, h: 669, radius: 30, style: 'duo', coverBezel: 9, coverCorner: 8 }, ['starwhite', 'nightsky']),
  d('galaxy-z-fold8', 'Galaxy Z Fold8', 'Foldable', 475, 751, 2.625, 'android', 'punch', 7, { w: 933, h: 704, radius: 4, style: 'wide', coverBezel: 8, coverCorner: 12, openBezel: 9, openCorner: 10 }, ['lavender', 'cream', 'graphite', 'pistachio']),
  d('galaxy-z-fold8-ultra', 'Galaxy Z Fold8 Ultra', 'Foldable', 412, 960, 2.625, 'android', 'punch', 34, { w: 954, h: 860, radius: 8, style: 'wide', coverBezel: 9, coverCorner: 14, openBezel: 9, openCorner: 14 }, ['violetshadow', 'cream', 'graphite', 'violetgreen']),
  d('xiaomi-18-fold', 'Xiaomi 18 Fold', 'Foldable', 425, 623, 2.75, 'android', 'punch', 40, { w: 860, h: 608, radius: 28, style: 'wide', coverBezel: 7, coverCorner: 5 }, ['rose', 'cream', 'graphite', 'red']),
  // Flip8: w/h is the 4.1" FlexWindow cover (948 x 1048 px), the main screen is the unfolded size. Starts open.
  d('galaxy-z-flip8', 'Galaxy Z Flip8', 'Foldable', 361, 399, 2.625, 'android', 'none', 26, { w: 412, h: 960, radius: 28, style: 'flip', defaultOpen: true, notch: 'punch', coverBezel: 8, coverCorner: 34, openBezel: 9, openCorner: 37 }, ['pink', 'cream', 'graphite', 'mint']),

  // Apple iPhone
  d('iphone-17-pro-max', 'iPhone 17 Pro Max', 'iPhone', 440, 956, 3, 'ios', 'island', 62),
  d('iphone-17-pro', 'iPhone 17 Pro', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-air', 'iPhone Air', 'iPhone', 420, 912, 3, 'ios', 'island', 60),
  d('iphone-17', 'iPhone 17', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-16-pro-max', 'iPhone 16 Pro Max', 'iPhone', 440, 956, 3, 'ios', 'island', 62),
  d('iphone-16-pro', 'iPhone 16 Pro', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-16', 'iPhone 16 / 15', 'iPhone', 393, 852, 3, 'ios', 'island', 55),
  d('iphone-15-pro-max', 'iPhone 15 Pro Max / 16 Plus', 'iPhone', 430, 932, 3, 'ios', 'island', 58),
  d('iphone-16e', 'iPhone 16e / 14 / 13', 'iPhone', 390, 844, 3, 'ios', 'notch', 50),
  d('iphone-13-mini', 'iPhone 13 mini', 'iPhone', 375, 812, 3, 'ios', 'notch', 46),
  d('iphone-se', 'iPhone SE', 'iPhone', 375, 667, 2, 'ios', 'home', 0),

  // Android phones
  d('galaxy-s25-ultra', 'Galaxy S25 Ultra', 'Android', 412, 891, 3.5, 'android', 'punch', 36),
  d('galaxy-s24', 'Galaxy S24 / S25', 'Android', 360, 780, 3, 'android', 'punch', 40),
  d('galaxy-s20-ultra', 'Galaxy S20 Ultra', 'Android', 412, 915, 3.5, 'android', 'punch', 36),
  d('galaxy-a51', 'Galaxy A51 / A71', 'Android', 412, 914, 2.6, 'android', 'punch', 34),
  d('galaxy-z-fold', 'Galaxy Z Fold5 (folded)', 'Android', 344, 882, 3, 'android', 'punch', 28),
  d('pixel-7', 'Pixel 7 / 8', 'Android', 412, 915, 2.6, 'android', 'punch', 42),
  d('android-large', 'Android Large', 'Android', 412, 915, 2.6, 'android', 'punch', 36),
  d('android-standard', 'Android Standard', 'Android', 393, 873, 2.75, 'android', 'punch', 36),
  d('android-compact', 'Android Compact', 'Android', 360, 800, 2, 'android', 'punch', 32),

  // Tablets
  d('ipad-mini', 'iPad mini', 'Tablet', 744, 1133, 2, 'ipados', 'none', 22),
  d('ipad-air', 'iPad Air 11" / iPad', 'Tablet', 820, 1180, 2, 'ipados', 'none', 20),
  d('ipad-pro-11', 'iPad Pro 11"', 'Tablet', 834, 1194, 2, 'ipados', 'none', 20),
  d('ipad-pro-13', 'iPad Pro 12.9"', 'Tablet', 1024, 1366, 2, 'ipados', 'none', 20),
  d('android-tablet', 'Android Tablet', 'Tablet', 800, 1280, 2, 'androidTablet', 'none', 18),
  d('surface-pro', 'Surface Pro 7', 'Tablet', 912, 1368, 2, 'desktop', 'none', 8),

  // Desktop
  d('laptop-1280', 'Laptop 1280', 'Desktop', 1280, 800, 1, 'desktop', 'none', 0),
  d('laptop-1366', 'Laptop 1366', 'Desktop', 1366, 768, 1, 'desktop', 'none', 0),
  d('macbook-air', 'MacBook Air 13"', 'Desktop', 1470, 956, 2, 'desktop', 'none', 0),
  d('desktop-1920', 'Desktop Full HD', 'Desktop', 1920, 1080, 1, 'desktop', 'none', 0)
];

// Quick sets are pairs, matching the free plan's 2 devices at a time.
export const PRESETS = [
  { name: 'iPhone + Android', ids: ['iphone-17-pro', 'galaxy-s24'] },
  { name: 'Phone + Tablet', ids: ['iphone-16', 'ipad-air'] },
  { name: 'Foldables', ids: ['iphone-duo', 'galaxy-z-fold8'] },
  { name: 'Small vs Large', ids: ['iphone-se', 'iphone-17-pro-max'] },
  { name: 'Mobile + Desktop', ids: ['iphone-16', 'laptop-1280'] },
  { name: 'Responsive', ids: ['responsive'] }
];

export function customDevice(c) {
  const os = c.os || 'android';
  return {
    id: c.id,
    name: c.name,
    group: 'Custom',
    w: c.w,
    h: c.h,
    dpr: c.dpr || 2,
    os,
    ua: UA[os],
    notch: c.w >= 700 ? 'none' : (os === 'ios' ? 'island' : 'punch'),
    radius: c.w >= 1000 ? 0 : 36,
    custom: true
  };
}
