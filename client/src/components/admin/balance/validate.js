const validate = values => {
  const errors = {};
  const { client, balance, transaction } = values;

  if (!client) {
    errors.client = 'Please select any client info';
  }

  if (!balance) {
    errors.balance = 'Please type the balance';
  } else if (!Number(balance)) {
    errors.balance = 'Please type the balance in digits only';
  }

  if (!transaction) {
    errors.transaction = 'Please select any transaction';
  } else if (
    transaction &&
    transaction.value !== 'add' &&
    transaction.value !== 'substract'
  ) {
    errors.transaction = 'The value of transaction must be add or substract';
  }

  return errors;
};

export default validate;
