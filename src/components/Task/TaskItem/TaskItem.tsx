import { IonText } from '@ionic/react';
import { useContext, useState } from 'react';

// import css
import classes from './style/TaskItem.module.css';
import CircleStateTask from '../CircleStateTask/CircleStateTask';
import { Draggable } from 'react-beautiful-dnd';
import { IsTaskDraggingContext } from '../../../context/is-task-dragging';

// randome color picker
const randomColorPicker = (obj: any): any => {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};

// colors
const COLORS = {
  PURPLE: '#110976',
  BULISH: '#00A0FF',
  ORANGE: '#FF744C',
  GREEN: '#66BAA7',
  YELLOW: '#FEE440',
};

interface TaskItemProps {
  id: string;
  isDone: boolean;
  title: string;
  index: number;
  description: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  isDone,
  title,
  id,
  index,
  description,
}) => {
  const [color, setColor] = useState(randomColorPicker(COLORS));
  const { dragIndex } = useContext(IsTaskDraggingContext);

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
          <div id={id} className={classes['task']}>
            <div className={classes['item']}>
              <CircleStateTask done={isDone} color={color} />
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
