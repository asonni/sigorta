import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Aux } from './hoc';

const renderInputField = field => {
  const {
    label,
    type,
    placeholder,
    id,
    input,
    meta: { touched, error }
  } = field;
  const valid = touched && error ? false : null;
  return (
    <Aux>
      {label ? (
        <FormGroup>
          <Label>{label}</Label>
          <div id={id}>
            <Input
              type={type}
              valid={valid}
              placeholder={placeholder}
              {...input}
            />
            <FormFeedback>{touched ? error : ''}</FormFeedback>
          </div>
        </FormGroup>
      ) : (
        <Aux>
          <Input type={type} placeholder={placeholder} {...input} />
          <FormFeedback>{touched ? error : ''}</FormFeedback>
        </Aux>
      )}
    </Aux>
  );
};

export { renderInputField };
