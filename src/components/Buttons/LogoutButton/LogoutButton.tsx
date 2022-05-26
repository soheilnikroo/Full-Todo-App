import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';

import { logOutOutline as logoutIcon } from 'ionicons/icons';

// import css
import classes from './style/LogoutButton.module.css';

interface LogoutButtonProps {
  onClick?: React.MouseEventHandler<HTMLIonFabButtonElement> | undefined;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => (
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton
      onClick={onClick}
      color="primary"
      className={classes['logout-button']}
    >
      <IonIcon className={classes.logout__icon} icon={logoutIcon} />
    </IonFabButton>
  </IonFab>
);

LogoutButton.defaultProps = {
  onClick: undefined,
};

export default LogoutButton;
