const validate = values => {
  const errors = {};
  const { name, discount, user } = values;

  if (!name) {
    errors.name = 'Please type the client name';
  } else if (name.length < 3) {
    errors.name = 'Clinet name must be at least 3 character';
  }

  if (!discount) {
    errors.discount = 'Please type a discount number';
  } else if (!Number(discount)) {
    errors.discount = 'Please type a discount number in digits only';
  } else if (Number(discount) > 100) {
    errors.discount = 'The max value of discount should be 100';
  }

  if (!user) {
    errors.user = 'Please select any user info';
  }
  return errors;
};

export default validate;
