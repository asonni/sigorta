import React from 'react';
import moment from 'moment';
import { DateTimePicker } from 'react-widgets';
import { FormGroup, Label } from 'reactstrap';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en');
momentLocalizer();

const renderDateTimePickerField = field => {
  const {
    label,
    dropUp,
    showTime,
    placeholder,
    meta: { touched, error },
    input: { onChange, value }
  } = field;
  // const valid = touched && error ? false : null;
  return (
    <FormGroup>
      <Label>{label}</Label>
      <DateTimePicker
        dropUp={dropUp}
        onChange={onChange}
        value={!value ? null : new Date(value)}
        placeholder={placeholder}
        format="YYYY-MM-DD"
        time={showTime}
      />
      <p className="text-danger">{touched ? error : ''}</p>
    </FormGroup>
  );
};

export { renderDateTimePickerField };
