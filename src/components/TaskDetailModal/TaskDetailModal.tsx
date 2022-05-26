import {
  InputChangeEventDetail,
  IonContent,
  IonIcon,
  IonInput,
  IonModal,
  IonText,
  IonTextarea,
  IonToggle,
  TextareaChangeEventDetail,
  ToggleChangeEventDetail,
} from '@ionic/react';
import React, { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../models';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';

import { closeOutline as closeIcon, trashOutline } from 'ionicons/icons';

import classes from './style/TaskDetailModal.module.css';
import {
  useDeleteTask,
  useGetAllTasks,
  useGetDoneTask,
  useGetTask,
  useUpdateTask,
} from '../../hooks';

interface TaskDetailModalProps {
  taskId: string;
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

enum ActionTypes {
  SET_ALL_FIELDS = 'SET_ALL_FIELDS',
  SET_TITLE = 'SET_TITLE',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_DONE = 'SET_DONE',
}

interface Action {
  type: ActionTypes;
  payload: any;
}

const initialState = {
  title: '',
  description: '',
  isDone: false,
  circleColor: '#110976',
};

const taskReducer = (
  state: {
    title: string;
    description: string;
    isDone: boolean;
    circleColor: string;
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SET_ALL_FIELDS:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        isDone: action.payload.isDone,
      };
    case ActionTypes.SET_TITLE:
      return { ...state, title: action.payload.title };
    case ActionTypes.SET_DESCRIPTION:
      return { ...state, description: action.payload.description };
    case ActionTypes.SET_DONE:
      return { ...state, isDone: action.payload.isDone };
    default:
      return state;
  }
};
let task: Todo | undefined;

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  taskId,
  isOpen,
  setShowModal,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const deletTask = useDeleteTask();
  const { allTodosData, allTodosIsLoading } = useGetAllTasks();
  const updateTask = useUpdateTask();

  const { allTodosRefetch } = useGetAllTasks();
  const { doneTodosodosRefetch } = useGetDoneTask();
  const { todosRefetch } = useGetTask();

  const [enableEditing, setEnableEditing] = useState(true);
  const [selectedTask, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    if (!allTodosIsLoading && allTodosData) {
      task = allTodosData.find((todo: Todo) => todo._id === taskId);
      dispatch({
        type: ActionTypes.SET_ALL_FIELDS,
        payload: task || initialState,
      });
    }
  }, [allTodosData, taskId]);

  const handleChangeTaskTitle = (
    event: CustomEvent<InputChangeEventDetail>
  ) => {
    if (event.detail.value) {
      dispatch({
        type: ActionTypes.SET_TITLE,
        payload: { title: event.detail.value },
      });
    }
  };

  const enableTitleEditing = () => {
    setEnableEditing(false);
  };

  const disableTitleEditing = () => {
    setEnableEditing(true);
  };

  const handleChangeTaskDescription = (
    event: CustomEvent<TextareaChangeEventDetail>
  ) => {
    if (event.detail.value) {
      dispatch({
        type: ActionTypes.SET_DESCRIPTION,
        payload: { description: event.detail.value },
      });
    }
  };

  const handleChangeIsCompleted = (
    event: CustomEvent<ToggleChangeEventDetail<any>>
  ) => {
    dispatch({
      type: ActionTypes.SET_DONE,
      payload: { isDone: event.detail.checked },
    });
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isTaskChanged()) {
      setIsLoading(true);
      const newTodo = new Todo({
        _id: taskId,
        title: selectedTask.title,
        description: selectedTask.description,
        isDone: selectedTask.isDone,
        circleColor: selectedTask?.circleColor,
      });

      updateTask.mutate(newTodo);
    } else {
      setShowModal(false);
    }
  };

  const handleDeleteTask = () => {
    setIsLoading(true);
    deletTask.mutate(taskId);
  };

  useEffect(() => {
    if (updateTask.isSuccess && !updateTask.isLoading) {
      allTodosRefetch().then(() => {
        todosRefetch().then(() => {
          doneTodosodosRefetch().then(() => {
            setIsLoading(false);
            setShowModal(false);
          });
        });
      });
    }
    if (deletTask.isSuccess && !deletTask.isLoading) {
      allTodosRefetch().then(() => {
        todosRefetch().then(() => {
          doneTodosodosRefetch().then(() => {
            setIsLoading(false);
            setShowModal(false);
          });
        });
      });
    }
  }, [
    updateTask.isSuccess,
    deletTask.isSuccess,
    updateTask.isLoading,
    deletTask.isLoading,
  ]);

  const isTaskChanged = () => {
    if (
      selectedTask.title !== task?.title ||
      selectedTask.description !== task?.description ||
      selectedTask.isDone !== task?.isDone
    ) {
      return true;
    }
    return false;
  };

  return (
    <IonModal
      animated
      keyboardClose
      isOpen={isOpen}
      className={classes['modal']}
    >
      <IonContent className={classes['modal-content']}>
        <section className={classes['modal-wrapper']}>
          <div className={classes['modal-clos-wrapper']}>
            <IonIcon
              onClick={handleDeleteTask}
              className={classes['delete-icon']}
              icon={trashOutline}
            />
            <div
              role="button"
              onClick={() => {
                setShowModal(false);
              }}
              className={classes['modal-close']}
            >
              <IonIcon icon={closeIcon} />
            </div>
          </div>
          <form className={classes['modal-form']} onSubmit={formSubmitHandler}>
            <div className={classes['modal-form-content']}>
              <div
                onDoubleClick={enableTitleEditing}
                className={classes['modal-header']}
              >
                <IonInput
                  onIonChange={handleChangeTaskTitle}
                  className={classes['modal-title']}
                  value={selectedTask.title}
                  readonly={enableEditing}
                  onBlur={disableTitleEditing}
                />
                <IonText className={classes['modal-subtitle']}>
                  Description
                </IonText>
              </div>
              <div className={classes['input-wrapper']}>
                <IonTextarea
                  mode="ios"
                  placeholder="Task Description"
                  wrap="soft"
                  spellcheck={true}
                  rows={6}
                  className={classes['desc-area']}
                  value={selectedTask.description}
                  onIonChange={handleChangeTaskDescription}
                ></IonTextarea>
              </div>
              <div className={classes['modal-switch']}>
                <IonText className={classes['switch-title']}>
                  isCompleted
                </IonText>
                <IonToggle
                  checked={selectedTask.isDone}
                  onIonChange={handleChangeIsCompleted}
                  className={classes['switch-toggle']}
                />
              </div>
            </div>
            <div className={classes['button-wrapper']}>
              <div className={classes['button']}>
                <PrimaryButton
                  disabled={isLoading}
                  isLoading={isLoading}
                  type="submit"
                  text="Submit"
                />
              </div>
            </div>
          </form>
        </section>
      </IonContent>
    </IonModal>
  );
};

export default TaskDetailModal;
