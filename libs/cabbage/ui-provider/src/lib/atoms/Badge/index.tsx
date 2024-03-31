import classNames from 'clsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';

import defaultTheme from './badge.module.css';

export default function Badge(props) {
  const { label, color = 'primary', styles, className } = props;
  if (!label) {
    return null;
  }

  return (
    <div
      className={classNames(
        'sb-component',
        'sb-component-block',
        'sb-component-badge',
        defaultTheme[color],
        className,
        styles?.self ? mapStyles(styles?.self) : undefined
      )}
      data-sb-field-path={props['data-sb-field-path']}
    >
      <span className="uppercase tracking-wider" data-sb-field-path=".label">
        {label}
      </span>
    </div>
  );
}
