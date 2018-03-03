import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const renderCheckboxField = field => {
  const { label, input, defaultChecked } = field;
  return (
    <FormGroup>
      {label}{' '}
      <Label className="switch switch-text switch-pill switch-success-outline-alt">
        {defaultChecked ? (
          <Input
            {...input}
            type="checkbox"
            className="switch-input"
            defaultChecked
          />
        ) : (
          <Input
            {...input}
            type="checkbox"
            className="switch-input"
            checked={input.value}
          />
        )}
        <span className="switch-label" data-on="On" data-off="Off" />
        <span className="switch-handle" />
      </Label>
    </FormGroup>
  );
};

export { renderCheckboxField };
