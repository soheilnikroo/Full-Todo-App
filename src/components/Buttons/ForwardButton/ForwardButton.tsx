import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';

// import css
import { chevronForward as forwardIcon } from 'ionicons/icons';
import classes from './style/ForwardButton.module.css';

// import forward icon from ionicons

interface ForwardButtonProps {
  onClick?: React.MouseEventHandler<HTMLIonFabButtonElement> | undefined;
}

const ForwardButton: React.FC<ForwardButtonProps> = ({ onClick }) => (
  <IonFab vertical="bottom" horizontal="end" slot="fixed">
    <IonFabButton
      onClick={onClick}
      color="primary"
      className={classes['forward-button']}
    >
      <IonIcon className={classes['forward-button__icon']} icon={forwardIcon} />
    </IonFabButton>
  </IonFab>
);

ForwardButton.defaultProps = {
  onClick: undefined,
};

export default ForwardButton;
