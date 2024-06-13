import classNames from 'clsx';
import { Annotated } from '../../Annotated';
import { iconMap } from '../../svgs';
import Link from '../Link';

export default function Social(props) {
  const { elementId, className, label, altText, url, icon = 'facebook' } = props;
  const IconComponent = iconMap[icon];

  return (
    <Annotated content={props}>
      <Link
        href={url}
        aria-label={altText}
        id={elementId || null}
        className={classNames(
          'sb-component',
          'sb-component-block',
          'sb-component-social',
          className
        )}
      >
        {label && <span className="sr-only">{label}</span>}
        {IconComponent && <IconComponent className="h-5 w-5 fill-current" />}
      </Link>
    </Annotated>
  );
}
