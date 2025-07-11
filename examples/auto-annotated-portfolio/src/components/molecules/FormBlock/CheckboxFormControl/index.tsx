import classNames from 'classnames';

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
      className={classNames('flex items-center sm:text-xl', {
        'sm:col-span-2': width === 'full',
      })}
    >
      <input
        id={name}
        className="peer absolute h-[1.5em] w-[1.5em] appearance-none opacity-0 select-none"
        type="checkbox"
        name={name}
        {...attr}
      />
      {label && (
        <label
          id={labelId}
          className="relative cursor-pointer pl-[2.25em] before:absolute before:top-1/2 before:left-0 before:h-[1.5em] before:w-[1.5em] before:-translate-y-1/2 before:border before:border-current before:text-center before:font-sans before:content-[''] peer-checked:before:content-['\2713']"
          htmlFor={name}
        >
          {label}
        </label>
      )}
    </div>
  );
}
