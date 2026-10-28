import React from 'react';

/* figma node 190:77 — "_Spacing". One row of the spacing table:
   step · rem · px, on a fixed 360px measure. */
export function SpacingRow({ step = '1', rem = '0.25rem', px = '4px', style, className }) {
  const cell = { fontFamily: 'var(--font-ui)', fontSize: 16, lineHeight: '24px', color: 'var(--text-title)', whiteSpace: 'nowrap', position: 'absolute', top: 0 };
  return (
    <div className={className} style={{ width: 360, height: 24, position: 'relative', ...style }}>
      <span style={{ ...cell, left: 0 }}>{step}</span>
      <span style={{ ...cell, left: 96 }}>{rem}</span>
      <span style={{ ...cell, left: 255 }}>{px}</span>
    </div>
  );
}
export default SpacingRow;
