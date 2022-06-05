import React from 'react';
import Lottie from 'lottie-react';

import classes from './style/ErrorPage.module.css';
import { Link } from 'react-router-dom';
import { errorAnimation } from '../../assets';

const ErrorPage: React.FC = () => {
  return (
    <div className={classes['error']}>
      <Lottie
        autoPlay={true}
        loop={true}
        className={classes['error__image']}
        animationData={errorAnimation}
      />
      <p className={classes['goto-text']}>
        Sorry, somthing went wrong,
        <Link className={classes['link']} to="/">
          please try again later.
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;
