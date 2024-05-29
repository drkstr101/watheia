import { Annotated } from '../../Annotated';
import classNames from 'clsx';
import { iconMap } from '../../svgs';
import Link from '../Link';

export default function Action(props) {
  const {
    type,
    elementId,
    className,
    label,
    altText,
    url,
    showIcon,
    icon,
    iconPosition = 'right',
    style = 'primary',
  } = props;
  const IconComponent = icon ? iconMap[icon] : null;
  return (
    <Annotated content={props}>
      <Link
        href={url}
        aria-label={altText}
        id={elementId || null}
        className={classNames(
          'sb-component',
          'sb-component-block',
          type === 'Button' ? 'sb-component-button' : 'sb-component-link',
          {
            'sb-component-button-primary': type === 'Button' && style === 'primary',
            'sb-component-button-secondary': type === 'Button' && style === 'secondary',
            'sb-component-button-icon': type === 'Button' && !label,
          },
          className
        )}
      >
        {label && <span>{label}</span>}
        {showIcon && IconComponent && (
          <IconComponent
            className={classNames('h-5 w-5 fill-current', {
              'order-first': iconPosition === 'left',
              'mr-1.5': label && iconPosition === 'left',
              'ml-1.5': label && iconPosition === 'right',
            })}
          />
        )}
      </Link>
    </Annotated>
  );
}
