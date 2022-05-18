import React from 'react';
import Lottie from 'lottie-react';

import classes from './style/EmptyTask.module.css';
import { emptyTask } from '../../../../../assets';

const EmptyTask = () => {
  return (
    <Lottie
      autoPlay={true}
      loop={true}
      className={classes['empty-image']}
      animationData={emptyTask}
    />
  );
};

export default EmptyTask;
