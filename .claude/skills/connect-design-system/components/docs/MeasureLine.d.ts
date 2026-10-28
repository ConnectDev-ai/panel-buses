import * as React from 'react';
export interface MeasureLineProps {
  /** Figma "Number position" axis — where the px label sits. */
  numberPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Measured distance in px; also the default label. */
  length?: number;
  /** Overrides the "<length>px" caption. */
  label?: string;
  style?: React.CSSProperties;
  className?: string;
}
/** Labelled red dimension annotation used to call out spacing on spec pages. */
export declare function MeasureLine(props: MeasureLineProps): JSX.Element;
export default MeasureLine;
