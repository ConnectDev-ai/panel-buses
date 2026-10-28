import React from 'react';
import { Circle } from './Circle.jsx';
import { Dot } from './Dot.jsx';

/* figma node 190:343 — "_Button base" (Size × Icon = 20 variants).
   Geometry transcribed verbatim from the source file. */
export const BUTTON_SIZES = {
  sm: { padding: '8px 14px', iconOnly: 8, fontSize: 14, lineHeight: '20px' },
  md: { padding: '10px 16px', iconOnly: 10, fontSize: 14, lineHeight: '20px' },
  lg: { padding: '10px 18px', iconOnly: 12, fontSize: 16, lineHeight: '24px' },
  xl: { padding: '12px 20px', iconOnly: 14, fontSize: 16, lineHeight: '24px' },
};

export function ButtonBase({ size = 'md', icon = 'false', children = 'Button CTA', iconNode, style, className, ...rest }) {
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const glyph = iconNode !== undefined ? iconNode : (icon === 'dot' ? <Dot size="md" /> : <Circle size={20} />);
  const slot = (
    <span style={{ display: 'inline-flex', width: icon === 'dot' ? 10 : 20, height: icon === 'dot' ? 10 : 20, flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>{glyph}</span>
  );
  return (
    <span className={className} style={{
      width: 'fit-content', overflow: 'hidden', borderRadius: 8,
      display: 'inline-flex', flexDirection: 'row', gap: 8,
      padding: icon === 'only' ? `${s.iconOnly}px` : s.padding,
      justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box',
      fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: s.fontSize, lineHeight: s.lineHeight,
      whiteSpace: 'nowrap', position: 'relative', ...style,
    }} {...rest}>
      {(icon === 'leading' || icon === 'dot' || icon === 'only') && slot}
      {icon !== 'only' && <span>{children}</span>}
      {icon === 'trailing' && slot}
    </span>
  );
}
export default ButtonBase;
