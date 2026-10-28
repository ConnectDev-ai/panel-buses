import * as React from 'react';

/**
 * The Connect logotipo — isotype plus wordmark.
 */
export interface LogoProps {
  /** Figma "Dark Mode" axis — true = the cut for dark surfaces. */
  darkMode?: boolean;
  /** Which lockup from the Logos page. */
  lockup?: 'connect' | 'divemotor' | 'ai' | 'wordmark';
  /** Rendered height in px. */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}
export declare function Logo(props: LogoProps): JSX.Element;
export default Logo;
