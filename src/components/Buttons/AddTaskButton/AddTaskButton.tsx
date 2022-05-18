import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';

import { addOutline as addIcon } from 'ionicons/icons';

// import css
import classes from './style/AddTaskButton.module.css';

interface AddTaskButtonProps {
  onClick?: React.MouseEventHandler<HTMLIonFabButtonElement> | undefined;
  isLoading?: boolean;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  onClick,
  isLoading,
}) => (
  <IonFab>
    <IonFabButton
      disabled={isLoading}
      onClick={onClick}
      className={classes['add-button']}
    >
      <IonIcon className={classes['add-button__icon']} icon={addIcon} />
    </IonFabButton>
  </IonFab>
);

AddTaskButton.defaultProps = {
  isLoading: false,
  onClick: undefined,
};

export default AddTaskButton;
