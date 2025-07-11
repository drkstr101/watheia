import classNames from 'classnames';

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
      <select
        id={name}
        className="w-full border border-current bg-transparent py-3 pr-7 pl-3 placeholder:text-current placeholder:opacity-50 focus:ring-1 focus:ring-current focus:outline-none sm:text-xl"
        name={name}
        {...attr}
      >
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
