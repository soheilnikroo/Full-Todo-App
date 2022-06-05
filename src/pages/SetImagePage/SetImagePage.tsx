import {
  InputChangeEventDetail,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAddAvatar, useGetUser, useUpdateUser } from '../../hooks';
import { createOutline as editIcon } from 'ionicons/icons';

import classes from './style/SetImagePage.module.css';
import { Loader, NextButton } from '../../components';

const SetImagePage: React.FC = () => {
  const [changeUserName, setChangeUserName] = useState(true);
  const [newUserName, setNewUserName] = useState<any>();
  const [newImageUrl, setNewImageUrl] = useState<any>(
    'https://avatars.dicebear.com/api/avataaars/sharex-default-profile.svg'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUserNameBlur, setIsUserNameBlur] = useState(false);
  const updateUserAvatar = useAddAvatar();

  const { userData, userRefetch, userIsLoading, userIsError } = useGetUser();

  useEffect(() => {
    setIsLoading(true);
    if (userData && !userIsLoading && !userIsError) {
      setNewUserName(userData.userName);
      setNewImageUrl(userData.imageUrl);
      setIsLoading(false);
    }
  }, [userData]);

  const history = useHistory();

  const updateUserName = useUpdateUser();

  const usernameChangeHandler = (
    event: CustomEvent<InputChangeEventDetail>
  ): void => {
    setNewUserName(event.detail.value);
  };

  useEffect(() => {
    if (userData?.userName === newUserName) {
      if (changeUserName) {
        setChangeUserName(false);
      }
    } else {
      if (!changeUserName) {
        setChangeUserName(true);
      }
    }
  }, [newUserName]);

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
    if (updateUserAvatar.isSuccess) {
      userRefetch().then(() => {
        setIsLoading(false);
      });
    }
  }, [updateUserAvatar.isSuccess]);

  const updateAllUserData = (): void => {
    setIsLoading(true);
    updateUserName.mutate({
      userName: newUserName,
    });
    userRefetch().then(() => {
      setIsLoading(false);
      history.replace('/home');
    });
  };

  const goToHomePage = (): void => {
    updateAllUserData();
  };

  useEffect(() => {
    if (updateUserName.isSuccess) {
      userRefetch().then(() => {
        setIsLoading(false);
      });
    }
  }, [updateUserName.isSuccess]);

  return (
    <IonPage>
      {isLoading ? (
        <Loader
          spinner="crescent"
          isOpen={isLoading}
          message="Updating Profile..."
        />
      ) : (
        <IonContent>
          <div className={classes['container']}>
            <div className={classes['profile-content']}>
              <span>
                <img
                  src={
                    newImageUrl.includes('sharex-default-profile.svg')
                      ? newImageUrl
                      : `data:image/png;base64, ${newImageUrl}`
                  }
                  alt="default profile"
                  className={classes['profile__img']}
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
              </span>
              <IonInput
                onClick={() => setIsUserNameBlur(false)}
                type="text"
                inputMode="text"
                onIonChange={usernameChangeHandler}
                readonly={isUserNameBlur}
                onBlur={() => setIsUserNameBlur(true)}
                className={classes['profile-name']}
                value={newUserName}
              />
            </div>
          </div>
          <NextButton
            disabled={isLoading}
            onClick={goToHomePage}
            text="Start!"
          />
        </IonContent>
      )}
    </IonPage>
  );
};

export default SetImagePage;
