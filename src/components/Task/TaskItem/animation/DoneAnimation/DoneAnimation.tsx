import React from 'react';
import Lottie from 'lottie-react';

import classes from './style/DoneAnimation.module.css';
import { doneAnimation } from '../../../../../assets';

interface DoneAnimationProps {
  reversed: boolean;
}

const DoneAnimation: React.FC<DoneAnimationProps> = ({ reversed }) => {
  return (
    <Lottie
      autoPlay={true}
      className={classes['done-image']}
      animationData={doneAnimation}
      reversed={reversed}
    />
  );
};

export default DoneAnimation;
