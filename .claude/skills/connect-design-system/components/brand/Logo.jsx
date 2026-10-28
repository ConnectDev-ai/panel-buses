import React from 'react';

/* figma node 92:960 — "Logo" (Dark Mode: 2), plus the Divemotor lockup and
   the AI sub-brand from the Logos page. Real SVG exports, not redrawings. */
const assetBase = () => (typeof window !== 'undefined' && window.__CONNECT_ASSETS) || '/assets/logos';

const SRC = {
  connect: { light: 'connect-light-fullcolor.svg', dark: 'connect-fullcolor-negative.svg' },
  divemotor: { light: 'divemotor-connect-light-fullcolor.svg', dark: 'divemotor-connect-light-fullcolor.svg' },
  ai: { light: 'connect-ai-light-fullcolor.svg', dark: 'connect-ai-light-fullcolor.svg' },
  wordmark: { light: 'connect-wordmark.svg', dark: 'connect-wordmark.svg' },
};

export function Logo({ darkMode = false, lockup = 'connect', size = 32, style, className }) {
  const set = SRC[lockup] || SRC.connect;
  return (
    <img
      className={className}
      src={`${assetBase()}/${darkMode ? set.dark : set.light}`}
      alt="Connect"
      style={{ height: size, width: 'auto', display: 'block', ...style }}
    />
  );
}
export default Logo;
