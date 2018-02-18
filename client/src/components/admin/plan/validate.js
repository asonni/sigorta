const validate = values => {
  const errors = {};
  const { name, price } = values;

  if (!name) {
    errors.name = 'Please type the plan name';
  } else if (name.length < 3) {
    errors.name = 'The plan name must be at least 3 character';
  }

  if (!price) {
    errors.price = 'Please type the plan price';
  } else if (!Number(price)) {
    errors.price = 'Please type the plan price in digits only';
  }

  return errors;
};

export default validate;
