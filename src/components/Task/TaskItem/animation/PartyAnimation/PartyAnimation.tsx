import React from 'react';
import Lottie from 'lottie-react';

import classes from './style/PartyAnimation.module.css';
import { partyAnimation } from '../../../../../assets';

const PartyAnimation = () => {
  return (
    <Lottie
      autoPlay={true}
      className={classes['party-image']}
      animationData={partyAnimation}
    />
  );
};

export default PartyAnimation;
