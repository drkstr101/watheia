import clsx from 'clsx';
import { HtmlHTMLAttributes } from 'react';

import styles from './container.module.css';

export interface ContainerProps<T extends React.ElementType>
  extends HtmlHTMLAttributes<HTMLDivElement> {
  as?: T;
}

export function Container<T extends React.ElementType = 'div'>({
  as,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>> & ContainerProps<T>) {
  const Component = as ?? 'div';

  return (
    <Component className={clsx(styles.outer, className)} {...props}>
      <div className={styles.inner}>{children}</div>
    </Component>
  );
}

export default Container;
