import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import classNames from 'clsx';

export default function BackgroundImage(props) {
  const { url, className, backgroundSize, backgroundPosition, backgroundRepeat, opacity } = props;
  if (!url) {
    return null;
  }
  return (
    <div
      className={classNames(
        'fixed',
        'inset-0',
        mapStyles({
          backgroundSize: backgroundSize ?? 'cover',
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
