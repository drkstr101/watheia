import classNames from 'clsx';
import { iconMap } from '../../svgs';
import Link from '../Link';

export default function Social(props) {
  const { elementId, className, altText, url, icon = 'facebook' } = props;
  const IconComponent = iconMap[icon];
  const fieldPath = props['data-sb-field-path'];
  const annotations = fieldPath
    ? {
        'data-sb-field-path': [
          fieldPath,
          `${fieldPath}.url#@href`,
          `${fieldPath}.altText#@aria-label`,
          `${fieldPath}.elementId#@id`,
        ]
          .join(' ')
          .trim(),
      }
    : {};

  return (
    <Link
      id={elementId}
      className={classNames(
        'sb-component',
        'sb-component-block',
        'sb-component-social',
        'inline-flex',
        'items-center',
        'justify-center',
        'transition',
        'duration-200',
        'ease-in',
        'hover:-translate-y-1',
        className
      )}
      href={url}
      aria-label={altText}
      {...annotations}
    >
      {IconComponent && (
        <IconComponent
          className="h-[1em] w-[1em] shrink-0 fill-current"
          data-sb-field-path=".icon"
        />
      )}
    </Link>
  );
}
