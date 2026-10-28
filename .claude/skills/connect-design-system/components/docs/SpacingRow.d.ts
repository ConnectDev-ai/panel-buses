import * as React from 'react';
export interface SpacingRowProps {
  /** Step number, e.g. "1". */
  step?: string;
  /** rem value, e.g. "0.25rem". */
  rem?: string;
  /** px value, e.g. "4px". */
  px?: string;
  style?: React.CSSProperties;
  className?: string;
}
/** One row of the spacing table: step · rem · px. */
export declare function SpacingRow(props: SpacingRowProps): JSX.Element;
export default SpacingRow;
