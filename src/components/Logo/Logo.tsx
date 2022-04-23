import { IonImg } from '@ionic/react';
import React from 'react';

// import logo svg
import { logo } from '../../assets';

// import css
import classes from './style/Logo.module.css';

const Logo: React.FC = () => (
  <IonImg className={classes['header-logo']} src={logo} />
);

export default Logo;
