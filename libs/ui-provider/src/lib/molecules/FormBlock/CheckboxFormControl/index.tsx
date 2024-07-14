import classNames from 'clsx';

export default function CheckboxFormControl(props) {
  const { name, label, isRequired, width = 'full' } = props;
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
      className={classNames('wa-form-control', 'flex', 'items-center', {
        'sm:col-span-2': width === 'full',
      })}
    >
      <input id={name} className="wa-checkbox" type="checkbox" name={name} {...attr} />
      {label && (
        <label id={labelId} className="wa-label" htmlFor={name}>
          {label}
        </label>
      )}
    </div>
  );
}
