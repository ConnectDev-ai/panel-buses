import * as React from 'react';

/**
 * The Connect button — the file's largest component set (528 variants).
 */
export interface ButtonProps {
  /** Figma "Size" axis. sm 8/14 · md 10/16 · lg 10/18 · xl 12/20. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Figma "Hierarchy" axis. */
  hierarchy?: 'primary' | 'secondary color' | 'secondary gray' | 'tertiary color' | 'tertiary gray' | 'link color' | 'link gray';
  /** Figma "Icon" axis. */
  icon?: 'false' | 'leading' | 'trailing' | 'dot' | 'only';
  /** Force a Figma "State" for specimens. Omitted = live hover/focus. */
  state?: 'default' | 'hover' | 'focused' | 'disabled';
  children?: React.ReactNode;
  /** Replaces the default Circle / Dot glyph. */
  iconNode?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  className?: string;
}
export declare function Button(props: ButtonProps): JSX.Element;
export default Button;
