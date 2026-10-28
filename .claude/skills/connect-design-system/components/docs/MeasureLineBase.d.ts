import * as React from 'react';
export interface MeasureLineBaseProps {
  /** Figma "Type" axis. solid = continuous rule, spacer = dashed. */
  type?: 'solid' | 'spacer';
  /** Rule length in px. Figma default 80. */
  length?: number;
  /** Rotate the rule to measure a vertical distance. */
  vertical?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
/** The red dimension rule with end caps. Use MeasureLine for a labelled version. */
export declare function MeasureLineBase(props: MeasureLineBaseProps): JSX.Element;
export default MeasureLineBase;
