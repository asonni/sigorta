const validate = values => {
  const errors = {};
  const {
    client,
    plan,
    name,
    dob,
    gender,
    nationality,
    passport,
    phone,
    // fatherName,
    // fatherPassport,
    // motherName,
    // motherPassport,
    numberOfYears
  } = values;

  // eslint-disable-next-line
  const rePhone = /^[\s()+-]*([0-9][\s()+-]*){11,20}$/;

  if (!client) {
    errors.client = 'Please select any client info';
  }

  if (!plan) {
    errors.plan = 'Please select any plan info';
  }

  if (!name) {
    errors.name = 'Please type an order name';
  } else if (name.length < 3) {
    errors.name = 'The order name must be at least 3 character';
  }

  if (!dob) {
    errors.dob = 'Please select any date of birth';
  }

  if (!gender) {
    errors.gender = 'Please select any gender';
  }

  if (!nationality) {
    errors.nationality = 'Please select any nationality';
  }

  if (!passport) {
    errors.passport = 'Please type a passport number';
  } else if (passport.length < 3) {
    errors.passport = 'The passport number must be at least 3 character';
  }

  if (!phone) {
    errors.phone = 'Please type a phone number';
  } else if (!Number(phone)) {
    errors.phone = 'Phone number must be digits only';
  } else if (!rePhone.test(phone)) {
    errors.phone = 'Phone number must be in International format';
  }

  // if (!fatherName) {
  //   errors.fatherName = 'Please type a father name';
  // } else if (fatherName.length < 3) {
  //   errors.fatherName = 'The father name must be at least 3 character';
  // }
  //
  // if (!fatherPassport) {
  //   errors.fatherPassport = 'Please type a passport number';
  // } else if (fatherPassport.length < 3) {
  //   errors.fatherPassport = 'The passport number must be at least 3 character';
  // }
  //
  // if (!motherName) {
  //   errors.motherName = 'Please type a mother name';
  // } else if (motherName.length < 3) {
  //   errors.motherName = 'The mother name must be at least 3 character';
  // }
  //
  // if (!motherPassport) {
  //   errors.motherPassport = 'Please type a passport number';
  // } else if (motherPassport.length < 3) {
  //   errors.motherPassport = 'The passport number must be at least 3 character';
  // }

  if (!numberOfYears) {
    errors.numberOfYears = 'Please select any number of years';
  }

  return errors;
};

export default validate;
