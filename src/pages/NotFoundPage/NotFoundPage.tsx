import React from 'react';

import Lottie from 'lottie-react';

import { notFoundAnimation } from '../../assets';

import classes from './style/NotFoundPage.module.css';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className={classes['notfound']}>
      <Lottie
        autoPlay={true}
        loop={true}
        className={classes['not-found__image']}
        animationData={notFoundAnimation}
      />
      <p className={classes['goto-text']}>
        Sorry, the page you are looking for does not exist.
        <Link className={classes['link']} to="/">
          Go back to the homepage
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
