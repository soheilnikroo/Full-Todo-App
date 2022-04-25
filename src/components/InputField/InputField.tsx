import { TextFieldTypes } from '@ionic/core';
import {
  IonIcon,
  IonInput,
  IonText,
  InputChangeEventDetail,
} from '@ionic/react';
import React from 'react';

// import css
import classes from './style/InputField.module.css';

interface InputFieldProps {
  type?: TextFieldTypes;
  inputMode?:
    | 'search'
    | 'text'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal';
  onChange?: ((event: CustomEvent<InputChangeEventDetail>) => void) | undefined;
  title?: string;
  iconSrc?: string;
  placeholder?: string;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  inputMode,
  title,
  iconSrc,
  onChange,
  placeholder,
  errorMessage,
}) => (
  <div className={classes['input-field']}>
    <div className={classes[`input-header${errorMessage && '-error'}`]}>
      <IonText className={classes['input-text']}>{title}</IonText>
    </div>
    <div className={classes['input-field']}>
      <IonInput
        placeholder={placeholder}
        autofocus
        type={type}
        inputMode={inputMode}
        onIonChange={onChange}
        className={classes[`input-field__input${errorMessage && '-error'}`]}
      >
        <IonIcon
          className={classes[`input-field__icon${errorMessage && '-error'}`]}
          src={iconSrc}
        />
      </IonInput>
    </div>
    <span className={classes['error-text']}>{errorMessage}</span>
  </div>
);

InputField.defaultProps = {
  type: 'text',
  inputMode: 'text',
  title: '',
  iconSrc: '',
  onChange: undefined,
  placeholder: '',
  errorMessage: '',
};

export default InputField;
