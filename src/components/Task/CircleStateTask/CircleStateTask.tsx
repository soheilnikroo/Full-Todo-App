import React from 'react';

// import css

import {
  ellipseOutline as circleStateIcon,
  checkmarkCircle as checkIcon,
} from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import classes from './style/CircleStateTask.module.css';

interface CircleStateTaskProps {
  color: string;
  done?: boolean;
  onClick?: React.MouseEventHandler<HTMLIonIconElement> | undefined;
}

const CircleStateTask: React.FC<CircleStateTaskProps> = ({
  color,
  done = 'false',
  onClick,
}) => {
  const iconColor = done ? '#66BAA7' : color;
  const iconSrc = done ? checkIcon : circleStateIcon;

  return (
    <IonIcon
      onClick={onClick}
      style={{ color: iconColor }}
      src={iconSrc}
      className={classes['circle']}
    />
  );
};

CircleStateTask.defaultProps = {
  done: false,
};

export default CircleStateTask;
