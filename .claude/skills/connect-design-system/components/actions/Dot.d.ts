import * as React from 'react';
export interface DotProps {
  /** Figma "Size" axis. */
  size?: 'sm' | 'md' | 'lg';
  /** Fill of the dot. Figma default is the green status dot rgb(34,197,94). */
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}
/** Status dot used by Button's Icon=Dot variant. */
export declare function Dot(props: DotProps): JSX.Element;
export default Dot;
