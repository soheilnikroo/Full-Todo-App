import React from 'react';
import { chevronBack as backIcon } from 'ionicons/icons';

// import css
import { IonIcon } from '@ionic/react';
import classes from './style/BackButton.module.css';

interface BackButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <div tabIndex={0} role="button" onClick={onClick} className={classes['back']}>
    <IonIcon className={classes['back-icon']} icon={backIcon} />
  </div>
);

BackButton.defaultProps = {
  onClick: undefined,
};

export default BackButton;
