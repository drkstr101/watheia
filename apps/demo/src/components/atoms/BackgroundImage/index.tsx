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
