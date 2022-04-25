import { InputChangeEventDetail } from '@ionic/react';
import React from 'react';
import { mail as emailIcon } from 'ionicons/icons';
import InputField from '../InputField';

interface EmailFieldProps {
  onChange?: ((event: CustomEvent<InputChangeEventDetail>) => void) | undefined;
  errorMessage: string;
  placeholder?: string;
  title?: string;
}

const EmailField: React.FC<EmailFieldProps> = ({
  onChange,
  errorMessage,
  placeholder,
  title,
}) => (
  <InputField
    type="email"
    inputMode="email"
    onChange={onChange}
    title={title}
    placeholder={placeholder}
    iconSrc={emailIcon}
    errorMessage={errorMessage}
  />
);

EmailField.defaultProps = {
  placeholder: 'you@example.com',
  title: 'Email',
  onChange: undefined,
};

export default EmailField;
