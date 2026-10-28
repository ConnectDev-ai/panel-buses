import React from 'react';

/* figma node 190:246 — "Container spacer" (Size: 4). Breakpoint-width bands
   used on the Grids page. */
const WIDTHS = { 'sm - 640px': 640, 'md - 768px': 768, 'lg - 1024px': 1024, 'xl - 1280px': 1280 };
const fmt = (n) => n.toLocaleString('en-US');

export function ContainerSpacer({ size = 'sm - 640px', style, className }) {
  const w = WIDTHS[size] ?? 640;
  return (
    <div className={className} style={{ width: w, height: 20, background: 'var(--doc-spacer-fill)', position: 'relative', ...style }}>
      <span style={{ position: 'absolute', left: 4, top: 2, fontFamily: 'var(--font-ui)', fontSize: 12, lineHeight: '18px', whiteSpace: 'nowrap', color: 'var(--doc-spacer-text)' }}>{fmt(w)}px</span>
    </div>
  );
}
export default ContainerSpacer;
