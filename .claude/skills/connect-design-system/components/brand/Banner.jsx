import React from 'react';
import { Isotype } from './Isotype.jsx';

/* figma node 78:6394 — "Banner". The navy section header used across every
   spec page: mono cyan eyebrow, Poppins 40px title, orbital mark right. */
export function Banner({ eyebrow = 'foundations', title = 'Colors → Basics', style, className, children }) {
  return (
    <header className={className} style={{
      background: 'var(--doc-banner-bg)', display: 'flex', flexDirection: 'row',
      padding: '24px 48px', justifyContent: 'space-between', alignItems: 'flex-start',
      boxSizing: 'border-box', ...style,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, lineHeight: 1.4, letterSpacing: '0.08em', color: 'var(--doc-banner-eyebrow)', textTransform: 'uppercase' }}>{eyebrow}</span>
        <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 700, fontSize: 40, lineHeight: 1.2, letterSpacing: '-0.02em', color: '#FFFFFF' }}>{title}</span>
        {children}
      </div>
      <Isotype darkMode size={80} style={{ flexShrink: 0 }} />
    </header>
  );
}
export default Banner;
