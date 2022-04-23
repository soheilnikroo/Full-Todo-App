import { IonContent, IonHeader, IonImg, IonPage, IonText } from '@ionic/react';
import React from 'react';

// history state import
import { useHistory } from 'react-router';

// import css
import classes from './style/WelcomePage.module.css';

// import assests

import {
  backgroundRightImage,
  backgroundLeftImage,
  welcomImage,
} from '../../assets';
import { ForwardButton, Logo } from '../../components';

const WelcomPage: React.FC = () => {
  const history = useHistory();

  // on click events on forward button
  const goToAuthPage = (): void => {
    history.push('/auth/login');
  };

  return (
    <IonPage>
      <IonHeader className={`ion-no-border ${classes['header']}`}>
        <Logo />
      </IonHeader>
      <IonContent fullscreen>
        <IonImg
          src={backgroundRightImage}
          className={classes['background-img__right']}
        />
        <div className={classes['ocean']}>
          <div className={classes['wave']}></div>
          <div className={classes['wave']}></div>
        </div>
        <div className={classes['content']}>
          <div className={classes['content-header']}>
            <IonImg src={welcomImage} className={classes['welcom-img']} />
            <IonText className={classes['content-header__title']}>
              Manage Your Work In Right Way.
            </IonText>
            <IonText className={classes['content-header__description']}>
              add your daily task to more productive in your life. we add more
              features in future too.
            </IonText>
          </div>
        </div>
        <ForwardButton onClick={goToAuthPage} />
      </IonContent>
    </IonPage>
  );
};

export default WelcomPage;
