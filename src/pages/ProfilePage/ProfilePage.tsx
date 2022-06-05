import {
  InputChangeEventDetail,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
} from '@ionic/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  BackButton,
  Loader,
  LogoutButton,
  ProfileImage,
  ProfileImageSkeletone,
  Statistic,
  StatisticSkeleton,
} from '../../components';
import { AuthContext } from '../../context/auth-context';
import {
  useGetAllTasks,
  useGetDoneTask,
  useGetTask,
  useGetUser,
  useUpdateUser,
} from '../../hooks';

// import css
import classes from './style/ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const { todosData, todosIsLoading } = useGetTask();
  const { doneTodosodosData, doneTodosodosIsLoading } = useGetDoneTask();
  const { allTodosData, allTodosIsLoading } = useGetAllTasks();
  const { userData, userRefetch, userIsLoading, userIsError } = useGetUser();

  const { logout } = useContext(AuthContext);

  const [changeUserName, setChangeUserName] = useState(true);
  const [newUserName, setNewUserName] = useState<any>();
  const [newImageUrl, setNewImageUrl] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserNameBlur, setIsUserNameBlur] = useState(false);

  useEffect(() => {
    if (userData && !userIsLoading && !userIsError) {
      setNewUserName(userData.userName);
      setNewImageUrl(userData.imageUrl);
    }
  }, [userData]);

  const history = useHistory();

  const updateUserName = useUpdateUser();

  const gotoTodoPage = (): void => {
    if (changeUserName) {
      setIsLoading(true);
      updateUserName.mutate({
        userName: newUserName,
      });
      userRefetch().then(() => {
        setIsLoading(false);
        history.goBack();
      });
    } else {
      history.goBack();
    }
  };

  const usernameChangeHandler = (
    event: CustomEvent<InputChangeEventDetail>
  ): void => {
    setNewUserName(event.detail.value);
  };

  useEffect(() => {
    if (userData?.userName === newUserName) {
      if (changeUserName) {
        setChangeUserName(false);
      }
    } else {
      if (!changeUserName) {
        setChangeUserName(true);
      }
    }
  }, [newUserName]);

  const logoutHandler = (): void => {
    logout();
  };

  return (
    <IonPage>
      {isLoading && (
        <Loader
          spinner="crescent"
          keyboardClose
          animated
          isOpen={isLoading}
          message="Updating user name..."
        />
      )}
      {!isLoading && (
        <IonContent>
          <IonHeader className="ion-no-border">
            <BackButton onClick={gotoTodoPage} />
          </IonHeader>
          <div className={classes['content']}>
            <div className={classes['profile']}>
              {userIsLoading ? (
                <ProfileImageSkeletone />
              ) : (
                <ProfileImage imageSrc={newImageUrl} />
              )}
              {!userIsLoading && (
                <IonInput
                  onClick={() => setIsUserNameBlur(false)}
                  type="text"
                  inputMode="text"
                  onIonChange={usernameChangeHandler}
                  readonly={isUserNameBlur}
                  onBlur={() => setIsUserNameBlur(true)}
                  className={classes['profile-name']}
                  value={newUserName}
                />
              )}
            </div>
            <div className={classes['statistic']}>
              {allTodosIsLoading || todosIsLoading || doneTodosodosIsLoading ? (
                <StatisticSkeleton />
              ) : (
                <Fragment>
                  <Statistic title="Todo's" number={todosData?.length} />
                  <Statistic title="Done" number={doneTodosodosData?.length} />
                  <Statistic
                    title="Pending"
                    number={allTodosData?.length - doneTodosodosData?.length}
                  />
                </Fragment>
              )}
            </div>
          </div>
          {!doneTodosodosIsLoading &&
            !todosIsLoading &&
            !allTodosIsLoading &&
            !userIsLoading && <LogoutButton onClick={logoutHandler} />}
        </IonContent>
      )}
    </IonPage>
  );
};

export default ProfilePage;
