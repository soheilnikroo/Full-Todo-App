import React, { useContext, useEffect, useState } from 'react';

// import css
import classes from './style/TaskList.module.css';
import TaskItem from '../TaskItem/TaskItem';
import { SearchContext } from '../../../context/search-context';
import Todo from '../../../models/todos-model';
import { DragDropContext, DragStart, Droppable } from 'react-beautiful-dnd';
import { IsTaskDraggingContext } from '../../../context/is-task-dragging';
import EmptyTask from './animation/EmptyTask/EmptyTask';
import TaskDetailModal from '../../TaskDetailModal/TaskDetailModal';
import NoSearchResult from './animation/NoSearchResult/NoSearchResult';
import {
  useGetAllTasks,
  useGetDoneTask,
  useGetTask,
  useReorderTasks,
} from '../../../hooks';

interface TaskListProps {
  data: (Todo | undefined)[];
}

const TaskList: React.FC<TaskListProps> = ({ data }) => {
  const { searchTerm } = useContext(SearchContext);
  let filteredData: (Todo | undefined)[] = [];

  const reorderTask = useReorderTasks();

  const { allTodosData, allTodosIsError, allTodosIsLoading, allTodosRefetch } =
    useGetAllTasks();
  const { todosRefetch } = useGetTask();
  const { doneTodosodosRefetch } = useGetDoneTask();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [isLoaidng, setIsLoading] = useState(false);

  if (searchTerm !== 'Search') {
    filteredData = data.filter((task) => {
      return task?.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  } else {
    filteredData = data;
  }

  const { handleDragIndex, setIsDragTrue, setIsDragFalse } = useContext(
    IsTaskDraggingContext
  );

  const dargStartHandler = (event: DragStart) => {
    handleDragIndex(event.source.index);
    setIsDragTrue();
  };

  const dragEndHandler = (event: any) => {
    setIsDragFalse();
    handleDragIndex(-1);

    if (!event.destination || event.destination.index === event.source.index) {
      return;
    }

    setIsLoading(true);
    if (!allTodosIsError && !allTodosIsLoading) {
      const taskId = allTodosData[event.source.index]._id;

      reorderTask.mutate({
        id: taskId,
        destinationIndex: event.destination.index + 1,
      });
    }
  };

  useEffect(() => {
    if (reorderTask.isSuccess && !reorderTask.isError) {
      allTodosRefetch().then(() => {
        todosRefetch().then(() => {
          doneTodosodosRefetch().then(() => {
            setIsLoading(false);
          });
        });
      });
    }
  }, [reorderTask.isSuccess]);

  const handleTaskItemClick = (task: Todo | undefined) => {
    setSelectedTaskId(task?._id || '');
    setShowDetailModal(true);
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler} onDragStart={dargStartHandler}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={classes['tasks']}
          >
            <TaskDetailModal
              taskId={selectedTaskId}
              isOpen={showDetailModal}
              setShowModal={setShowDetailModal}
            />

            <ul
              className={classes[`tasks-list${isLoaidng ? '-disabled' : ''}`]}
            >
              {filteredData.length !== 0 || data.length !== 0 ? (
                filteredData.map((task, index) => (
                  <li
                    onClick={() =>
                      isLoaidng ? null : handleTaskItemClick(task)
                    }
                    key={task?._id}
                    className={classes['task-item']}
                  >
                    <TaskItem
                      isLoadingData={isLoaidng}
                      index={index}
                      id={task?._id || ''}
                      title={task?.title || ''}
                      description={task?.description || ''}
                      isDone={task?.isDone || false}
                      circleColor={task?.circleColor || '#ffffff'}
                    />
                  </li>
                ))
              ) : (
                <EmptyTask />
              )}

              {filteredData.length === 0 && data.length > 0 && (
                <NoSearchResult />
              )}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
