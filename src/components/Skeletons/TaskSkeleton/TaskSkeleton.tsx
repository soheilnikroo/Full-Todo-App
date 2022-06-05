import { IonSkeletonText } from '@ionic/react';
import React from 'react';

const TaskSkeleton = () => {
  return (
    <div className="ion-padding custom-skeleton">
      <IonSkeletonText
        animated
        style={{
          width: '85%',
          height: '50px',
          margin: '2rem 0',
          borderRadius: '10px',
        }}
      />
      <IonSkeletonText
        animated
        style={{
          width: '85%',
          height: '50px',
          marginBottom: '2rem',
          borderRadius: '10px',
        }}
      />
      <IonSkeletonText
        animated
        style={{
          width: '85%',
          height: '50px',
          marginBottom: '2rem',
          borderRadius: '10px',
        }}
      />
      <IonSkeletonText
        animated
        style={{
          width: '85%',
          height: '50px',
          marginBottom: '2rem',
          borderRadius: '10px',
        }}
      />
      <IonSkeletonText
        animated
        style={{
          width: '85%',
          height: '50px',
          marginBottom: '2rem',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default TaskSkeleton;
