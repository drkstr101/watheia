import { HTMLAttributes } from 'react';
import classNames from 'clsx';
import { Theme } from '../../base-ui.theme/theme-provider';
import { Roboto } from '../../base-ui.theme/fonts/roboto';
import sizes from './sizes.module.scss';
import global from './global.module.scss'; // TODO - rename

export type ThemeDocumenterProps = HTMLAttributes<HTMLDivElement>;

export function ThemeDocumenter({ children, className, ...rest }: ThemeDocumenterProps) {
  return (
    <Theme {...rest} className={classNames(className, sizes['heading'], global['overrides'])}>
      <Roboto />
      {children}
    </Theme>
  );
}

/**
 * @deprecated
 */
export { ThemeDocumenter as ThemeContext };
