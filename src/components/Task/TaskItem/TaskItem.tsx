import { IonText } from '@ionic/react';
import { useContext, useState } from 'react';

// import css
import classes from './style/TaskItem.module.css';
import CircleStateTask from '../CircleStateTask/CircleStateTask';
import { Draggable } from 'react-beautiful-dnd';
import { IsTaskDraggingContext } from '../../../context/is-task-dragging';
import { Todo } from '../../../models';
import {
  useGetAllTasks,
  useGetDoneTask,
  useGetTask,
  useUpdateTask,
} from '../../../hooks';
import PartyAnimation from './animation/PartyAnimation/PartyAnimation';
import DoneAnimation from './animation/DoneAnimation/DoneAnimation';

interface TaskItemProps {
  id: string;
  isDone: boolean;
  title: string;
  index: number;
  description: string;
  circleColor: string;
  isLoadingData: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  isDone,
  title,
  id,
  index,
  description,
  circleColor,
  isLoadingData,
}) => {
  const { dragIndex } = useContext(IsTaskDraggingContext);

  const updateTask = useUpdateTask();

  const [isLoading, setIsLoading] = useState(false);

  const { allTodosRefetch } = useGetAllTasks();
  const { doneTodosodosRefetch } = useGetDoneTask();
  const { todosRefetch } = useGetTask();

  const handleCirckeColorClicked = (event: any) => {
    event.stopPropagation();

    const newTodo = new Todo({
      _id: id,
      title: title,
      isDone: !isDone,
      description: description,
      circleColor: circleColor,
    });

    updateTask.mutate(newTodo);

    setIsLoading(true);
    allTodosRefetch().then(() => {
      todosRefetch().then(() => {
        doneTodosodosRefetch().then(() => {
          setIsLoading(false);
        });
      });
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${classes['container']} ${
            dragIndex === index ? classes['dragged'] : ''
          }`}
        >
          <div
            id={id}
            className={classes[`task${isLoading ? '-disabled' : ''}`]}
          >
            <div className={classes['item']}>
              {isLoading ? (
                <DoneAnimation reversed={isDone ? true : false} />
              ) : (
                <CircleStateTask
                  onClick={
                    isLoading || isLoadingData
                      ? () => {}
                      : handleCirckeColorClicked
                  }
                  done={isDone}
                  color={circleColor}
                />
              )}
              {isLoading && !isDone && <PartyAnimation />}
              <IonText className={classes[`task-text${isDone ? '-done' : ''}`]}>
                {title}
              </IonText>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
