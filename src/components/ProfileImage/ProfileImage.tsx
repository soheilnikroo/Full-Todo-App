import { IonIcon, IonImg } from '@ionic/react';
import React, { Fragment, useEffect, useState } from 'react';

import { createOutline as editIcon } from 'ionicons/icons';

// import css
import classes from './style/ProfileImage.module.css';
import { profileBackground } from '../../assets';
import { useAddAvatar, useGetUser } from '../../hooks';
import ProfileImageSkeletone from '../Skeletons/ProfileImageSkeletone/ProfileImageSkeletone';

const ProfileImage: React.FC<any> = ({ imageSrc }) => {
  const updateUserAvatar = useAddAvatar();
  const { userRefetch } = useGetUser();
  const [isLoading, setIsLoading] = useState(false);

  const changeImageHandler = (event: any): void => {
    const image = event.target.files[0];

    const fd = new FormData();
    fd.append('avatar', image, image.name);
    setIsLoading(true);
    updateUserAvatar.mutate({
      imageUrl: fd,
    });
  };

  useEffect(() => {
    userRefetch().then(() => {
      setIsLoading(false);
    });
  }, [updateUserAvatar.isSuccess]);

  return (
    <div className={classes['profile-content']}>
      <IonImg
        className={classes['profile-background']}
        src={profileBackground}
      />
      <div className={classes['profile-detail-container']}>
        <div className={classes['profile-detail']}>
          {isLoading ? (
            <ProfileImageSkeletone />
          ) : (
            <Fragment>
              <img
                className={classes['profile-img']}
                src={`data:image/png;base64, ${imageSrc}`}
                alt="profileImage"
              />

              <span className={classes['profile-img__edit']}>
                <input
                  className={classes['profile-input']}
                  type="file"
                  accept="image/*"
                  onChange={changeImageHandler}
                />
                <IonIcon
                  className={classes['profile-img__edit-icon']}
                  src={editIcon}
                />
              </span>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;
