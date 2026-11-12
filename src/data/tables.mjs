import { DEVICES } from './devices.mjs';

const fmt = (n) => (Number.isInteger(n) ? String(n) : String(+n.toFixed(3)));
const px = (d) => `${Math.round(d.w * d.dpr)} × ${Math.round(d.h * d.dpr)}`;

export const ESTIMATED = new Set(['iphone-duo', 'galaxy-z-fold8', 'galaxy-z-fold8-ultra', 'xiaomi-18-fold', 'galaxy-z-flip8']);

// Simple device table for a group (iPhone, Android, Tablet, Desktop, Foldable).
export function deviceTable(group, { sortable = false } = {}) {
  const rows = DEVICES.filter((d) => d.group === group);
  const head = ['Device', 'CSS viewport', 'Pixel ratio', 'Screen pixels'];
  const th = head.map((h, i) => `<th${i ? ' class="num"' : ''}>${sortable ? `<button type="button">${h}</button>` : h}</th>`).join('');
  const tr = rows.map((d) => `<tr><td>${d.name}${ESTIMATED.has(d.id) ? ' *' : ''}</td><td class="num" data-v="${d.w}">${d.w} × ${d.h}</td><td class="num">${fmt(d.dpr)}</td><td class="num" data-v="${d.w * d.dpr}">${px(d)}</td></tr>`).join('');
  return `<div class="table-wrap"><table${sortable ? ' data-sort' : ''}><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

// Foldables: cover and inner screen.
export function foldTable() {
  const rows = DEVICES.filter((d) => d.group === 'Foldable');
  const tr = rows.map((d) => `<tr><td>${d.name} *</td><td class="num">${d.w} × ${d.h}</td><td class="num">${d.fold.w} × ${d.fold.h}</td><td class="num">${fmt(d.dpr)}</td></tr>`).join('');
  return `<div class="table-wrap"><table><thead><tr><th>Device</th><th class="num">Folded (cover)</th><th class="num">Unfolded (inner)</th><th class="num">Pixel ratio</th></tr></thead><tbody>${tr}</tbody></table></div>`;
}

export const ESTIMATE_NOTE = '<p class="meta">* Foldable sizes are estimates from each panel’s resolution and the maker’s usual pixel ratio (iPhone Duo follows WebKit’s published figures). Real values can differ slightly with display zoom and OS updates.</p>';

export { DEVICES };
