import classNames from 'classnames';

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
    <div className={classNames({ 'sm:col-span-2': width === 'full' })}>
      {label && (
        <label
          id={labelId}
          className={classNames('mb-1 inline-block sm:text-xl', { 'sr-only': hideLabel })}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        className="w-full border border-current bg-transparent p-3 placeholder:text-current placeholder:opacity-50 focus:ring-1 focus:ring-current focus:outline-none sm:text-xl"
        name={name}
        rows="5"
        {...attr}
      />
    </div>
  );
}
