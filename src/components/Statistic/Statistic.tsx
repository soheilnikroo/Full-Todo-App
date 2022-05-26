import { IonText } from '@ionic/react';
import React from 'react';

// import css
import classes from './style/Statistic.module.css';

interface StatisticProps {
  title: string;
  number: number;
}

const Statistic: React.FC<StatisticProps> = ({ title, number }) => (
  <div className={classes['statistic-container']}>
    <IonText className={classes['statistic-title']}>{title}</IonText>
    <IonText className={classes['statistic-number']}>{number}</IonText>
  </div>
);

export default Statistic;
