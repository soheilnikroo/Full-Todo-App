import { IonContent, IonFooter, IonIcon, IonMenu } from '@ionic/react';
import {
  headsetOutline,
  helpCircleOutline,
  moonOutline,
  personOutline,
  powerOutline,
} from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth-context';
import { useGetUser } from '../../hooks';
import ProfileImageSkeletone from '../Skeletons/ProfileImageSkeletone/ProfileImageSkeletone';

// import css
import classes from './style/SideMenu.module.css';

const SideMenu: React.FC = () => {
  const { logout } = useContext(AuthContext);

  const [userProfileImage, setUserProfileImage] = useState<any>();

  const { userData, userIsError, userIsLoading } = useGetUser();

  const history = useHistory();

  useEffect(() => {
    if (userData && !userIsError && !userIsLoading) {
      setUserProfileImage(userData.imageUrl);
    }
  }, [userData]);

  const handleLogout = () => {
    logout();
    history.replace('/welcome');
  };

  const goToProfilePage = () => {
    history.push('/profile');
  };

  return (
    <IonMenu
      className={classes['menu']}
      side="start"
      menuId="first"
      contentId="home"
    >
      <IonContent>
        <section className={classes['menu-content']}>
          <ul className={classes['menu-list']}>
            <li className={classes['menu-header']}>
              {userIsLoading ? (
                <ProfileImageSkeletone isForProfile={false} />
              ) : (
                <img
                  className={classes['menu-profile-img']}
                  src={`data:image/png;base64, ${userProfileImage}`}
                  alt="profile"
                />
              )}
            </li>
            <section className={classes['profile']}>
              <h2 className={classes['section-title']}>PROFILE</h2>
              <li onClick={goToProfilePage} className={classes['menu-item']}>
                <IonIcon className={classes['menu-icon']} src={personOutline} />
                <h3 className={classes['item-title']}>Profile</h3>
              </li>
            </section>
            <section className={classes['customise']}>
              <h2 className={classes['section-title']}>CUSTIMIZATION</h2>
              <li className={classes['menu-item']}>
                <IonIcon className={classes['menu-icon']} src={moonOutline} />
                <h3 className={classes['item-title']}>Theme</h3>
              </li>
            </section>
            <section className={classes['support']}>
              <h2 className={classes['section-title']}>SUPPORT</h2>
              <li className={classes['menu-item']}>
                <IonIcon
                  className={classes['menu-icon']}
                  src={helpCircleOutline}
                />
                <h3 className={classes['item-title']}>About Us</h3>
              </li>
              <li className={classes['menu-item']}>
                <IonIcon
                  className={classes['menu-icon']}
                  src={headsetOutline}
                />
                <h3 className={classes['item-title']}>Contact Us</h3>
              </li>
            </section>
          </ul>
        </section>
        <IonFooter className={classes['footer']}>
          <section onClick={handleLogout} className={classes['logout']}>
            <div className={classes['logout-wrapper']}>
              <IonIcon className={classes['logout-icon']} src={powerOutline} />
              <h3 className={classes['logout-title']}>Logout</h3>
            </div>
          </section>
          <h4 className={classes['copyright']}>
            2022 © ShareX. All rights reserved.
          </h4>
        </IonFooter>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
