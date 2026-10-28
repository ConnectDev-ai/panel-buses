import React from 'react';
import { MeasureLineBase } from './MeasureLineBase.jsx';

/* figma node 190:1475 — "Measure line" (Number position: Left | Right | Top | Bottom).
   A labelled red dimension annotation. */
export function MeasureLine({ numberPosition = 'left', length = 80, label, style, className }) {
  const text = label ?? `${length}px`;
  const vertical = numberPosition === 'top' || numberPosition === 'bottom';
  const cap = {
    fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 12, lineHeight: '18px',
    color: 'var(--doc-measure)', whiteSpace: 'nowrap', position: 'absolute',
  };
  const pos = {
    left: { right: 'calc(100% + 4px)', top: '50%', transform: 'translateY(-50%)', textAlign: 'right' },
    right: { left: 'calc(100% + 4px)', top: '50%', transform: 'translateY(-50%)' },
    top: { bottom: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 4px)', left: '50%', transform: 'translateX(-50%)' },
  }[numberPosition];
  return (
    <div className={className} style={{ position: 'relative', width: vertical ? 16 : length, height: vertical ? length : 16, ...style }}>
      <MeasureLineBase type="solid" length={length} vertical={vertical} />
      <span style={{ ...cap, ...pos }}>{text}</span>
    </div>
  );
}
export default MeasureLine;
