import React from 'react';
import { DropdownList } from 'react-widgets';
import { FormGroup, Label } from 'reactstrap';

const DropdownListField = field => {
  const {
    label,
    input,
    options,
    placeholder,
    itemComponent,
    valueField,
    textField,
    meta: { touched, error }
  } = field;
  // const valid = touched && error ? false : null;
  return (
    <FormGroup>
      <Label>{label}</Label>
      <DropdownList
        {...input}
        data={options}
        valueField={valueField || 'value'}
        textField={textField || 'label'}
        placeholder={placeholder}
        itemComponent={itemComponent}
      />
      <p className="text-danger">{touched ? error : ''}</p>
    </FormGroup>
  );
};

export { DropdownListField };
