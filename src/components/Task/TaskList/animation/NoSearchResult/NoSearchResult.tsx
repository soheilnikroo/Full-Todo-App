import React from 'react';

import Lottie from 'lottie-react';

import classes from './style/NoSearchResult.module.css';
import { noSearchResult } from '../../../../../assets';

const NoSearchResult = () => {
  return (
    <Lottie
      className={classes['serach-image']}
      animationData={noSearchResult}
      autoPlay={true}
      loop={true}
    />
  );
};

export default NoSearchResult;
