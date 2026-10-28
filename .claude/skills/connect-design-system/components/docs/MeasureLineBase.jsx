import React from 'react';

/* figma node 190:1466 — "_Measure line base" (Type: Solid | Spacer).
   The red dimension rule: solid = end-caps + arrowed rule, spacer = dashed. */
export function MeasureLineBase({ type = 'solid', length = 80, vertical = false, style, className }) {
  const stroke = 'var(--doc-measure)';
  const rule = {
    position: 'absolute', background: 'none',
    borderTop: type === 'spacer' ? `1px dashed ${stroke}` : `1px solid ${stroke}`,
  };
  return (
    <div className={className} style={{
      width: vertical ? 16 : length, height: vertical ? length : 16,
      position: 'relative', color: stroke,
      transform: vertical ? 'none' : 'none', ...style,
    }}>
      <div style={vertical
        ? { ...rule, top: 0, left: 8, width: length, transform: 'rotate(90deg)', transformOrigin: '0 0' }
        : { ...rule, top: 8, left: 0, width: length }} />
      {['start', 'end'].map((cap) => (
        <div key={cap} style={{
          position: 'absolute',
          [vertical ? 'top' : 'left']: cap === 'start' ? 0 : length - 1,
          [vertical ? 'left' : 'top']: 0,
          width: vertical ? 16 : 1, height: vertical ? 1 : 16,
          background: stroke,
        }} />
      ))}
    </div>
  );
}
export default MeasureLineBase;
