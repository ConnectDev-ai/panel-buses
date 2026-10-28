import React from 'react';

/* figma node 190:336 — "_Dot" (Size: sm | md | lg). */
const DOT = { sm: { box: 8, dot: 6 }, md: { box: 10, dot: 8 }, lg: { box: 12, dot: 10 } };

export function Dot({ size = 'md', color = 'rgb(34,197,94)', style, className }) {
  const s = DOT[size] || DOT.md;
  return (
    <div className={className} style={{ width: s.box, height: s.box, overflow: 'hidden', position: 'relative', ...style }}>
      <div style={{ position: 'absolute', left: 1, top: 1, width: s.dot, height: s.dot, borderRadius: '50%', background: color }} />
    </div>
  );
}
export default Dot;
