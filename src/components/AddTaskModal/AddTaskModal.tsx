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
import { closeOutline as closeIcon } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import {
  useAddTask,
  useGetAllTasks,
  useGetDoneTask,
  useGetTask,
} from '../../hooks';
import { RandomTaskColor } from '../../util';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';

// import css
import classes from './style/AddTaskModal.module.css';

interface AddTaskModalProps {
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type TextInputType = string | undefined | null;

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  setShowModal,
}) => {
  const [taskTitle, setTaskTitle] = useState<TextInputType>('');
  const [taskDescription, setTaskDescription] = useState<TextInputType>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { allTodosRefetch } = useGetAllTasks();
  const { doneTodosodosRefetch } = useGetDoneTask();
  const { todosRefetch } = useGetTask();

  const [isLoading, setIsLoading] = useState(false);

  const addTodo = useAddTask();

  const handleChangeTaskTitle = (
    event: CustomEvent<InputChangeEventDetail>
  ) => {
    setTaskTitle(event.detail.value);
  };

  const handleChangeTaskDescription = (
    event: CustomEvent<TextareaChangeEventDetail>
  ) => {
    setTaskDescription(event.detail.value);
  };

  const handleChangeIsCompleted = (
    event: CustomEvent<ToggleChangeEventDetail<any>>
  ) => {
    setIsCompleted(event.detail.checked);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTaskDescription('');
    setTaskTitle('');
    setIsCompleted(false);
    setIsLoading(true);

    if (
      taskTitle &&
      taskDescription !== null &&
      taskDescription !== undefined
    ) {
      addTodo.mutate({
        title: taskTitle,
        description: taskDescription,
        isDone: isCompleted,
        circleColor: RandomTaskColor(),
      });
    }
  };

  useEffect(() => {
    if (addTodo.isSuccess && !addTodo.isLoading) {
      allTodosRefetch().then(() => {
        todosRefetch().then(() => {
          doneTodosodosRefetch().then(() => {
            setIsLoading(false);
            setShowModal(false);
          });
        });
      });
    }
  }, [addTodo.isSuccess]);

  useEffect(() => {
    if (taskTitle !== undefined && taskTitle !== null) {
      if (taskTitle.trim() !== '') {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [taskTitle]);

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
              <div className={classes['modal-header']}>
                <IonInput
                  onIonChange={handleChangeTaskTitle}
                  className={classes['modal-title']}
                  placeholder="Task Title"
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
                  value={taskDescription}
                  className={classes['desc-area']}
                  onIonChange={handleChangeTaskDescription}
                ></IonTextarea>
              </div>
              <div className={classes['modal-switch']}>
                <IonText className={classes['switch-title']}>
                  isCompleted
                </IonText>
                <IonToggle
                  onIonChange={handleChangeIsCompleted}
                  checked={isCompleted}
                  className={classes['switch-toggle']}
                />
              </div>
            </div>
            <div className={classes['button-wrapper']}>
              <div className={classes['button']}>
                <PrimaryButton
                  disabled={isLoading || disabled}
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

export default AddTaskModal;
