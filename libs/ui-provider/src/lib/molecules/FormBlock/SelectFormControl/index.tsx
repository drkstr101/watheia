import classNames from 'clsx';

export default function SelectFormControl(props) {
  const {
    name,
    label,
    hideLabel,
    defaultValue,
    options = [],
    isRequired,
    width = 'full',
  } = props;
  const labelId = `${name}-label`;
  const attr: any = {};
  if (label) {
    attr['aria-labelledby'] = labelId;
  }
  if (isRequired) {
    attr.required = true;
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
      <select id={name} className="wa-select" name={name} {...attr}>
        {defaultValue && <option value="">{defaultValue}</option>}
        {options.length > 0 &&
          options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
}
