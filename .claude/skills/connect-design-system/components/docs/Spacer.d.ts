import * as React from 'react';
export interface SpacerProps {
  /** Figma "Size" axis — the 17 steps, NN × 4px. */
  size?: '01'|'02'|'03'|'04'|'05'|'06'|'08'|'10'|'12'|'16'|'20'|'24'|'32'|'40'|'48'|'56'|'64';
  /** Figma "Direction" axis. */
  direction?: 'x-axis' | 'y-axis';
  /** Hide the px caption for a bare gap. */
  showLabel?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
export declare function Spacer(props: SpacerProps): JSX.Element;
export declare const SPACER_STEPS: Record<string, number>;
export default Spacer;
