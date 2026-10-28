/* @ds-bundle: {"format":4,"namespace":"ConnectDesignSystem_a5c051","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"BUTTON_SIZES","sourcePath":"components/actions/ButtonBase.jsx"},{"name":"ButtonBase","sourcePath":"components/actions/ButtonBase.jsx"},{"name":"Circle","sourcePath":"components/actions/Circle.jsx"},{"name":"Dot","sourcePath":"components/actions/Dot.jsx"},{"name":"Banner","sourcePath":"components/brand/Banner.jsx"},{"name":"Isotype","sourcePath":"components/brand/Isotype.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Container","sourcePath":"components/docs/Container.jsx"},{"name":"ContainerSpacer","sourcePath":"components/docs/ContainerSpacer.jsx"},{"name":"DesignNote","sourcePath":"components/docs/DesignNote.jsx"},{"name":"MeasureLine","sourcePath":"components/docs/MeasureLine.jsx"},{"name":"MeasureLineBase","sourcePath":"components/docs/MeasureLineBase.jsx"},{"name":"ShadowCard","sourcePath":"components/docs/ShadowCard.jsx"},{"name":"SPACER_STEPS","sourcePath":"components/docs/Spacer.jsx"},{"name":"Spacer","sourcePath":"components/docs/Spacer.jsx"},{"name":"SpacingRow","sourcePath":"components/docs/SpacingRow.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"72a4fc30aef2","components/actions/ButtonBase.jsx":"5a8751469dca","components/actions/Circle.jsx":"bc8cdc613f96","components/actions/Dot.jsx":"736aa5608573","components/brand/Banner.jsx":"91f961681451","components/brand/Isotype.jsx":"5fb9b790705f","components/brand/Logo.jsx":"4afe172760bb","components/docs/Container.jsx":"3031b6680d0a","components/docs/ContainerSpacer.jsx":"362c3706bd57","components/docs/DesignNote.jsx":"b419a32d389d","components/docs/MeasureLine.jsx":"2747fd20cfc3","components/docs/MeasureLineBase.jsx":"60676bbbc515","components/docs/ShadowCard.jsx":"22af069308dd","components/docs/Spacer.jsx":"b2d5984b41dc","components/docs/SpacingRow.jsx":"f48ae533d8bc","components/icons/Icon.jsx":"d0b1494ee830","ui_kits/connect-foundations/ColorScreens.jsx":"b7ade0294444","ui_kits/connect-foundations/Shell.jsx":"c9e1f91fa850","ui_kits/connect-foundations/SystemScreens.jsx":"9df842acd0b9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConnectDesignSystem_a5c051 = window.ConnectDesignSystem_a5c051 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Circle.jsx
try { (() => {
/* figma node 190:331 — "circle". The placeholder glyph shipped inside
   _Button base; a 24×24 box holding a 20px hairline ring in currentColor. */
