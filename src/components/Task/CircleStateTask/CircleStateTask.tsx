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
}

const CircleStateTask: React.FC<CircleStateTaskProps> = ({
  color,
  done = 'false',
}) => {
  const iconColor = done ? '#66BAA7' : color;
  const iconSrc = done ? checkIcon : circleStateIcon;

  return (
    <IonIcon
      onClick={() => {}}
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
