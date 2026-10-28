import React from 'react';

/* figma node 180:58 — "_Shadow card". The 256×240 specimen card used on the
   Drop Shadows page; also the canonical Connect card shape. */
const SHADOWS = { xs: 'var(--shadow-xs)', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)', xl: 'var(--shadow-xl)' };

export function ShadowCard({ level = 'xs', label, style, className, children }) {
  return (
    <div className={className} style={{
      width: 256, height: 240, maxWidth: 256, overflow: 'hidden', borderRadius: 12,
      background: 'var(--surface-card)',
      boxShadow: `var(--shadow-card-border), ${SHADOWS[level] || SHADOWS.xs}`,
      display: 'flex', padding: 24, alignItems: 'flex-start', boxSizing: 'border-box', ...style,
    }}>
      {children ?? (
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 18, lineHeight: '28px', color: 'var(--text-title)' }}>
          {label ?? `shadow-${level}`}
        </span>
      )}
    </div>
  );
}
export default ShadowCard;
