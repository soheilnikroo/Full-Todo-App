import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonProgressBar,
} from '@ionic/react';
import React from 'react';

// import css
import classes from './style/Category.module.css';

interface CategoryProps {
  title: string;
  percentage: number;
  amount: number;
  onClick: React.MouseEventHandler<HTMLIonCardElement>;
  color?: string;
}

const Category: React.FC<CategoryProps> = ({
  title,
  amount,
  percentage,
  onClick,
  color,
}) => (
  <IonCard onClick={onClick} className={classes['category']}>
    <IonCardHeader>
      <IonCardSubtitle className={classes['subtitle']}>
        {amount}
        tasks
      </IonCardSubtitle>
      <IonCardTitle className={classes['category-title']} style={{ color }}>
        {title}
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonProgressBar
        style={{ '--progress-background': color }}
        value={percentage}
      />
    </IonCardContent>
  </IonCard>
);

Category.defaultProps = {
  color: '#008080',
};

export default Category;
