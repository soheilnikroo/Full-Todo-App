import { IonIcon, IonMenuToggle } from '@ionic/react';
import React from 'react';

import classes from './style/MenuButton.module.css';

import { menuIcon } from '../../../assets';

const MenuButton: React.FC = () => (
  <IonMenuToggle>
    <IonIcon className={classes['menu-icon']} src={menuIcon} />
  </IonMenuToggle>
);

export default MenuButton;
