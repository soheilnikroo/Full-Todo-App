import { IonText } from '@ionic/react';
import React from 'react';
import Todo from '../../models/todos-model';
import TaskSkeleton from '../Skeletons/TaskSkeleton';
import TaskList from '../Task/TaskList/TaskList';

// import css
import classes from './style/TodoSection.module.css';

interface TodoSectionProps {
  todosData: (Todo | undefined)[];
  isLoading: boolean;
  title: string;
  titleStyle?: React.CSSProperties;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  isLoading,
  todosData,
  title,
  titleStyle,
}) => {
  return (
    <div className={classes['todos-container']}>
      <div className={classes['todo-container']}>
        <IonText style={titleStyle} className={classes['todo-title']}>
          {title}
        </IonText>
        {!isLoading ? (
          <div className={classes['todo-list']}>
            <TaskList data={todosData} />
          </div>
        ) : (
          <TaskSkeleton />
        )}
      </div>
    </div>
  );
};

export default TodoSection;
