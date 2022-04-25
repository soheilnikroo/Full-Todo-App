import { useEffect, useState } from 'react';

interface useFormProps {
  intialValue: string;
  minLengthValue?: { value: number; error: string };
  maxLengthValue?: { value: number; error: string };
  haveDigitValue?: { value: number; error: string };
  startWithCapitalCharValue?: { value: boolean; error: string };
  emailValue?: { value: boolean; error: string };
  timeCheck?: number;
}

const minLength = (
  input: string,
  value: number,
  error: string
): string | boolean => {
  if (input.trim().length < value) {
    return error;
  }
  return true;
};

const maxLength = (
  input: string,
  value: number,
  error: string
): string | boolean => {
  if (input.trim().length > value) {
    return error;
  }
  return true;
};

const haveDigit = (
  input: string,
  value: number,
  error: string
): string | boolean => {
  let digitCount = 0;
  for (let i = 0; i < input.trim().length; i += 1) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(+input[i])) {
      digitCount += 1;
    }
  }

  if (digitCount >= value) {
    return true;
  }
  return error;
};

const startWithCapitalChar = (
  input: string,
  error: string
): string | boolean => {
  if (input.trim().startsWith(input[0].toUpperCase())) {
    return true;
  }
  return error;
};

const email = (input: string, error: string): string | boolean => {
  if (input.trim().includes('@') && input.trim().endsWith('.com')) {
    return true;
  }
  return error;
};

const useForm: (
  props: useFormProps
) => [
  inputEntered: string,
  setInputEntered: React.Dispatch<any>,
  inputError: string,
  setInputError: React.Dispatch<React.SetStateAction<string>>
] = ({
  intialValue,
  minLengthValue,
  maxLengthValue,
  haveDigitValue,
  startWithCapitalCharValue,
  emailValue,
  timeCheck,
}) => {
  const [inputEntered, setInputEntered] = useState(intialValue);
  const [inputError, setInputError] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputEntered !== '') {
        if (minLengthValue) {
          const result = minLength(
            inputEntered,
            minLengthValue.value,
            minLengthValue.error
          );
          if (result !== true && typeof result === 'string') {
            setInputError(result);
          }
        }
        if (maxLengthValue) {
          const result = maxLength(
            inputEntered,
            maxLengthValue.value,
            maxLengthValue.error
          );
          if (result !== true && typeof result === 'string') {
            setInputError(result);
          }
        }
        if (haveDigitValue) {
          const result = haveDigit(
            inputEntered,
            haveDigitValue.value,
            haveDigitValue.error
          );
          if (result !== true && typeof result === 'string') {
            setInputError(result);
          }
        }
        if (startWithCapitalCharValue?.value) {
          const result = startWithCapitalChar(
            inputEntered,
            startWithCapitalCharValue.error
          );
          if (result !== true && typeof result === 'string') {
            setInputError(result);
          }
        }
        if (emailValue?.value) {
          const result = email(inputEntered, emailValue.error);
          if (result !== true && typeof result === 'string') {
            setInputError(result);
          }
        }
      }
    }, timeCheck);
    return () => {
      setInputError('');
      clearTimeout(timer);
    };
  }, [inputEntered]);

  return [inputEntered, setInputEntered, inputError, setInputError];
};

export default useForm;
