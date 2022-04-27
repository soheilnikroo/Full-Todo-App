import { IonLoading } from '@ionic/react';
import React from 'react';

// import css
import classes from './style/Loader.module.css';

interface LoaderProps {
  animated?: boolean;
  keyboardClose?: boolean;
  spinner?:
    | 'bubbles'
    | 'circles'
    | 'crescent'
    | 'dots'
    | 'lines'
    | 'lines-small'
    | 'circular'
    | 'lines-sharp'
    | 'lines-sharp-small'
    | null
    | undefined;
  message: string;
  isOpen: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  animated,
  keyboardClose,
  spinner,
  message,
  isOpen,
}) => (
  <IonLoading
    spinner={spinner}
    keyboardClose={keyboardClose}
    animated={animated}
    cssClass={classes['loading-container']}
    isOpen={isOpen}
    message={message}
  />
);

Loader.defaultProps = {
  animated: true,
  keyboardClose: true,
  spinner: 'bubbles',
};

export default Loader;