function Circle({
  size = 24,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: size,
      height: size,
      overflow: 'hidden',
      position: 'relative',
      color: 'currentColor',
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    style: {
      position: 'absolute',
      left: (size - 20) / 2,
      top: (size - 20) / 2
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "10",
    r: "9",
    stroke: "currentColor",
    strokeWidth: "1",
    fill: "none"
  })));
}
Object.assign(__ds_scope, { Circle, __ds_default_components_actions_Circle_95hr7w: Circle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Circle.jsx", error: String((e && e.message) || e) }); }

// components/actions/Dot.jsx
try { (() => {
/* figma node 190:336 — "_Dot" (Size: sm | md | lg). */
const DOT = {
  sm: {
    box: 8,
    dot: 6
  },
  md: {
    box: 10,
    dot: 8
  },
  lg: {
    box: 12,
    dot: 10
  }
};
function Dot({
  size = 'md',
  color = 'rgb(34,197,94)',
  style,
  className
}) {
  const s = DOT[size] || DOT.md;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: s.box,
      height: s.box,
      overflow: 'hidden',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 1,
      top: 1,
      width: s.dot,
      height: s.dot,
      borderRadius: '50%',
      background: color
    }
  }));
}
Object.assign(__ds_scope, { Dot, __ds_default_components_actions_Dot_6267j5: Dot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Dot.jsx", error: String((e && e.message) || e) }); }

// components/actions/ButtonBase.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma node 190:343 — "_Button base" (Size × Icon = 20 variants).
   Geometry transcribed verbatim from the source file. */
const BUTTON_SIZES = {
  sm: {
    padding: '8px 14px',
    iconOnly: 8,
    fontSize: 14,
    lineHeight: '20px'
  },
  md: {
    padding: '10px 16px',
    iconOnly: 10,
    fontSize: 14,
    lineHeight: '20px'
  },
  lg: {
    padding: '10px 18px',
    iconOnly: 12,
    fontSize: 16,
    lineHeight: '24px'
  },
  xl: {
    padding: '12px 20px',
    iconOnly: 14,
    fontSize: 16,
    lineHeight: '24px'
  }
};
function ButtonBase({
  size = 'md',
  icon = 'false',
  children = 'Button CTA',
  iconNode,
  style,
  className,
  ...rest
}) {
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const glyph = iconNode !== undefined ? iconNode : icon === 'dot' ? /*#__PURE__*/React.createElement(__ds_scope.Dot, {
    size: "md"
  }) : /*#__PURE__*/React.createElement(__ds_scope.Circle, {
    size: 20
  });
  const slot = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: icon === 'dot' ? 10 : 20,
      height: icon === 'dot' ? 10 : 20,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, glyph);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      width: 'fit-content',
      overflow: 'hidden',
      borderRadius: 8,
      display: 'inline-flex',
      flexDirection: 'row',
      gap: 8,
      padding: icon === 'only' ? `${s.iconOnly}px` : s.padding,
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      whiteSpace: 'nowrap',
      position: 'relative',
      ...style
    }
  }, rest), (icon === 'leading' || icon === 'dot' || icon === 'only') && slot, icon !== 'only' && /*#__PURE__*/React.createElement("span", null, children), icon === 'trailing' && slot);
}
Object.assign(__ds_scope, { BUTTON_SIZES, ButtonBase, __ds_default_components_actions_ButtonBase_1a2gzwx: ButtonBase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/ButtonBase.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* figma node 190:407 — "Buttons/Button" (Size 4 × Hierarchy 7 × Icon 5 × State 4 = 528 variants).
   Primary fill #7F56D9 / #6941C6 / #9E77ED are literal values from the source file.
   The remaining hierarchies resolve to Connect palette tokens — see readme.md
   "Known gaps": their Figma fills are unresolved library styles. */
const RING_COLOR = 'rgba(158,119,237,0.24)';
const RING_GRAY = 'rgba(148,163,184,0.24)';
const HIERARCHY = {
  primary: {
    default: {
      background: '#7F56D9',
      boxShadow: 'inset 0 0 0 1px #7F56D9, var(--shadow-xs)',
      color: '#FFFFFF'
    },
    hover: {
      background: '#6941C6',
      boxShadow: 'inset 0 0 0 1px #6941C6, var(--shadow-xs)',
      color: '#FFFFFF'
    },
    focused: {
      background: '#7F56D9',
      boxShadow: `inset 0 0 0 1px #7F56D9, var(--shadow-xs), 0 0 0 4px ${RING_COLOR}`,
      color: '#FFFFFF'
    }
  },
  'secondary color': {
    default: {
      background: 'var(--neutral-50)',
      boxShadow: 'inset 0 0 0 1px var(--ai-200), var(--shadow-xs)',
      color: 'var(--ai-600)'
    },
    hover: {
      background: 'var(--ai-50)',
      boxShadow: 'inset 0 0 0 1px var(--ai-200), var(--shadow-xs)',
      color: 'var(--ai-700)'
    },
    focused: {
      background: 'var(--neutral-50)',
      boxShadow: `inset 0 0 0 1px var(--ai-200), var(--shadow-xs), 0 0 0 4px ${RING_COLOR}`,
      color: 'var(--ai-600)'
    }
  },
  'secondary gray': {
    default: {
      background: 'var(--neutral-50)',
      boxShadow: 'inset 0 0 0 1px var(--border-subtle), var(--shadow-xs)',
      color: 'var(--text-intermediate)'
    },
    hover: {
      background: 'var(--neutral-100)',
      boxShadow: 'inset 0 0 0 1px var(--border-subtle), var(--shadow-xs)',
      color: 'var(--text-body)'
    },
    focused: {
      background: 'var(--neutral-50)',
      boxShadow: `inset 0 0 0 1px var(--border-subtle), var(--shadow-xs), 0 0 0 4px ${RING_GRAY}`,
      color: 'var(--text-intermediate)'
    }
  },
  'tertiary color': {
    default: {
      background: 'transparent',
      color: 'var(--ai-600)'
    },
    hover: {
      background: 'var(--ai-50)',
      color: 'var(--ai-700)'
    },
    focused: {
      background: 'transparent',
      boxShadow: `0 0 0 4px ${RING_COLOR}`,
      color: 'var(--ai-600)'
    }
  },
  'tertiary gray': {
    default: {
      background: 'transparent',
      color: 'var(--text-secondary)'
    },
    hover: {
      background: 'var(--neutral-100)',
      color: 'var(--text-body)'
    },
    focused: {
      background: 'transparent',
      boxShadow: `0 0 0 4px ${RING_GRAY}`,
      color: 'var(--text-secondary)'
    }
  },
  'link color': {
    default: {
      background: 'transparent',
      color: 'var(--ai-600)'
    },
    hover: {
      background: 'transparent',
      color: 'var(--ai-700)'
    },
    focused: {
      background: 'transparent',
      color: 'var(--ai-600)',
      textDecoration: 'underline'
    }
  },
  'link gray': {
    default: {
      background: 'transparent',
      color: 'var(--text-secondary)'
    },
    hover: {
      background: 'transparent',
      color: 'var(--text-body)'
    },
    focused: {
      background: 'transparent',
      color: 'var(--text-body)',
      textDecoration: 'underline'
    }
  }
};
const DISABLED = {
  filled: {
    background: 'var(--neutral-200)',
    boxShadow: 'inset 0 0 0 1px var(--border-subtle)',
    color: 'var(--text-placeholder)'
  },
  bare: {
    background: 'transparent',
    color: 'var(--text-placeholder)'
  }
};
function Button({
  size = 'md',
  hierarchy = 'primary',
  icon = 'false',
  state,
  children = 'Button CTA',
  iconNode,
  disabled = false,
  onClick,
  type = 'button',
  style,
  className,
  ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const isLink = hierarchy === 'link color' || hierarchy === 'link gray';
  const resolved = state || (disabled ? 'disabled' : hovered ? 'hover' : focused ? 'focused' : 'default');
  const skin = resolved === 'disabled' ? isLink || hierarchy.startsWith('tertiary') ? DISABLED.bare : DISABLED.filled : (HIERARCHY[hierarchy] || HIERARCHY.primary)[resolved] || (HIERARCHY[hierarchy] || HIERARCHY.primary).default;
  const s = __ds_scope.BUTTON_SIZES[size] || __ds_scope.BUTTON_SIZES.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: className,
    style: {
      appearance: 'none',
      border: 0,
      padding: 0,
      background: 'none',
      font: 'inherit',
      borderRadius: isLink ? 0 : 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex',
      transition: 'background 120ms ease, color 120ms ease, box-shadow 120ms ease',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.ButtonBase, {
    size: size,
    icon: icon,
    iconNode: iconNode,
    style: {
      ...skin,
      borderRadius: isLink ? 0 : 8,
      padding: isLink ? 0 : icon === 'only' ? `${s.iconOnly}px` : s.padding,
      overflow: 'visible'
    }
  }, children));
}
Object.assign(__ds_scope, { Button, __ds_default_components_actions_Button_8qpwqe: Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/Isotype.jsx
try { (() => {
/* figma node 92:966 — "Isotype" (Dark mode: 2). The orbital mark on its own.
   Renders the exact SVG exported from the .fig; set window.__CONNECT_ASSETS
   to point at this design system's assets/logos folder from your page. */
const assetBase = () => typeof window !== 'undefined' && window.__CONNECT_ASSETS || '/assets/logos';
const SRC = {
  false: 'isotype-light-fullcolor.svg',
  true: 'isotype-dark-fullcolor.svg',
  negative: 'isotype-dark-negative.svg',
  positive: 'isotype-light-positive.svg'
};
function Isotype({
  darkMode = false,
  variant,
  size = 40,
  style,
  className
}) {
  const key = variant || String(!!darkMode);
  return /*#__PURE__*/React.createElement("img", {
    className: className,
    src: `${assetBase()}/${SRC[key] || SRC.false}`,
    alt: "Connect",
    style: {
      height: size,
      width: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Isotype, __ds_default_components_brand_Isotype_93zhh9: Isotype });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Isotype.jsx", error: String((e && e.message) || e) }); }

// components/brand/Banner.jsx
try { (() => {
/* figma node 78:6394 — "Banner". The navy section header used across every
   spec page: mono cyan eyebrow, Poppins 40px title, orbital mark right. */
function Banner({
  eyebrow = 'foundations',
  title = 'Colors → Basics',
  style,
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: className,
    style: {
      background: 'var(--doc-banner-bg)',
      display: 'flex',
      flexDirection: 'row',
      padding: '24px 48px',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 12,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      color: 'var(--doc-banner-eyebrow)',
      textTransform: 'uppercase'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 700,
      fontSize: 40,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#FFFFFF'
    }
  }, title), children), /*#__PURE__*/React.createElement(__ds_scope.Isotype, {
    darkMode: true,
    size: 80,
    style: {
      flexShrink: 0
    }
  }));
}
Object.assign(__ds_scope, { Banner, __ds_default_components_brand_Banner_j2h1pi: Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Banner.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
/* figma node 92:960 — "Logo" (Dark Mode: 2), plus the Divemotor lockup and
   the AI sub-brand from the Logos page. Real SVG exports, not redrawings. */
const assetBase = () => typeof window !== 'undefined' && window.__CONNECT_ASSETS || '/assets/logos';
const SRC = {
  connect: {
    light: 'connect-light-fullcolor.svg',
    dark: 'connect-fullcolor-negative.svg'
  },
  divemotor: {
    light: 'divemotor-connect-light-fullcolor.svg',
    dark: 'divemotor-connect-light-fullcolor.svg'
  },
  ai: {
    light: 'connect-ai-light-fullcolor.svg',
    dark: 'connect-ai-light-fullcolor.svg'
  },
  wordmark: {
    light: 'connect-wordmark.svg',
    dark: 'connect-wordmark.svg'
  }
};
function Logo({
  darkMode = false,
  lockup = 'connect',
  size = 32,
  style,
  className
}) {
  const set = SRC[lockup] || SRC.connect;
  return /*#__PURE__*/React.createElement("img", {
    className: className,
    src: `${assetBase()}/${darkMode ? set.dark : set.light}`,
    alt: "Connect",
    style: {
      height: size,
      width: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo, __ds_default_components_brand_Logo_1q8yv4x: Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/docs/Container.jsx
try { (() => {
/* figma node 190:1503 — "_Container". The breakpoint frame from the Grids page:
   a 16px-radius outlined box captioned with its width and a keyboard hint. */
function Container({
  label = 'Desktop 1,280px',
  width = 1280,
  height = 708,
  hint,
  style,
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width,
      height,
      borderRadius: 16,
      background: 'var(--surface-card)',
      boxShadow: 'inset 0 0 0 1px #D4D4D4',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, children ?? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: 60,
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      color: 'var(--text-title)',
      textAlign: 'center'
    }
  }, label), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontSize: 18,
      lineHeight: '28px',
      color: 'var(--text-intermediate)'
    }
  }, hint)));
}
Object.assign(__ds_scope, { Container, __ds_default_components_docs_Container_187zxf9: Container });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/Container.jsx", error: String((e && e.message) || e) }); }

// components/docs/ContainerSpacer.jsx
try { (() => {
/* figma node 190:246 — "Container spacer" (Size: 4). Breakpoint-width bands
   used on the Grids page. */
const WIDTHS = {
  'sm - 640px': 640,
  'md - 768px': 768,
  'lg - 1024px': 1024,
  'xl - 1280px': 1280
};
const fmt = n => n.toLocaleString('en-US');
function ContainerSpacer({
  size = 'sm - 640px',
  style,
  className
}) {
  const w = WIDTHS[size] ?? 640;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: w,
      height: 20,
      background: 'var(--doc-spacer-fill)',
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 4,
      top: 2,
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      lineHeight: '18px',
      whiteSpace: 'nowrap',
      color: 'var(--doc-spacer-text)'
    }
  }, fmt(w), "px"));
}
Object.assign(__ds_scope, { ContainerSpacer, __ds_default_components_docs_ContainerSpacer_so26r7: ContainerSpacer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/ContainerSpacer.jsx", error: String((e && e.message) || e) }); }

// components/docs/DesignNote.jsx
try { (() => {
/* figma node 190:219 — "Design note" (Size: sm | md). Heading + supporting copy
   block used to annotate the spec pages. */
function DesignNote({
  size = 'sm',
  heading = 'Heading',
  supportingText = true,
  children,
  style,
  className
}) {
  const md = size === 'md';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: 720,
      display: 'flex',
      flexDirection: 'column',
      gap: md ? 12 : 8,
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: md ? 24 : 18,
      lineHeight: md ? '32px' : '28px',
      color: 'var(--text-title)',
      alignSelf: 'stretch'
    }
  }, heading), supportingText && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 400,
      fontSize: md ? 18 : 16,
      lineHeight: md ? '28px' : '24px',
      color: 'var(--text-intermediate)',
      alignSelf: 'stretch'
    }
  }, children));
}
Object.assign(__ds_scope, { DesignNote, __ds_default_components_docs_DesignNote_qi4nj6: DesignNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/DesignNote.jsx", error: String((e && e.message) || e) }); }

// components/docs/MeasureLineBase.jsx
try { (() => {
/* figma node 190:1466 — "_Measure line base" (Type: Solid | Spacer).
   The red dimension rule: solid = end-caps + arrowed rule, spacer = dashed. */
function MeasureLineBase({
  type = 'solid',
  length = 80,
  vertical = false,
  style,
  className
}) {
  const stroke = 'var(--doc-measure)';
  const rule = {
    position: 'absolute',
    background: 'none',
    borderTop: type === 'spacer' ? `1px dashed ${stroke}` : `1px solid ${stroke}`
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: vertical ? 16 : length,
      height: vertical ? length : 16,
      position: 'relative',
      color: stroke,
      transform: vertical ? 'none' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: vertical ? {
      ...rule,
      top: 0,
      left: 8,
      width: length,
      transform: 'rotate(90deg)',
      transformOrigin: '0 0'
    } : {
      ...rule,
      top: 8,
      left: 0,
      width: length
    }
  }), ['start', 'end'].map(cap => /*#__PURE__*/React.createElement("div", {
    key: cap,
    style: {
      position: 'absolute',
      [vertical ? 'top' : 'left']: cap === 'start' ? 0 : length - 1,
      [vertical ? 'left' : 'top']: 0,
      width: vertical ? 16 : 1,
      height: vertical ? 1 : 16,
      background: stroke
    }
  })));
}
Object.assign(__ds_scope, { MeasureLineBase, __ds_default_components_docs_MeasureLineBase_ch9sh3: MeasureLineBase });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/MeasureLineBase.jsx", error: String((e && e.message) || e) }); }

// components/docs/MeasureLine.jsx
try { (() => {
/* figma node 190:1475 — "Measure line" (Number position: Left | Right | Top | Bottom).
   A labelled red dimension annotation. */
function MeasureLine({
  numberPosition = 'left',
  length = 80,
  label,
  style,
  className
}) {
  const text = label ?? `${length}px`;
  const vertical = numberPosition === 'top' || numberPosition === 'bottom';
  const cap = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '18px',
    color: 'var(--doc-measure)',
    whiteSpace: 'nowrap',
    position: 'absolute'
  };
  const pos = {
    left: {
      right: 'calc(100% + 4px)',
      top: '50%',
      transform: 'translateY(-50%)',
      textAlign: 'right'
    },
    right: {
      left: 'calc(100% + 4px)',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    top: {
      bottom: 'calc(100% + 4px)',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: 'calc(100% + 4px)',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }[numberPosition];
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: 'relative',
      width: vertical ? 16 : length,
      height: vertical ? length : 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MeasureLineBase, {
    type: "solid",
    length: length,
    vertical: vertical
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cap,
      ...pos
    }
  }, text));
}
Object.assign(__ds_scope, { MeasureLine, __ds_default_components_docs_MeasureLine_krfv64: MeasureLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/MeasureLine.jsx", error: String((e && e.message) || e) }); }

// components/docs/ShadowCard.jsx
try { (() => {
/* figma node 180:58 — "_Shadow card". The 256×240 specimen card used on the
   Drop Shadows page; also the canonical Connect card shape. */
const SHADOWS = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)'
};
function ShadowCard({
  level = 'xs',
  label,
  style,
  className,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: 256,
      height: 240,
      maxWidth: 256,
      overflow: 'hidden',
      borderRadius: 12,
      background: 'var(--surface-card)',
      boxShadow: `var(--shadow-card-border), ${SHADOWS[level] || SHADOWS.xs}`,
      display: 'flex',
      padding: 24,
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      ...style
    }
  }, children ?? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '28px',
      color: 'var(--text-title)'
    }
  }, label ?? `shadow-${level}`));
}
Object.assign(__ds_scope, { ShadowCard, __ds_default_components_docs_ShadowCard_1ueujgy: ShadowCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/ShadowCard.jsx", error: String((e && e.message) || e) }); }

// components/docs/Spacer.jsx
try { (() => {
/* figma node 190:98 — "Spacer" (Direction: X-axis | Y-axis, Size: 17 steps).
   The measured spacing swatch: a tinted band labelled with its px value. */
const SPACER_STEPS = {
  '01': 4,
  '02': 8,
  '03': 12,
  '04': 16,
  '05': 20,
  '06': 24,
  '08': 32,
  '10': 40,
  '12': 48,
  '16': 64,
  '20': 80,
  '24': 96,
  '32': 128,
  '40': 160,
  '48': 192,
  '56': 224,
  '64': 256
};
function Spacer({
  size = '01',
  direction = 'x-axis',
  showLabel = true,
  style,
  className
}) {
  const px = SPACER_STEPS[size] ?? SPACER_STEPS['01'];
  const x = direction === 'x-axis';
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: x ? px : 20,
      height: x ? 20 : px,
      background: 'var(--doc-spacer-fill)',
      position: 'relative',
      flexShrink: 0,
      ...style
    }
  }, showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 4,
      top: 2,
      fontFamily: 'var(--font-ui)',
      fontSize: 12,
      lineHeight: '18px',
      whiteSpace: 'nowrap',
      color: 'var(--doc-spacer-text)'
    }
  }, px, "px"));
}
Object.assign(__ds_scope, { SPACER_STEPS, Spacer, __ds_default_components_docs_Spacer_1nog7e8: Spacer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/Spacer.jsx", error: String((e && e.message) || e) }); }

// components/docs/SpacingRow.jsx
try { (() => {
/* figma node 190:77 — "_Spacing". One row of the spacing table:
   step · rem · px, on a fixed 360px measure. */
function SpacingRow({
  step = '1',
  rem = '0.25rem',
  px = '4px',
  style,
  className
}) {
  const cell = {
    fontFamily: 'var(--font-ui)',
    fontSize: 16,
    lineHeight: '24px',
    color: 'var(--text-title)',
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: 360,
      height: 24,
      position: 'relative',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...cell,
      left: 0
    }
  }, step), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cell,
      left: 96
    }
  }, rem), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cell,
      left: 255
    }
  }, px));
}
Object.assign(__ds_scope, { SpacingRow, __ds_default_components_docs_SpacingRow_fgh18v: SpacingRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/docs/SpacingRow.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
/* Connect's icon system is Lucide, drawn on a 24×24 grid with rounded caps
   (UI-KIT - Connect → Icons). The .fig carries ~1,668 Lucide glyphs; rather
   than duplicate the library, this wrapper renders the official Lucide sprite
   from the CDN, matching the file's own instruction to import Lucide packages. */
const CDN = 'https://unpkg.com/lucide-static@0.544.0/icons';
function Icon({
  name = 'circle',
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  title,
  style,
  className
}) {
  const [markup, setMarkup] = React.useState(null);
  React.useEffect(() => {
    let live = true;
    fetch(`${CDN}/${name}.svg`).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      if (live) setMarkup(t.replace(/<svg[^>]*>|<\/svg>/g, ''));
    }).catch(() => {
      if (live) setMarkup('');
    });
    return () => {
      live = false;
    };
  }, [name]);
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    role: title ? 'img' : 'presentation',
    "aria-label": title,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: markup || ''
    }
  });
}
Object.assign(__ds_scope, { Icon, __ds_default_components_icons_Icon_fio49a: Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/connect-foundations/ColorScreens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  DesignNote
} = window.ConnectDesignSystem_a5c051;
const SwatchCard = ({
  name,
  hex
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    borderRadius: 8,
    boxShadow: 'inset 0 0 0 1px var(--doc-hairline)',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    height: 70,
    background: hex
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-primary)',
    fontWeight: 600,
    fontSize: 18,
    lineHeight: 0.9,
    letterSpacing: '-0.02em',
    color: 'var(--text-title)'
  }
}, name), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-primary)',
    fontSize: 14,
    lineHeight: 0.9,
    letterSpacing: '-0.02em',
    color: 'var(--connect-gray)'
  }
}, hex)));
const BASICS = {
  Base: [['Navy', '#0E1323'], ['Gray', '#6B7280'], ['Mist', '#F3F4F6'], ['White', '#FFFFFF']],
  Primary: [['Violeta', '#6A1B9A'], ['Purple', '#8E3CD9'], ['Blue', '#2563EB'], ['Cyan', '#00B4DB']],
  Productos: [['AI', '#5322B5'], ['Safety', '#FE931A'], ['Fleet', '#0EA78C'], ['Care', '#0E9AA7']]
};
function ColorsBasics() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "basics"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "UI KIT",
    statusColor: "var(--violeta-600)",
    title: "Proporci\xF3n de uso"
  }, '70% neutrales\n22% Violeta y Azul como color de marca.\n8% Cian para acentos, datos y estados activos.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "cx-body",
    style: {
      maxWidth: 620,
      color: 'var(--text-title)'
    }
  }, /*#__PURE__*/React.createElement("strong", null, "El espectro Connect."), " Del violeta profundo al cian de datos. Una progresi\xF3n que va desde la inteligencia a la informaci\xF3n en tiempo real."), Object.entries(BASICS).map(([group, rows]) => /*#__PURE__*/React.createElement("section", {
    key: group
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)',
      paddingBottom: 12,
      borderBottom: '1px solid var(--connect-gray)',
      marginBottom: 24
    }
  }, group), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, rows.map(([n, h]) => /*#__PURE__*/React.createElement(SwatchCard, {
    key: n,
    name: n,
    hex: h
  })))))));
}
const RAMPS = [{
  label: 'Cian',
  prefix: 'cyan',
  main: 600
}, {
  label: 'Azul',
  prefix: 'blue',
  main: 500
}, {
  label: 'Púrpura',
  prefix: 'purple',
  main: 500
}, {
  label: 'Violeta',
  prefix: 'violeta',
  main: 600
}];
const MODULES = [{
  label: 'Safety',
  prefix: 'safety',
  main: 500
}, {
  label: 'Fleet',
  prefix: 'fleet',
  main: 600
}, {
  label: 'Care',
  prefix: 'care',
  main: 600
}, {
  label: 'AI',
  prefix: 'ai',
  main: 600
}];
const SEMANTIC = ['error', 'warning', 'info', 'success'];
const NEUTRAL_NOTES = {
  100: '100 Background',
  400: '400\nIcons Strong Borders',
  600: '600\nLight fonts\nSecondary text',
  700: '700\nText intermediate',
  800: '800\nBody fonts\n(principal)',
  900: '900\nDark fonts\nTitulos'
};
function Ramp({
  label,
  prefix,
  main,
  steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  notes
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 0.9,
      letterSpacing: '-0.02em',
      color: 'var(--text-title)',
      marginBottom: 16
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${steps.length},1fr)`,
      gap: 13
    }
  }, steps.map(n => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 60,
      borderRadius: 8,
      background: `var(--${prefix}-${n})`,
      boxShadow: 'inset 0 0 0 1px var(--doc-swatch-border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      lineHeight: 1.3,
      letterSpacing: '-0.02em',
      color: 'var(--connect-gray)',
      marginTop: 13,
      whiteSpace: 'pre-line'
    }
  }, notes && notes[n] || (n === main ? `${n} (Main)` : n))))));
}
function ColorPalette({
  dark,
  setDark
}) {
  return /*#__PURE__*/React.createElement(Page, {
    id: "palette"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "PALETA COLORES UI",
    title: dark ? 'Dark mode' : 'Light mode'
  }, dark ? 'El 50 pasa a ser el color más oscuro de la UI y las escalas más altas son para los textos. Los módulos reducen su opacidad y brillo para encajar en el entorno oscuro.' : 'Neutral se usa para fondos, bordes, textos y acciones secundarias. Los módulos son los colores predominantes por cada módulo de Connect.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    },
    "data-theme": dark ? 'dark' : undefined
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDark(!dark),
    style: {
      appearance: 'none',
      border: 0,
      cursor: 'pointer',
      borderRadius: 4,
      padding: '10px 14px',
      marginBottom: 32,
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: 'var(--connect-navy)',
      color: '#fff'
    }
  }, dark ? 'Ver light mode' : 'Ver dark mode'), /*#__PURE__*/React.createElement("div", {
    style: {
      background: dark ? 'var(--neutral-50)' : 'transparent',
      padding: dark ? 24 : 0,
      borderRadius: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)',
      paddingBottom: 12,
      borderBottom: '1px solid var(--connect-gray)',
      marginBottom: 24
    }
  }, "Primary"), RAMPS.map(r => /*#__PURE__*/React.createElement(Ramp, _extends({
    key: r.prefix
  }, r))), /*#__PURE__*/React.createElement("h3", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)',
      paddingBottom: 12,
      borderBottom: '1px solid var(--connect-gray)',
      margin: '8px 0 24px'
    }
  }, "Neutral"), /*#__PURE__*/React.createElement(Ramp, {
    label: "Neutral",
    prefix: "neutral",
    notes: NEUTRAL_NOTES
  }), /*#__PURE__*/React.createElement("h3", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)',
      paddingBottom: 12,
      borderBottom: '1px solid var(--connect-gray)',
      margin: '8px 0 24px'
    }
  }, "Modules"), MODULES.map(r => /*#__PURE__*/React.createElement(Ramp, _extends({
    key: r.prefix
  }, r))), /*#__PURE__*/React.createElement("h3", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)',
      paddingBottom: 12,
      borderBottom: '1px solid var(--connect-gray)',
      margin: '8px 0 24px'
    }
  }, "Semantic"), SEMANTIC.map(p => /*#__PURE__*/React.createElement(Ramp, {
    key: p,
    label: p[0].toUpperCase() + p.slice(1),
    prefix: p,
    main: 400,
    steps: [100, 200, 300, 400, 500, 600]
  })))));
}
const GRADIENTS = [['Master', 'var(--gradient-master)', '#6A1B9A', '⍺ 85.43°', '#00B4DB'], ['Safety', 'var(--gradient-safety)', '#7E4301', '⍺ 108°', '#FE931A'], ['Fleet', 'var(--gradient-fleet)', '#06493D', '⍺ 108°', '#0EA78C'], ['Care', 'var(--gradient-care)', '#064349', '⍺ 108°', '#0E9AA7'], ['AI', 'var(--gradient-ai)', '#2C125F', '⍺ 108°', '#5322B5'], ['Clientes', 'var(--gradient-clientes)', '#2563EB', '⍺ 135°', '#00B4DB'], ['Workspace', 'var(--gradient-workspace)', '#6A1B9A', '⍺ 135°', '#8E3CD9'], ['Surface', 'var(--gradient-surface)', '#0E1323', '⍺ 90°', '#1B2440']];
function ColorGradient() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "gradient"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "GRADIENTS",
    title: "Marca"
  }, 'Gradientes maestro (de Connect) y de pilares principales. Se utiliza en fondos, superficies amplias y en acentos de datos.\n\nGradientes diseñados por módulo para dar identidad a la sub-marca, manteniendo la identidad principal de Connect.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 8,
      boxShadow: 'inset 0 0 0 1px var(--doc-hairline)',
      overflow: 'hidden',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 70,
      background: 'var(--gradient-master)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 0.9,
      letterSpacing: '-0.02em'
    }
  }, "Master"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-primary)',
      fontSize: 14,
      color: 'var(--connect-gray)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "#6A1B9A"), /*#__PURE__*/React.createElement("span", null, "#8E3CD9"), /*#__PURE__*/React.createElement("span", null, "\u237A 85.43\xB0"), /*#__PURE__*/React.createElement("span", null, "#2563EB"), /*#__PURE__*/React.createElement("span", null, "#00B4DB")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 24
    }
  }, GRADIENTS.slice(1).map(([n, g, a, ang, b]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      borderRadius: 8,
      boxShadow: 'inset 0 0 0 1px var(--doc-hairline)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 70,
      background: g
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 0.9,
      letterSpacing: '-0.02em'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      color: 'var(--connect-gray)'
    }
  }, /*#__PURE__*/React.createElement("span", null, a), /*#__PURE__*/React.createElement("span", null, ang), /*#__PURE__*/React.createElement("span", null, b))))))));
}
Object.assign(window, {
  ColorsBasics,
  ColorPalette,
  ColorGradient
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/connect-foundations/ColorScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/connect-foundations/Shell.jsx
try { (() => {
const {
  Banner,
  DesignNote
} = window.ConnectDesignSystem_a5c051;
const PAGES = [{
  id: 'basics',
  eyebrow: 'ui kit',
  title: 'Colors → Basics'
}, {
  id: 'palette',
  eyebrow: 'paleta colores ui',
  title: 'Colors → Palette'
}, {
  id: 'gradient',
  eyebrow: 'gradients',
  title: 'Colors → Gradient'
}, {
  id: 'type',
  eyebrow: 'tipografía',
  title: 'Fonts'
}, {
  id: 'spacing',
  eyebrow: 'layout',
  title: 'Spacing & Grids'
}, {
  id: 'effects',
  eyebrow: 'efectos',
  title: 'Drop Shadows & Blurs'
}, {
  id: 'icons',
  eyebrow: 'iconos',
  title: 'Icons'
}];
function SideNote({
  status,
  statusColor,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 300,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      borderRadius: 4,
      background: statusColor || 'var(--doc-status-bg)',
      padding: '16px 12px',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 0.9,
      letterSpacing: '0.04em',
      color: '#fff',
      textTransform: 'uppercase'
    }
  }, status)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "cx-h3",
    style: {
      color: 'var(--text-title)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "cx-body",
    style: {
      color: 'var(--text-title)',
      whiteSpace: 'pre-line'
    }
  }, children)));
}
function Nav({
  page,
  setPage
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 5,
      display: 'flex',
      gap: 2,
      padding: '10px 48px',
      background: 'var(--neutral-900)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      flexWrap: 'wrap'
    }
  }, PAGES.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => setPage(p.id),
    style: {
      appearance: 'none',
      border: 0,
      cursor: 'pointer',
      borderRadius: 4,
      padding: '8px 12px',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      background: page === p.id ? 'var(--cyan-600)' : 'transparent',
      color: page === p.id ? 'var(--connect-navy)' : 'rgba(255,255,255,0.65)'
    }
  }, p.id)));
}
function Page({
  id,
  children
}) {
  const meta = PAGES.find(p => p.id === id);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--neutral-50)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    eyebrow: meta.eyebrow,
    title: meta.title
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 106,
      padding: '60px 48px 96px'
    }
  }, children));
}
Object.assign(window, {
  PAGES,
  SideNote,
  Nav,
  Page
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/connect-foundations/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/connect-foundations/SystemScreens.jsx
try { (() => {
const {
  ShadowCard,
  Spacer,
  ContainerSpacer,
  SpacingRow,
  Icon,
  Logo,
  Isotype
} = window.ConnectDesignSystem_a5c051;
const SPEC = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 24,
  marginBottom: 16
};
const META = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: '0.08em',
  color: 'var(--connect-gray)',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap'
};
const GROUP = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: '0.08em',
  color: 'var(--text-title)',
  textTransform: 'uppercase',
  marginBottom: 20,
  display: 'block'
};
function Specimen({
  cls,
  label,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: SPEC
  }, /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: {
      color: 'var(--text-title)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: META
  }, meta));
}
function TypographyScreen() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "type"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "TIPOGRAF\xCDA",
    title: "Poppins"
  }, 'Poppins es la familia tipográfica principal de Connect. Su estructura es geométrica y aporta modernidad y tecnología, ideal para ecosistemas digitales.\n\nIBM Plex Mono acompaña al ecosistema digital. Ilustra la relación única entre el ser humano y la máquina.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 28,
      marginBottom: 18
    }
  }, ['SIZE', 'LINE HEIGHT', 'LETTER SPACING', 'WEIGHT'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: META
  }, t))), /*#__PURE__*/React.createElement("span", {
    style: {
      ...GROUP,
      color: 'var(--cyan-600)'
    }
  }, "headings"), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-title-hero",
    label: "Title Hero",
    meta: "64PX \xB7 120% \xB7 -3,5% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-h1",
    label: "Heading 1",
    meta: "40PX \xB7 120% \xB7 -2% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-h2",
    label: "Heading 2",
    meta: "32PX \xB7 120% \xB7 -1% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-h3",
    label: "Heading 3",
    meta: "28PX \xB7 120% \xB7 0% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-h4",
    label: "Heading 4",
    meta: "20PX \xB7 120% \xB7 0% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...GROUP,
      marginTop: 40
    }
  }, "sub"), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-subtitle",
    label: "Subtitle",
    meta: "32PX \xB7 120% \xB7 MEDIUM"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-subheading",
    label: "Subheading",
    meta: "28PX \xB7 120% \xB7 MEDIUM"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...GROUP,
      marginTop: 40
    }
  }, "body"), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body",
    label: "Body Base",
    meta: "14PX \xB7 140% \xB7 0% \xB7 REGULAR"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body-strong",
    label: "Body Strong",
    meta: "14PX \xB7 140% \xB7 SEMIBOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body-emphasis",
    label: "Body Emphasis",
    meta: "14PX \xB7 140% \xB7 MEDIUM ITALIC"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body-link",
    label: "Body Link",
    meta: "14PX \xB7 140% \xB7 REGULAR"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body-small",
    label: "Body Small",
    meta: "12PX \xB7 140% \xB7 REGULAR"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-body-small-strong",
    label: "Body Small Strong",
    meta: "12PX \xB7 140% \xB7 SEMIBOLD"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...GROUP,
      marginTop: 40
    }
  }, "captions"), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-caption",
    label: "Caption base",
    meta: "12PX \xB7 140% \xB7 +8% \xB7 SEMIBOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-caption-small",
    label: "Caption small",
    meta: "10PX \xB7 140% \xB7 +12% \xB7 SEMIBOLD"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...GROUP,
      marginTop: 40
    }
  }, "actions"), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-button-large",
    label: "Button large",
    meta: "14PX \xB7 140% \xB7 +4% \xB7 BOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-button-small",
    label: "Button small",
    meta: "12PX \xB7 140% \xB7 +6% \xB7 SEMIBOLD"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-link",
    label: "Link",
    meta: "14PX \xB7 140% \xB7 +6% \xB7 MEDIUM"
  }), /*#__PURE__*/React.createElement(Specimen, {
    cls: "cx-link-small",
    label: "Link small",
    meta: "12PX \xB7 140% \xB7 +6% \xB7 MEDIUM"
  })));
}
const STEPS = [['01', '0.25rem', '4px'], ['02', '0.5rem', '8px'], ['03', '0.75rem', '12px'], ['04', '1rem', '16px'], ['05', '1.25rem', '20px'], ['06', '1.5rem', '24px'], ['08', '2rem', '32px'], ['10', '2.5rem', '40px'], ['12', '3rem', '48px'], ['16', '4rem', '64px'], ['20', '5rem', '80px'], ['24', '6rem', '96px'], ['32', '8rem', '128px'], ['40', '10rem', '160px'], ['48', '12rem', '192px'], ['56', '14rem', '224px'], ['64', '16rem', '256px']];
const GRIDS = [['Desktop 1,280px', 1280, 12, 32, 1216], ['Tablet 768px', 768, 8, 32, 704], ['iPhone 375px', 375, 4, 16, 343]];
function SpacingScreen() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "spacing"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "LAYOUT",
    title: "Spacing & Grids"
  }, 'La escala de espaciado avanza en múltiplos de 4px (17 pasos, de 4px a 256px).\n\nLos grids se definen en tres breakpoints: 12 columnas en desktop, 8 en tablet y 4 en móvil.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "spacing scale"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 64,
      marginBottom: 56,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      marginBottom: 16
    }
  }, ['01', '02', '03', '04', '05', '06', '08', '10', '12'].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      marginRight: 24
    }
  }, /*#__PURE__*/React.createElement(Spacer, {
    size: s
  })))), STEPS.slice(0, 9).map(([s, r, p]) => /*#__PURE__*/React.createElement(SpacingRow, {
    key: s,
    step: s,
    rem: r,
    px: p
  }))), /*#__PURE__*/React.createElement("div", null, STEPS.slice(9).map(([s, r, p]) => /*#__PURE__*/React.createElement(SpacingRow, {
    key: s,
    step: s,
    rem: r,
    px: p
  })))), /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "containers"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 56
    }
  }, ['sm - 640px', 'md - 768px', 'lg - 1024px', 'xl - 1280px'].map(s => /*#__PURE__*/React.createElement(ContainerSpacer, {
    key: s,
    size: s,
    style: {
      maxWidth: '100%'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "grids"), GRIDS.map(([label, w, cols, gutter, content]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "cx-h4",
    style: {
      color: 'var(--text-title)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: META
  }, cols, " COL \xB7 ", gutter, "PX GUTTER \xB7 ", content.toLocaleString('en-US'), "PX CONTENT")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: gutter / 2,
      background: 'var(--neutral-100)',
      padding: gutter / 2,
      borderRadius: 8
    }
  }, Array.from({
    length: cols
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: 56,
      background: 'var(--doc-spacer-fill)'
    }
  })))))));
}
function EffectsScreen() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "effects"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "EFECTOS",
    statusColor: "#55617A",
    title: "Drop Shadows"
  }, 'Las sombras permiten agregar profundidad y realismo a los diseños, posicionando los elementos en el eje Z.\n\nLos desenfoques de fondo se utilizan con fines estéticos, y al igual que las sombras sitúan los elementos en el eje Z.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "drop shadows"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      marginBottom: 56,
      flexWrap: 'wrap'
    }
  }, ['xs', 'sm', 'md', 'lg', 'xl'].map(l => /*#__PURE__*/React.createElement(ShadowCard, {
    key: l,
    level: l,
    style: {
      width: 200,
      height: 180
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "blurs"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 1024,
      aspectRatio: '4 / 3',
      background: 'url(../../assets/images/blur-sample.png) center/cover',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'repeat(4,1fr)',
      gap: '18px 59px',
      padding: '74px 66px',
      boxSizing: 'border-box',
      borderRadius: 12
    }
  }, ['sm', 'sm', 'md', 'md', 'lg', 'lg', 'xl', 'xl'].map((size, i) => {
    const dark = i % 2 === 1;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: 12,
        background: dark ? 'var(--glass-dark)' : 'var(--glass-light)',
        backdropFilter: `var(--blur-${size})`,
        WebkitBackdropFilter: `var(--blur-${size})`,
        boxShadow: dark ? 'var(--glass-dark-hairline)' : 'var(--glass-light-hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-ui)',
        fontWeight: 500,
        fontSize: 30,
        lineHeight: '38px',
        color: dark ? '#fff' : '#171717'
      }
    }, size, " ", dark ? 'dark' : 'light');
  }))));
}
const ICONS = ['truck', 'shield-check', 'wrench', 'brain-circuit', 'users', 'layout-dashboard', 'map-pin', 'bell', 'settings', 'search', 'chart-line', 'circle-alert', 'calendar', 'file-text', 'fuel', 'gauge', 'clipboard-check', 'headset', 'route', 'battery-charging', 'hard-hat', 'box', 'building-2', 'credit-card', 'phone', 'mail', 'download', 'filter', 'pencil', 'trash-2', 'lock', 'plus'];
function IconsScreen() {
  return /*#__PURE__*/React.createElement(Page, {
    id: "icons"
  }, /*#__PURE__*/React.createElement(SideNote, {
    status: "ICONOS",
    title: "Sistema de \xEDconos"
  }, 'El sistema de íconos está basado en Lucide, una colección de código abierto. Cada icono está diseñado en una cuadrícula de 24x24, haciendo hincapié en la sencillez, coherencia y legibilidad.\n\nGeometría redondeada: terminaciones redondeadas, coherentes con el Design System.\n\nColor: Navy o Gris por defecto.'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "lucide \xB7 24\xD724"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8,1fr)',
      gap: 28,
      color: 'var(--connect-navy)',
      marginBottom: 56
    }
  }, ICONS.map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n,
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-primary)',
      fontSize: 10,
      color: 'var(--connect-gray)',
      textAlign: 'center'
    }
  }, n)))), /*#__PURE__*/React.createElement("span", {
    style: GROUP
  }, "identidad de marca"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      alignItems: 'center',
      flexWrap: 'wrap',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    lockup: "connect",
    size: 36
  }), /*#__PURE__*/React.createElement(Logo, {
    lockup: "divemotor",
    size: 40
  }), /*#__PURE__*/React.createElement(Logo, {
    lockup: "ai",
    size: 36
  }), /*#__PURE__*/React.createElement(Isotype, {
    size: 56
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-surface)',
      borderRadius: 16,
      padding: 48,
      display: 'flex',
      gap: 48,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    lockup: "connect",
    darkMode: true,
    size: 36
  }), /*#__PURE__*/React.createElement(Isotype, {
    darkMode: true,
    size: 56
  }), /*#__PURE__*/React.createElement(Isotype, {
    variant: "negative",
    size: 56
  }))));
}
Object.assign(window, {
  TypographyScreen,
  SpacingScreen,
  EffectsScreen,
  IconsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/connect-foundations/SystemScreens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.BUTTON_SIZES = __ds_scope.BUTTON_SIZES;

__ds_ns.ButtonBase = __ds_scope.ButtonBase;

__ds_ns.Circle = __ds_scope.Circle;

__ds_ns.Dot = __ds_scope.Dot;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Isotype = __ds_scope.Isotype;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Container = __ds_scope.Container;

__ds_ns.ContainerSpacer = __ds_scope.ContainerSpacer;

__ds_ns.DesignNote = __ds_scope.DesignNote;

__ds_ns.MeasureLine = __ds_scope.MeasureLine;

__ds_ns.MeasureLineBase = __ds_scope.MeasureLineBase;

__ds_ns.ShadowCard = __ds_scope.ShadowCard;

__ds_ns.SPACER_STEPS = __ds_scope.SPACER_STEPS;

__ds_ns.Spacer = __ds_scope.Spacer;

__ds_ns.SpacingRow = __ds_scope.SpacingRow;

__ds_ns.Icon = __ds_scope.Icon;

})();
