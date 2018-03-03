const validate = values => {
  const errors = {};
  const { client, balance } = values;

  if (!client) {
    errors.client = 'Please select any client info';
  }

  if (!balance) {
    errors.balance = 'Please type the balance';
  } else if (!Number(balance)) {
    errors.balance = 'Please type the balance in digits only';
  }

  return errors;
};

export default validate;
