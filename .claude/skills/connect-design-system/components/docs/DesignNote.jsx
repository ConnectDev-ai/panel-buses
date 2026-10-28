import React from 'react';

/* figma node 190:219 — "Design note" (Size: sm | md). Heading + supporting copy
   block used to annotate the spec pages. */
export function DesignNote({ size = 'sm', heading = 'Heading', supportingText = true, children, style, className }) {
  const md = size === 'md';
  return (
    <div className={className} style={{ width: 720, display: 'flex', flexDirection: 'column', gap: md ? 12 : 8, alignItems: 'flex-start', ...style }}>
      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: md ? 24 : 18, lineHeight: md ? '32px' : '28px', color: 'var(--text-title)', alignSelf: 'stretch' }}>{heading}</span>
      {supportingText && (
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 400, fontSize: md ? 18 : 16, lineHeight: md ? '28px' : '24px', color: 'var(--text-intermediate)', alignSelf: 'stretch' }}>{children}</span>
      )}
    </div>
  );
}
export default DesignNote;
