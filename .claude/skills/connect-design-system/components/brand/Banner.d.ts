import * as React from 'react';

/**
 * Navy page banner used at the top of every Connect spec page.
 */
export interface BannerProps {
  /** Mono uppercase cyan eyebrow, e.g. "foundations". */
  eyebrow?: string;
  /** Poppins 40px title, e.g. "Colors → Basics". */
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
export declare function Banner(props: BannerProps): JSX.Element;
export default Banner;
