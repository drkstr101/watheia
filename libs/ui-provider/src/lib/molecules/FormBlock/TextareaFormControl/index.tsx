import classNames from 'clsx';

export default function TextareaFormControl(props) {
  const { name, label, hideLabel, placeholder, isRequired, width = 'full' } = props;
  const labelId = `${name}-label`;
  const attr: any = {};
  if (label) {
    attr['aria-labelledby'] = labelId;
  }
  if (isRequired) {
    attr.required = true;
  }
  if (placeholder) {
    attr.placeholder = placeholder;
  }
  return (
    <div
      className={classNames('wa-form-control', {
        'sm:col-span-2': width === 'full',
      })}
    >
      {label && (
        <label
          id={labelId}
          className={classNames('wa-label', { 'sr-only': hideLabel })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <textarea id={name} className="wa-textarea" name={name} rows="5" {...attr} />
    </div>
  );
}
