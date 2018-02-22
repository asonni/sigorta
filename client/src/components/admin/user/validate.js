const validate = values => {
  const errors = {};
  const { fname, lname, email, password, confirmPassword } = values;
  // eslint-disable-next-line
  const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const rePass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

  if (!fname) {
    errors.fname = 'Please type the first name';
  } else if (fname.length < 3) {
    errors.fname = 'The first name must be at least 3 character';
  }

  if (!lname) {
    errors.lname = 'Please type the last name';
  } else if (lname.length < 3) {
    errors.lname = 'The last name must be at least 3 character';
  }

  if (!email) {
    errors.email = 'Please type an email address';
  } else if (!reEmail.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Please type the password';
  } else if (password.length < 8) {
    errors.password = 'The password is too short';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please retype the password';
  } else if (password && password !== confirmPassword) {
    errors.confirmPassword = 'Password does not match the confirm password';
  }

  return errors;
};

export default validate;
