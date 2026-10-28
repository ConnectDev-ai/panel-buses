import * as React from 'react';
export interface ButtonBaseProps {
  /** Figma "Size" axis — drives padding and type size. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Figma "Icon" axis. */
  icon?: 'false' | 'leading' | 'trailing' | 'dot' | 'only';
  /** Label. */
  children?: React.ReactNode;
  /** Replaces the default Circle / Dot glyph. */
  iconNode?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
/** Unstyled geometry layer of Button — padding, gap, radius and label metrics only. Use Button unless you are building a new hierarchy. */
export declare function ButtonBase(props: ButtonBaseProps): JSX.Element;
export declare const BUTTON_SIZES: Record<'sm'|'md'|'lg'|'xl', { padding: string; iconOnly: number; fontSize: number; lineHeight: string }>;
export default ButtonBase;
