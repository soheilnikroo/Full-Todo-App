import { IonSkeletonText } from '@ionic/react';
import React from 'react';

import classes from './style/ProfileImageSkeletone.module.css';

interface ProfileImageSkeletoneProps {
  isForProfile?: boolean;
}

const ProfileImageSkeletone: React.FC<ProfileImageSkeletoneProps> = ({
  isForProfile = true,
}) => {
  return (
    <div className={classes['wrapper']}>
      <div className="ion-padding custom-skeleton">
        <IonSkeletonText
          animated
          className={classes[isForProfile ? 'profile-img' : 'menu-profile-img']}
        />
        {isForProfile && (
          <IonSkeletonText animated className={classes['profile-img__edit']} />
        )}
        {isForProfile && (
          <IonSkeletonText animated className={classes['profile-text']} />
        )}
      </div>
    </div>
  );
};

export default ProfileImageSkeletone;
