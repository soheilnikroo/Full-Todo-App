export let timeCheck = 1000;

export let emailValidationOptions = {
  intialValue: '',
  emailValue: { value: true, error: 'Email should be valid.' },
  timeCheck: timeCheck,
};

export let passwordValidationOptions = {
  intialValue: '',
  minLengthValue: {
    value: 6,
    error: 'Password should be at least 6 characters.',
  },
  haveDigitValue: {
    value: 1,
    error: 'Password should have at least one digit.',
  },
  timeCheck: timeCheck,
};
