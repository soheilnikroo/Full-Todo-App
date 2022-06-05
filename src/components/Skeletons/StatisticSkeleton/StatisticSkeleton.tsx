import React from 'react';
import { IonSkeletonText } from '@ionic/react';

const StatisticSkeleton: React.FC = () => {
  return (
    <div className="ion-padding custom-skeleton">
      <div
        style={{
          display: 'flex',
          marginTop: ' 2rem',
          width: '60vw',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IonSkeletonText
          animated
          style={{
            width: '30%',
            height: '16px',
            borderRadius: '16px',
          }}
        />
        <IonSkeletonText
          animated
          style={{
            width: '30%',
            height: '16px',
            borderRadius: '16px',
          }}
        />
        <IonSkeletonText
          animated
          style={{
            width: '30%',
            height: '16px',
            borderRadius: '16px',
          }}
        />
      </div>
    </div>
  );
};

export default StatisticSkeleton;
