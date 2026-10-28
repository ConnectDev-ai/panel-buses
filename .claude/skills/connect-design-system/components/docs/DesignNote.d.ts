import * as React from 'react';
export interface DesignNoteProps {
  /** Figma "Size" axis. md = 24/32 heading, sm = 18/28. */
  size?: 'sm' | 'md';
  heading?: string;
  /** Figma boolean — hides the body copy when false. */
  supportingText?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
/** Annotation block (heading + supporting copy) used across the spec pages. */
export declare function DesignNote(props: DesignNoteProps): JSX.Element;
export default DesignNote;
