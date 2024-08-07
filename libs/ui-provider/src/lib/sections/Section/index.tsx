import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import classNames from 'clsx';
import * as React from 'react';

export type SectionProps = React.PropsWithChildren<{
  type?: string;
  elementId?: string;
  colors?: 'colors-a' | 'colors-b' | 'colors-c' | 'colors-d' | 'colors-e' | 'colors-f';
  backgroundSize?: 'full' | 'inset';
  styles?: any;
}>;

export default function Section(props: SectionProps) {
  const { backgroundSize = 'full', ...rest } = props;
  if (backgroundSize === 'inset') {
    return <SectionInset {...rest} />;
  } else {
    return <SectionFullWidth {...rest} />;
  }
}

function SectionInset(props: SectionProps) {
  const { type, elementId, colors = 'colors-f', styles = {}, children } = props;
  const classSuffix = type && type.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return (
    <div
      id={elementId}
      className={classNames(
        'wa-component',
        'wa-section',
        classSuffix && `wa-${classSuffix}`,
        'flex',
        mapStyles({ justifyContent: styles.justifyContent ?? 'center' }),
        styles.margin
      )}
    >
      <div
        className={classNames(
          colors,
          'flex',
          'flex-col',
          'justify-center',
          'relative',
          'w-full',
          mapStyles({ width: styles.width ?? 'wide' }),
          mapStyles({ height: styles.height ?? 'auto' }),
          styles.padding ?? 'px-4 py-12',
          styles.borderColor,
          styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
          styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null
        )}
        style={{
          borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
        }}
      >
        <div className="relative w-full">{children}</div>
      </div>
    </div>
  );
}

function SectionFullWidth(props: SectionProps) {
  const { type, elementId, colors = 'colors-f', styles = {}, children } = props;
  const classSuffix = type && type.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return (
    <div
      id={elementId}
      className={classNames(
        'wa-component',
        'wa-section',
        classSuffix && `wa-${classSuffix}`,
        colors,
        'flex',
        'flex-col',
        'justify-center',
        mapStyles({ height: styles.height ?? 'auto' }),
        styles.margin,
        styles.padding ?? 'px-4 py-12',
        styles.borderColor,
        styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
        styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null
      )}
      style={{
        borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
      }}
    >
      <div
        className={classNames(
          'flex',
          'w-full',
          mapStyles({ justifyContent: styles.justifyContent ?? 'center' })
        )}
      >
        <div
          className={classNames(
            'relative',
            'w-full',
            mapStyles({ width: styles.width ?? 'wide' })
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
