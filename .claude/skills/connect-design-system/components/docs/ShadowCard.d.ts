import * as React from 'react';
export interface ShadowCardProps {
  /** Elevation step from the Drop Shadows page. */
  level?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Label shown when no children are given. Defaults to "shadow-<level>". */
  label?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
/** The 256×240 elevation specimen card — and the canonical Connect card shape. */
export declare function ShadowCard(props: ShadowCardProps): JSX.Element;
export default ShadowCard;
