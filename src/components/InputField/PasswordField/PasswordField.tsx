import React from 'react';

import { lockClosedOutline as passwordIcon } from 'ionicons/icons';
import { InputChangeEventDetail } from '@ionic/react';
import InputField from '../InputField';

interface PasswordFieldProps {
  onChange?: ((event: CustomEvent<InputChangeEventDetail>) => void) | undefined;
  errorMessage?: string;
  title?: string;
  iconSrc?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  onChange,
  errorMessage,
  title,
  iconSrc,
}) => (
  <InputField
    type="password"
    inputMode="text"
    onChange={onChange}
    title={title}
    iconSrc={iconSrc ? passwordIcon : ''}
    errorMessage={errorMessage}
  />
);

PasswordField.defaultProps = {
  onChange: undefined,
  errorMessage: 'Please enter valid input.',
  title: 'Password',
  iconSrc: true,
};

export default PasswordField;
