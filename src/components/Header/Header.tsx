import { IonHeader } from '@ionic/react';
import React from 'react';
import MenuButton from '../Buttons/MenuButton/MenuButton';
import Notification from '../Notification/Notification';
import Search from '../Search/Search';

// import css
import classes from './style/Header.module.css';

const Header: React.FC = () => {
  return (
    <IonHeader slot="fixed" className={`ion-no-border ${classes['header']}`}>
      <div className={classes['header-left']}>
        <MenuButton />
      </div>
      <div className={classes['header-right']}>
        <div className={classes['right-search']}>
          <Search />
        </div>
        <div className={classes['right-notif']}>
          <Notification />
        </div>
      </div>
    </IonHeader>
  );
};

export default Header;
