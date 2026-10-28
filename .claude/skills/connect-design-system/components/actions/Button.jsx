import React from 'react';
import { ButtonBase, BUTTON_SIZES } from './ButtonBase.jsx';

/* figma node 190:407 — "Buttons/Button" (Size 4 × Hierarchy 7 × Icon 5 × State 4 = 528 variants).
   Primary fill #7F56D9 / #6941C6 / #9E77ED are literal values from the source file.
   The remaining hierarchies resolve to Connect palette tokens — see readme.md
   "Known gaps": their Figma fills are unresolved library styles. */
const RING_COLOR = 'rgba(158,119,237,0.24)';
const RING_GRAY = 'rgba(148,163,184,0.24)';

const HIERARCHY = {
  primary: {
    default: { background: '#7F56D9', boxShadow: 'inset 0 0 0 1px #7F56D9, var(--shadow-xs)', color: '#FFFFFF' },
    hover:   { background: '#6941C6', boxShadow: 'inset 0 0 0 1px #6941C6, var(--shadow-xs)', color: '#FFFFFF' },
    focused: { background: '#7F56D9', boxShadow: `inset 0 0 0 1px #7F56D9, var(--shadow-xs), 0 0 0 4px ${RING_COLOR}`, color: '#FFFFFF' },
  },
  'secondary color': {
    default: { background: 'var(--neutral-50)', boxShadow: 'inset 0 0 0 1px var(--ai-200), var(--shadow-xs)', color: 'var(--ai-600)' },
    hover:   { background: 'var(--ai-50)', boxShadow: 'inset 0 0 0 1px var(--ai-200), var(--shadow-xs)', color: 'var(--ai-700)' },
    focused: { background: 'var(--neutral-50)', boxShadow: `inset 0 0 0 1px var(--ai-200), var(--shadow-xs), 0 0 0 4px ${RING_COLOR}`, color: 'var(--ai-600)' },
  },
  'secondary gray': {
    default: { background: 'var(--neutral-50)', boxShadow: 'inset 0 0 0 1px var(--border-subtle), var(--shadow-xs)', color: 'var(--text-intermediate)' },
    hover:   { background: 'var(--neutral-100)', boxShadow: 'inset 0 0 0 1px var(--border-subtle), var(--shadow-xs)', color: 'var(--text-body)' },
    focused: { background: 'var(--neutral-50)', boxShadow: `inset 0 0 0 1px var(--border-subtle), var(--shadow-xs), 0 0 0 4px ${RING_GRAY}`, color: 'var(--text-intermediate)' },
  },
  'tertiary color': {
    default: { background: 'transparent', color: 'var(--ai-600)' },
    hover:   { background: 'var(--ai-50)', color: 'var(--ai-700)' },
    focused: { background: 'transparent', boxShadow: `0 0 0 4px ${RING_COLOR}`, color: 'var(--ai-600)' },
  },
  'tertiary gray': {
    default: { background: 'transparent', color: 'var(--text-secondary)' },
    hover:   { background: 'var(--neutral-100)', color: 'var(--text-body)' },
    focused: { background: 'transparent', boxShadow: `0 0 0 4px ${RING_GRAY}`, color: 'var(--text-secondary)' },
  },
  'link color': {
    default: { background: 'transparent', color: 'var(--ai-600)' },
    hover:   { background: 'transparent', color: 'var(--ai-700)' },
    focused: { background: 'transparent', color: 'var(--ai-600)', textDecoration: 'underline' },
  },
  'link gray': {
    default: { background: 'transparent', color: 'var(--text-secondary)' },
    hover:   { background: 'transparent', color: 'var(--text-body)' },
    focused: { background: 'transparent', color: 'var(--text-body)', textDecoration: 'underline' },
  },
};

const DISABLED = {
  filled: { background: 'var(--neutral-200)', boxShadow: 'inset 0 0 0 1px var(--border-subtle)', color: 'var(--text-placeholder)' },
  bare: { background: 'transparent', color: 'var(--text-placeholder)' },
};

export function Button({
  size = 'md', hierarchy = 'primary', icon = 'false', state,
  children = 'Button CTA', iconNode, disabled = false, onClick, type = 'button', style, className, ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const isLink = hierarchy === 'link color' || hierarchy === 'link gray';
  const resolved = state || (disabled ? 'disabled' : hovered ? 'hover' : focused ? 'focused' : 'default');
  const skin = resolved === 'disabled'
    ? (isLink || hierarchy.startsWith('tertiary') ? DISABLED.bare : DISABLED.filled)
    : (HIERARCHY[hierarchy] || HIERARCHY.primary)[resolved] || (HIERARCHY[hierarchy] || HIERARCHY.primary).default;
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={className}
      style={{
        appearance: 'none', border: 0, padding: 0, background: 'none', font: 'inherit',
        borderRadius: isLink ? 0 : 8, cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', transition: 'background 120ms ease, color 120ms ease, box-shadow 120ms ease',
        ...style,
      }}
      {...rest}
    >
      <ButtonBase size={size} icon={icon} iconNode={iconNode} style={{
        ...skin,
        borderRadius: isLink ? 0 : 8,
        padding: isLink ? 0 : (icon === 'only' ? `${s.iconOnly}px` : s.padding),
        overflow: 'visible',
      }}>{children}</ButtonBase>
    </button>
  );
}
export default Button;
