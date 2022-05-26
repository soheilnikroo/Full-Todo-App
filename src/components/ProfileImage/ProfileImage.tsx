import { IonIcon, IonImg } from '@ionic/react';
import React, { useEffect } from 'react';

import { createOutline as editIcon } from 'ionicons/icons';

// import css
import classes from './style/ProfileImage.module.css';
import { profileBackground } from '../../assets';
import { usePhotoGallery } from '../../hooks';

const ProfileImage: React.FC<any> = ({ imageSrc }) => {
  const { photos, takePhoto } = usePhotoGallery();

  const changeImageHandler = (): void => {
    takePhoto();
  };

  useEffect(() => {
    if (photos[0]?.webviewPath) {
      // dispatch(editImage({ imageUrl: photos[0].webviewPath }));
    }
  }, [photos]);

  return (
    <div className={classes['profile-content']}>
      <IonImg
        className={classes['profile-background']}
        src={profileBackground}
      />
      <div className={classes['profile-detail-container']}>
        <div className={classes['profile-detail']}>
          <img
            className={classes['profile-img']}
            src={imageSrc}
            alt="profileImage"
          />
          <span
            role="button"
            tabIndex={0}
            onClick={changeImageHandler}
            className={classes['profile-img__edit']}
          >
            <IonIcon
              className={classes['profile-img__edit-icon']}
              src={editIcon}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
