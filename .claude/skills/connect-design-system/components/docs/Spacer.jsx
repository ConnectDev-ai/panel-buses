import React from 'react';

/* figma node 190:98 — "Spacer" (Direction: X-axis | Y-axis, Size: 17 steps).
   The measured spacing swatch: a tinted band labelled with its px value. */
export const SPACER_STEPS = {
  '01': 4, '02': 8, '03': 12, '04': 16, '05': 20, '06': 24, '08': 32, '10': 40,
  '12': 48, '16': 64, '20': 80, '24': 96, '32': 128, '40': 160, '48': 192, '56': 224, '64': 256,
};

export function Spacer({ size = '01', direction = 'x-axis', showLabel = true, style, className }) {
  const px = SPACER_STEPS[size] ?? SPACER_STEPS['01'];
  const x = direction === 'x-axis';
  return (
    <div className={className} style={{
      width: x ? px : 20, height: x ? 20 : px,
      background: 'var(--doc-spacer-fill)', position: 'relative', flexShrink: 0, ...style,
    }}>
      {showLabel && (
        <span style={{ position: 'absolute', left: 4, top: 2, fontFamily: 'var(--font-ui)', fontSize: 12, lineHeight: '18px', whiteSpace: 'nowrap', color: 'var(--doc-spacer-text)' }}>{px}px</span>
      )}
    </div>
  );
}
export default Spacer;
