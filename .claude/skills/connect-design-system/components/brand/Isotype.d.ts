import * as React from 'react';
export interface IsotypeProps {
  /** Figma "Dark mode" axis — true = the mark tuned for dark surfaces. */
  darkMode?: boolean;
  /** Overrides darkMode with a specific export from the brand page. */
  variant?: 'false' | 'true' | 'negative' | 'positive';
  /** Rendered height in px. */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}
/** The Connect isotype (orbital mark) on its own, without the wordmark. */
export declare function Isotype(props: IsotypeProps): JSX.Element;
export default Isotype;
