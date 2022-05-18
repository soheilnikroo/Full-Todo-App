import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';
import React from 'react';

// import css
import classes from './style/Refresher.module.css';

interface RefresherProps {
  onRefresh: (event: CustomEvent<RefresherEventDetail>) => void;
  disabled: boolean;
}

const Refresher: React.FC<RefresherProps> = ({ disabled, onRefresh }) => {
  return (
    <IonRefresher
      disabled={disabled}
      slot="fixed"
      onIonRefresh={onRefresh}
      className={classes['refresher']}
    >
      <IonRefresherContent
        className={classes['refresher-content']}
        pullingIcon={chevronDownCircleOutline}
        pullingText="Pull to refresh"
        refreshingSpinner="circles"
        refreshingText="Refreshing..."
      ></IonRefresherContent>
    </IonRefresher>
  );
};

export default Refresher;
