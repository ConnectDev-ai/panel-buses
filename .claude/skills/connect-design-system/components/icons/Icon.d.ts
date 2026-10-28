import * as React from 'react';
export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "truck", "shield-check", "arrow-right". */
  name?: string;
  /** Rendered box in px. The Figma grid is 24. */
  size?: number;
  /** Stroke colour. Navy or Gray by default, per the file's icon page. */
  color?: string;
  /** Lucide's own default is 2. */
  strokeWidth?: number;
  /** Accessible label; omit for decorative icons. */
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}
/** Lucide glyph wrapper — Connect's icon system. */
export declare function Icon(props: IconProps): JSX.Element;
export default Icon;
