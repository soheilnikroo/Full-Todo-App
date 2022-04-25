import { IonButton } from '@ionic/react';
import React from 'react';

// import css
import classes from './style/PrimaryButton.module.css';

interface PrimaryButtonProps {
  disabled?: boolean;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<HTMLIonButtonElement> | undefined;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  disabled,
  text,
  type,
  onClick,
}) => (
  <IonButton
    onClick={onClick}
    disabled={disabled}
    className={classes.button}
    type={type}
  >
    {text}
  </IonButton>
);

PrimaryButton.defaultProps = {
  disabled: false,
  type: 'button',
  onClick: undefined,
};

export default PrimaryButton;
