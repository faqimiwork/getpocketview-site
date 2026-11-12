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
  d('iphone-18-pro-max', 'iPhone 18 Pro Max', 'iPhone', 440, 956, 3, 'ios', 'island', 62),
  d('iphone-18-pro', 'iPhone 18 Pro', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-17-pro-max', 'iPhone 17 Pro Max', 'iPhone', 440, 956, 3, 'ios', 'island', 62),
  d('iphone-17-pro', 'iPhone 17 Pro', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-air', 'iPhone Air', 'iPhone', 420, 912, 3, 'ios', 'island', 60),
  d('iphone-17', 'iPhone 17', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-16-pro-max', 'iPhone 16 Pro Max', 'iPhone', 440, 956, 3, 'ios', 'island', 62),
  d('iphone-16-pro', 'iPhone 16 Pro', 'iPhone', 402, 874, 3, 'ios', 'island', 58),
  d('iphone-16-plus', 'iPhone 16 Plus', 'iPhone', 430, 932, 3, 'ios', 'island', 58),
  d('iphone-16', 'iPhone 16', 'iPhone', 393, 852, 3, 'ios', 'island', 55),
  d('iphone-16e', 'iPhone 16e', 'iPhone', 390, 844, 3, 'ios', 'notch', 50),
  d('iphone-15-pro-max', 'iPhone 15 Pro Max', 'iPhone', 430, 932, 3, 'ios', 'island', 58),
  d('iphone-15-pro', 'iPhone 15 Pro', 'iPhone', 393, 852, 3, 'ios', 'island', 55),
  d('iphone-15-plus', 'iPhone 15 Plus', 'iPhone', 430, 932, 3, 'ios', 'island', 58),
  d('iphone-15', 'iPhone 15', 'iPhone', 393, 852, 3, 'ios', 'island', 55),
  d('iphone-14-pro-max', 'iPhone 14 Pro Max', 'iPhone', 430, 932, 3, 'ios', 'island', 58),
  d('iphone-14-pro', 'iPhone 14 Pro', 'iPhone', 393, 852, 3, 'ios', 'island', 55),
  d('iphone-14-plus', 'iPhone 14 Plus', 'iPhone', 428, 926, 3, 'ios', 'notch', 53),
  d('iphone-14', 'iPhone 14', 'iPhone', 390, 844, 3, 'ios', 'notch', 47),
  d('iphone-13-pro-max', 'iPhone 13 Pro Max', 'iPhone', 428, 926, 3, 'ios', 'notch', 53),
  d('iphone-13-pro', 'iPhone 13 Pro', 'iPhone', 390, 844, 3, 'ios', 'notch', 47),
  d('iphone-13', 'iPhone 13', 'iPhone', 390, 844, 3, 'ios', 'notch', 47),
  d('iphone-13-mini', 'iPhone 13 mini', 'iPhone', 375, 812, 3, 'ios', 'notch', 46),
  d('iphone-12-pro-max', 'iPhone 12 Pro Max', 'iPhone', 428, 926, 3, 'ios', 'notch', 53),
  d('iphone-12-pro', 'iPhone 12 Pro', 'iPhone', 390, 844, 3, 'ios', 'notch', 47),
  d('iphone-12', 'iPhone 12', 'iPhone', 390, 844, 3, 'ios', 'notch', 47),
  d('iphone-12-mini', 'iPhone 12 mini', 'iPhone', 375, 812, 3, 'ios', 'notch', 44),
  d('iphone-11-pro-max', 'iPhone 11 Pro Max', 'iPhone', 414, 896, 3, 'ios', 'notch', 40),
  d('iphone-11-pro', 'iPhone 11 Pro', 'iPhone', 375, 812, 3, 'ios', 'notch', 40),
  d('iphone-11', 'iPhone 11', 'iPhone', 414, 896, 2, 'ios', 'notch', 41),
  d('iphone-xr', 'iPhone XR', 'iPhone', 414, 896, 2, 'ios', 'notch', 41),
  d('iphone-x', 'iPhone X / XS', 'iPhone', 375, 812, 3, 'ios', 'notch', 40),
  d('iphone-se', 'iPhone SE (2nd and 3rd gen)', 'iPhone', 375, 667, 2, 'ios', 'home', 0),
  d('iphone-8-plus', 'iPhone 8 Plus', 'iPhone', 414, 736, 3, 'ios', 'home', 0),
  d('iphone-se-1', 'iPhone SE (1st gen) / iPhone 5', 'iPhone', 320, 568, 2, 'ios', 'home', 0),

  // Android phones
  // 2025 and 2026 models below use the CSS viewport and panel resolution published in public spec tables.
  d('galaxy-s26-ultra', 'Galaxy S26 Ultra', 'Android', 412, 891, 4, 'android', 'punch', 36),
  d('galaxy-s25-ultra', 'Galaxy S25 Ultra', 'Android', 412, 891, 3.5, 'android', 'punch', 36),
  d('galaxy-s24', 'Galaxy S24 / S25', 'Android', 360, 780, 3, 'android', 'punch', 40),
  d('galaxy-s24-ultra', 'Galaxy S24 Ultra', 'Android', 384, 832, 3.75, 'android', 'punch', 34),
  d('galaxy-a17', 'Galaxy A17', 'Android', 412, 892, 2.625, 'android', 'punch', 36),
  d('pixel-11-pro-xl', 'Pixel 11 Pro XL', 'Android', 448, 997, 3, 'android', 'punch', 44),
  d('pixel-11-pro', 'Pixel 11 Pro', 'Android', 410, 914, 3.125, 'android', 'punch', 44),
  d('pixel-10-pro', 'Pixel 10 Pro', 'Android', 410, 912, 3.125, 'android', 'punch', 44),
  d('pixel-10', 'Pixel 10', 'Android', 412, 924, 2.625, 'android', 'punch', 44),
  d('pixel-10-pro-fold', 'Pixel 10 Pro Fold (folded)', 'Android', 412, 901, 2.625, 'android', 'punch', 36),
  d('xiaomi-17-ultra', 'Xiaomi 17 Ultra', 'Android', 400, 869, 3, 'android', 'punch', 40),
  d('xiaomi-17t-pro', 'Xiaomi 17T Pro', 'Android', 427, 924, 3, 'android', 'punch', 40),
  d('xiaomi-17t', 'Xiaomi 17T', 'Android', 423, 919, 3, 'android', 'punch', 40),
  d('xiaomi-17', 'Xiaomi 17', 'Android', 406, 885, 3, 'android', 'punch', 40),
  d('redmi-note-17', 'Redmi Note 17', 'Android', 393, 871, 2.75, 'android', 'punch', 38),
  d('moto-razr-70-ultra', 'Motorola Razr 70 Ultra (open)', 'Android', 412, 1008, 3, 'android', 'punch', 30),
  d('moto-g87', 'Motorola Moto G87', 'Android', 424, 924, 3, 'android', 'punch', 36),
  d('infinix-hot-70', 'Infinix Hot 70', 'Android', 360, 788, 2, 'android', 'punch', 32),
  d('pixel-7', 'Pixel 7 / 8', 'Android', 412, 915, 2.6, 'android', 'punch', 42),
  d('galaxy-s22-ultra', 'Galaxy S22 Ultra', 'Android', 360, 772, 4, 'android', 'punch', 30),
  d('galaxy-s22', 'Galaxy S22 / S22+', 'Android', 360, 780, 3, 'android', 'punch', 38),
  d('pixel-6-pro', 'Pixel 6 Pro', 'Android', 360, 780, 4, 'android', 'punch', 40),
  d('oneplus-nord-2', 'OnePlus Nord 2', 'Android', 412, 915, 2.625, 'android', 'punch', 36),
  d('oppo-find-x3-pro', 'OPPO Find X3 Pro', 'Android', 360, 804, 4, 'android', 'punch', 40),
  d('galaxy-s21-ultra', 'Galaxy S21 Ultra', 'Android', 360, 800, 4, 'android', 'punch', 32),
  d('galaxy-s21', 'Galaxy S21', 'Android', 360, 800, 3, 'android', 'punch', 38),
  d('galaxy-z-flip3', 'Galaxy Z Flip3 (open)', 'Android', 360, 880, 3, 'android', 'punch', 30),
  d('xiaomi-12', 'Xiaomi 12', 'Android', 360, 800, 3, 'android', 'punch', 40),
  d('xiaomi-mi-11i', 'Xiaomi Mi 11i', 'Android', 360, 800, 3, 'android', 'punch', 36),
  d('pixel-5', 'Pixel 5', 'Android', 393, 851, 2.75, 'android', 'punch', 38),
  d('galaxy-note20-ultra', 'Galaxy Note20 Ultra', 'Android', 412, 883, 3.5, 'android', 'punch', 22),
  d('galaxy-s20-ultra', 'Galaxy S20 Ultra', 'Android', 412, 915, 3.5, 'android', 'punch', 36),
  d('galaxy-s20', 'Galaxy S20', 'Android', 360, 800, 4, 'android', 'punch', 36),
  d('huawei-p30-pro', 'Huawei P30 Pro', 'Android', 360, 780, 3, 'android', 'punch', 34),
  d('galaxy-a51', 'Galaxy A51 / A71', 'Android', 412, 914, 2.6, 'android', 'punch', 34),
  d('galaxy-a12', 'Galaxy A12', 'Android', 360, 800, 2, 'android', 'punch', 30),
  d('galaxy-z-fold', 'Galaxy Z Fold5 (folded)', 'Android', 344, 882, 3, 'android', 'punch', 28),
  d('galaxy-z-fold2-open', 'Galaxy Z Fold2 (unfolded)', 'Android', 884, 1104, 2, 'android', 'punch', 18),
  d('galaxy-fold-open', 'Galaxy Fold (unfolded)', 'Android', 768, 1076, 2, 'android', 'punch', 18),
  d('zebra-tc78', 'Zebra TC78 (rugged)', 'Android', 412, 818, 2.625, 'android', 'none', 22),
  d('zebra-mc330', 'Zebra MC330 (rugged)', 'Android', 480, 800, 1, 'android', 'none', 10),
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
