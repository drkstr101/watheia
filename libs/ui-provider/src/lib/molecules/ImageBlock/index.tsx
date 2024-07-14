import classNames from 'clsx';

import { Annotated } from '../../Annotated';

export default function ImageBlock(props) {
  const { elementId, className, url, altText = '' } = props;
  if (!url) {
    return null;
  }

  return (
    <Annotated content={props}>
      <img
        id={elementId || null}
        className={classNames('wa-component', 'wa-block', 'wa-image-block', className)}
        src={url}
        alt={altText}
      />
    </Annotated>
  );
}
