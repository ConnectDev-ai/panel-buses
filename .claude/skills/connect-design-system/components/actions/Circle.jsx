import React from 'react';

/* figma node 190:331 — "circle". The placeholder glyph shipped inside
   _Button base; a 24×24 box holding a 20px hairline ring in currentColor. */
export function Circle({ size = 24, style, className }) {
  return (
    <div className={className} style={{ width: size, height: size, overflow: 'hidden', position: 'relative', color: 'currentColor', ...style }}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: 'absolute', left: (size - 20) / 2, top: (size - 20) / 2 }}>
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
export default Circle;
