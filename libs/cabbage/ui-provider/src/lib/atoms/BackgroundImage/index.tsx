import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { types } from '@watheia/content-model';
import classNames from 'clsx';
import { HtmlHTMLAttributes } from 'react';

export type BackgroundImageProps = types.BackgroundImage & HtmlHTMLAttributes<HTMLDivElement>;

export default function BackgroundImage(props: BackgroundImageProps) {
  const { url, className, backgroundSize, backgroundPosition, backgroundRepeat, opacity } = props;
  if (!url) {
    return null;
  }
  return (
    <div
      className={classNames(
        mapStyles({
          backgroundSize: backgroundSize ?? 'auto',
          backgroundPosition: backgroundPosition ?? 'center',
          backgroundRepeat: backgroundRepeat ?? 'no-repeat',
        }),
        className
      )}
      style={{
        backgroundImage: `url('${url}')`,
        opacity: (opacity ?? 100) * 0.01,
      }}
    />
  );
}
