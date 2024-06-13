import classNames from 'clsx';

import { getDataAttrs, mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';

export default function DividerSection(props) {
  const { elementId, styles = {} } = props;
  return (
    <div
      id={elementId || null}
      {...getDataAttrs(props)}
      className={classNames(
        'sb-component',
        'sb-component-section',
        'sb-component-divider-section',
        'w-full',
        'flex',
        mapStyles({ justifyContent: styles.self?.justifyContent ?? 'center' }),
        styles.self?.padding ?? 'px-4 py-12'
      )}
    >
      <div
        className={classNames(
          'h-0',
          'w-full',
          mapStyles({ width: styles.self?.width ?? 'wide' }),
          'border-t',
          'border-current',
          mapStyles({ borderStyle: styles.self?.borderStyle ?? 'solid' })
        )}
        style={{
          borderTopWidth: styles.self?.borderWidth ? `${styles.self?.borderWidth}px` : '1px',
        }}
      ></div>
    </div>
  );
}
