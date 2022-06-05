import {
  IonContent,
  IonPage,
  IonText,
  RefresherEventDetail,
} from '@ionic/react';
import { Fragment, useContext, useEffect, useState } from 'react';
import {
  AddTaskButton,
  CategoryList,
  Header,
  Refresher,
  ShowTodos,
  SideMenu,
} from '../../components';

// import css
import classes from './style/Home.module.css';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import {
  useAddAvatar,
  useGetDoneTask,
  useGetTask,
  useGetUser,
} from '../../hooks';
import { Todo } from '../../models';
import { IsTaskDraggingContext } from '../../context/is-task-dragging';
import { Redirect } from 'react-router';

const HomePage: React.FC = () => {
  // username and tasks variables
  let username: string = 'My Friend';

  let todos: (Todo | undefined)[] = [];
  let doneTodos: (Todo | undefined)[] = [];

  const { isDrag } = useContext(IsTaskDraggingContext);
  const [showModal, setShowModal] = useState(false);

  const [category, setCategory] = useState('todo');

  const { userData, userIsError, userIsLoading, userRefetch } = useGetUser();
  const { todosData, todosIsError, todosIsLoading, todosRefetch } =
    useGetTask();
  const {
    doneTodosodosData,
    doneTodosodosIsError,
    doneTodosodosIsLoading,
    doneTodosodosRefetch,
  } = useGetDoneTask();

  if (userIsError || todosIsError || doneTodosodosIsError) {
    return <Redirect to="/error" />;
  }

  if (!userIsLoading && !userIsError && userData) {
    username = userData.userName;
  }

  if (!todosIsLoading && !todosIsError && todosData) {
    todos = todosData;
  }

  if (!doneTodosodosIsLoading && !doneTodosodosIsError && doneTodosodosData) {
    doneTodos = doneTodosodosData;
  }

  const showAddTaskModal = () => {
    setShowModal(true);
  };

  const changeCategoryHandler = (categoryTitle: string): void => {
    setCategory(categoryTitle);
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    userRefetch().then(() => {
      todosRefetch().then(() => {
        doneTodosodosRefetch().then(() => {
          event.detail.complete();
        });
      });
    });
  }

  return (
    <Fragment>
      <AddTaskModal isOpen={showModal} setShowModal={setShowModal} />
      <SideMenu />
      <IonPage id="home">
        <Header />
        <IonContent fullscreen>
          <section className={classes['home']}>
            <Refresher disabled={isDrag} onRefresh={doRefresh} />
            <div className={classes['content-container']}>
              <IonText className={classes['title']}>
                What's up, {username}!
              </IonText>
              <div className={classes['category-container']}>
                <IonText className={classes['category-title']}>
                  Categories
                </IonText>
                <CategoryList
                  loading={false}
                  doneLength={doneTodos.length}
                  taskLength={todos.length}
                  onClick={changeCategoryHandler}
                />
              </div>
              <ShowTodos
                category={category}
                todosData={todos}
                doneData={doneTodos}
                isLoading={todosIsLoading}
              />
              <AddTaskButton
                isLoading={todosIsLoading || userIsLoading}
                onClick={showAddTaskModal}
              />
            </div>
          </section>
        </IonContent>
      </IonPage>
    </Fragment>
  );
};

export default HomePage;
