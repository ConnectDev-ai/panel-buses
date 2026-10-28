import * as React from 'react';
export interface CircleProps {
  /** Box size in px. Figma default 24. */
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}
/** The 20px hairline ring used as the default icon slot inside Button. */
export declare function Circle(props: CircleProps): JSX.Element;
export default Circle;
