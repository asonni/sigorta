const validate = values => {
  const errors = {};
  const { dateType, from, to } = values;

  if (!dateType) {
    errors.dateType = 'Please select any report type';
  }

  if (!from) {
    errors.from = 'Please select any date from';
  }

  if (!to) {
    errors.to = 'Please select any date to';
  }

  return errors;
};

export default validate;
