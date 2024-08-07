'use client';

import classNames from 'clsx';
import * as React from 'react';

import { mapStylesToClassNames as mapStyles } from '@watheia/content-helpers';
import { DynamicComponent } from '../../ui-provider';

export default function FormBlock(props) {
  const formRef = React.createRef<HTMLFormElement>();
  const {
    elementId,
    className,
    action,
    destination,
    fields = [],
    submitLabel,
    styles = {},
  } = props;

  if (fields.length === 0) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(formRef.current!);
    const value = Object.fromEntries(data.entries());
    alert(`Form data: ${JSON.stringify(value)}`);
  }

  return (
    <form
      className={classNames('wa-component', 'wa-block', 'wa-form-block', className)}
      name={elementId}
      id={elementId}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="grid sm:grid-cols-2 sm:gap-x-4">
        <input type="hidden" name="form-name" value={elementId} />
        {fields.map((field, index) => {
          return <DynamicComponent key={index} {...field} />;
        })}
      </div>
      <div
        className={classNames(
          'mt-4',
          styles.submitLabel?.textAlign
            ? mapStyles({ textAlign: styles.submitLabel?.textAlign })
            : null
        )}
      >
        <button type="submit" className="wa-component wa-block wa-button wa-button-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
