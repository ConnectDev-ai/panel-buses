import * as React from 'react';
export interface ContainerProps {
  /** Big centred caption, e.g. "Desktop 1,280px". */
  label?: string;
  width?: number;
  height?: number;
  /** Optional secondary line under the caption. */
  hint?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
/** The outlined breakpoint frame from the Grids page. */
export declare function Container(props: ContainerProps): JSX.Element;
export default Container;
