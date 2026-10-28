import * as React from 'react';
export interface ContainerSpacerProps {
  /** Figma "Size" axis — the four container widths. */
  size?: 'sm - 640px' | 'md - 768px' | 'lg - 1024px' | 'xl - 1280px';
  style?: React.CSSProperties;
  className?: string;
}
/** Breakpoint-width band used to annotate the Grids page. */
export declare function ContainerSpacer(props: ContainerSpacerProps): JSX.Element;
export default ContainerSpacer;
