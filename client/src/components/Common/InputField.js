import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Aux } from './Hoc';

const InputField = field => {
  const { label, type, placeholder, input, meta: { touched, error } } = field;
  const valid = touched && error ? false : true;
  return (
    <Aux>
      {label ? (
        <FormGroup>
          <Label>{label}</Label>
          <Input
            type={type}
            valid={valid}
            placeholder={placeholder}
            {...input}
          />
          <FormFeedback>{touched ? error : ''}</FormFeedback>
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

export { InputField };
