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
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { useAddTask } from '../../hooks';
import { Todo } from '../../models';
import PrimaryButton from '../Buttons/PrimaryButton/PrimaryButton';

// import css
import classes from './style/AddTaskModal.module.css';

interface AddTaskModalProps {
  isOpen: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  reFetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<Todo[], unknown>>;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  setShowModal,
  reFetch,
}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const addTodo = useAddTask();

  const handleChangeTaskTitle = (
    event: CustomEvent<InputChangeEventDetail>
  ) => {
    if (event.detail.value) {
      setTaskTitle(event.detail.value);
    }
  };

  const handleChangeTaskDescription = (
    event: CustomEvent<TextareaChangeEventDetail>
  ) => {
    if (event.detail.value) {
      setTaskDescription(event.detail.value);
    }
  };

  const handleChangeIsCompleted = (
    event: CustomEvent<ToggleChangeEventDetail<any>>
  ) => {
    setIsCompleted(event.detail.checked);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    addTodo.mutate({
      title: taskTitle,
      description: taskDescription,
      isDone: isCompleted,
    });
  };

  useEffect(() => {
    if (addTodo.isSuccess && !addTodo.isLoading) {
      reFetch().then(() => {
        setIsLoading(false);
        setShowModal(false);
      });
    }
  }, [addTodo.isSuccess]);

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

export default AddTaskModal;
