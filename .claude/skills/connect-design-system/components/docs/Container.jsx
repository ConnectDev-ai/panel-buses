import React from 'react';

/* figma node 190:1503 — "_Container". The breakpoint frame from the Grids page:
   a 16px-radius outlined box captioned with its width and a keyboard hint. */
export function Container({ label = 'Desktop 1,280px', width = 1280, height = 708, hint, style, className, children }) {
  return (
    <div className={className} style={{
      width, height, borderRadius: 16, background: 'var(--surface-card)',
      boxShadow: 'inset 0 0 0 1px #D4D4D4', position: 'relative', overflow: 'hidden', ...style,
    }}>
      {children ?? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 60, lineHeight: '72px', letterSpacing: '-0.02em', color: 'var(--text-title)', textAlign: 'center' }}>{label}</span>
          {hint && <span style={{ fontFamily: 'var(--font-ui)', fontSize: 18, lineHeight: '28px', color: 'var(--text-intermediate)' }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}
export default Container;
