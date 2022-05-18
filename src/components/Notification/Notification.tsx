import { IonBadge, IonIcon } from '@ionic/react';
import React from 'react';
import { NotificationIcon } from '../../assets';

// import css
import classes from './style/Notification.module.css';

const Notification: React.FC = () => {
  return (
    <div className={classes['notif']}>
      <IonIcon className={classes['notif-icon']} src={NotificationIcon} />
      <IonBadge className={classes['notif-badge']} color="secondary">
        1
      </IonBadge>
    </div>
  );
};

export default Notification;
