import React from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Aux } from './hoc';

const renderSelectField = field => {
  const { label, input, items, multiple, meta: { touched, error } } = field;
  const valid = touched && error ? false : null;
  const renderItems = () => {
    return items.map((item, index) => (
      <option value={item._id} key={index}>
        <Aux>{`Name: ${item.fname} ${item.lname}, Email: ${item.email}`}</Aux>
      </option>
    ));
  };
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type="select"
        {...input}
        valid={valid}
        multiple={multiple || false}
      >
        <option value="" defaultValue disabled>
          -- Please Select --
        </option>
        {renderItems()}
      </Input>
      <FormFeedback>{touched ? error : ''}</FormFeedback>
    </FormGroup>
  );
};

export { renderSelectField };
