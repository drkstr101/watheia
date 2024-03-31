import classNames from 'clsx';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';

export default function Badge(props) {
  const { label, color = 'text-primary-500', styles, className } = props;
  if (!label) {
    return null;
  }

  return (
    <div
      className={classNames(
        'sb-component',
        'sb-component-block',
        'sb-component-badge',
        color,
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
