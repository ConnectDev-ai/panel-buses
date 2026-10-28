import React from 'react';

/* figma node 92:966 — "Isotype" (Dark mode: 2). The orbital mark on its own.
   Renders the exact SVG exported from the .fig; set window.__CONNECT_ASSETS
   to point at this design system's assets/logos folder from your page. */
const assetBase = () => (typeof window !== 'undefined' && window.__CONNECT_ASSETS) || '/assets/logos';

const SRC = {
  false: 'isotype-light-fullcolor.svg',
  true: 'isotype-dark-fullcolor.svg',
  negative: 'isotype-dark-negative.svg',
  positive: 'isotype-light-positive.svg',
};

export function Isotype({ darkMode = false, variant, size = 40, style, className }) {
  const key = variant || String(!!darkMode);
  return (
    <img
      className={className}
      src={`${assetBase()}/${SRC[key] || SRC.false}`}
      alt="Connect"
      style={{ height: size, width: 'auto', display: 'block', ...style }}
    />
  );
}
export default Isotype;
