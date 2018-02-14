import React from 'react';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';

const renderSelectFieldV2 = field => {
  const {
    label,
    input,
    options,
    placeholder,
    meta: { touched, error }
  } = field;
  // const valid = touched && error ? false : null;
  return (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        {...input}
        options={options}
        placeholder={placeholder}
        autoBlur
        clearable={false}
        searchable={false}
      />
      <p className="text-danger">{touched ? error : ''}</p>
    </FormGroup>
  );
};

export { renderSelectFieldV2 };
