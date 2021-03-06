import React, { HTMLAttributes } from 'react';
import classNames from 'clsx';
import styles from './themed-text.module.scss';

export type ThemedTextProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Text colored with the current base color.
 *
 * using css variable:
 * -   --wa-accent-color
 * @name ThemedText
 */
export function ThemedText(props: ThemedTextProps) {
  return (
    <span
      {...props}
      className={classNames(props.className, styles['themedText'])}
      data-bit-id="base-ui.text/themed-text"
    />
  );
}

/**
 * Same component as a pure-css class.
 * @name themedText
 */
export const themedText = styles['themedText'];
