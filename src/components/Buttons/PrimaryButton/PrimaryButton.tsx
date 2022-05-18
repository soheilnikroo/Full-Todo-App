import { IonButton, IonSpinner } from '@ionic/react';
import React from 'react';

// import css
import classes from './style/PrimaryButton.module.css';

interface PrimaryButtonProps {
  disabled?: boolean;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
  isLoading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  disabled,
  text,
  type,
  onClick,
  isLoading,
}) => (
  <IonButton
    onClick={onClick}
    disabled={disabled}
    className={classes['button']}
    type={type}
  >
    {!isLoading && text}
    {isLoading && (
      <div className={classes['button-loader']}>
        <span className={classes['loader-text']}>Loading...</span>
        <IonSpinner name="crescent" />
      </div>
    )}
  </IonButton>
);

PrimaryButton.defaultProps = {
  disabled: false,
  type: 'button',
  onClick: undefined,
  isLoading: false,
};

export default PrimaryButton;
