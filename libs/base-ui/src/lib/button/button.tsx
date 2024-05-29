import clsx from 'clsx';
import Link from 'next/link';

import styles from './button.module.css';

type ButtonProps = {
  color?: 'black' | 'white';
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
);

export function Button({ color = 'black', className, children, ...props }: ButtonProps) {
  className = clsx(styles.self, styles[color], className);

  const inner = <span className="relative top-px">{children}</span>;

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    );
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  );
}

export default Button;
