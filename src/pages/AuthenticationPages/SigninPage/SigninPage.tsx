import {
  InputChangeEventDetail,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonToast,
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { signinRequest } from '../../../api';
import { signinImage } from '../../../assets';
import {
  BackButton,
  EmailInput,
  Loader,
  Logo,
  PasswordInput,
  PrimaryButton,
} from '../../../components';
import { useForm } from '../../../hooks';
import { validations } from '../../../util';
import { informationCircle, star } from 'ionicons/icons';

// import css
import classes from './style/SigninPage.module.css';

const SigninPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [emailInput, setEmailInput, emailError, setEmialError] = useForm(
    validations.emailValidationOptions
  );

  const [passwordInput, setPasswordInput, passwordError, setPasswordError] =
    useForm(validations.passwordValidationOptions);

  const [
    confrimPasswordInput,
    setConfrimPasswordInput,
    confrimPasswordError,
    setConfrimPasswordError,
  ] = useForm(validations.confirmPasswordValidation(passwordInput));

  const [showToast, setShowToast] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const history = useHistory();

  const gotoLoginPage = (): void => {
    history.replace('/auth/login');
  };

  const inputChangeHandler = (
    event: CustomEvent<InputChangeEventDetail>,
    type: string
  ): void => {
    if (type === 'password') {
      setPasswordInput(event.detail.value);
      setConfrimPasswordError('');
    } else if (type === 'confirmPassword') {
      setConfrimPasswordInput(event.detail.value);
    } else {
      setEmailInput(event.detail.value);
    }
  };

  const checkFormValidation = useCallback(() => {
    if (
      emailError !== '' ||
      passwordError !== '' ||
      !emailInput ||
      !passwordInput ||
      passwordInput !== confrimPasswordInput
    ) {
      if (passwordInput !== confrimPasswordInput) {
        setConfrimPasswordError('Password should be the same.');
      }
      setIsFormValid(false);
    } else {
      setConfrimPasswordError('');
      setIsFormValid(true);
    }
  }, [
    emailError,
    passwordError,
    emailInput,
    passwordInput,
    confrimPasswordInput,
    setConfrimPasswordError,
  ]);

  useEffect(() => {
    setIsFormValid(false);
    let validationTimer = setTimeout(() => {
      checkFormValidation();
    }, validations.timeCheck);

    return () => {
      clearTimeout(validationTimer);
    };
  }, [
    emailInput,
    passwordInput,
    emailError,
    passwordError,
    checkFormValidation,
    confrimPasswordInput,
    confrimPasswordError,
  ]);

  const handleServerError = (errorMessage: any, isEmailUse: boolean): void => {
    isEmailUse && setShowToast(true);
    setEmialError(errorMessage);
  };

  const signupHandler = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await signinRequest.post('/', {
        userName: email.split('@')[0],
        email: email,
        password: password,
      });

      if (response.status === 201) {
        console.log(response.data);
        history.replace('/');
      } else {
        handleServerError(response.data.userFriendError.email, true);
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response !== undefined) {
        handleServerError(error.response.data.userFriendError.email, true);
      } else {
        handleServerError(
          'Something went wrong. Please try again later.',
          false
        );
      }
    }
    setIsLoading(false);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    signupHandler(emailInput, passwordInput);
  };

  return (
    <IonPage>
      {!isLoading && (
        <IonHeader
          slot="fixed"
          className={`ion-no-border ${classes['header']}`}
        >
          <Logo />
          <BackButton onClick={gotoLoginPage} />
        </IonHeader>
      )}
      <IonContent fullscreen>
        <IonToast
          animated={true}
          keyboardClose={true}
          color="secondary"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Click the icon to Log In"
          position="top"
          duration={5000}
          buttons={[
            {
              side: 'start',
              icon: informationCircle,
              handler: () => {
                history.replace('/auth/login');
              },
            },
          ]}
        />
        {isLoading ? (
          <Loader
            spinner="crescent"
            keyboardClose
            animated
            isOpen={isLoading}
            message="Please wait... "
          />
        ) : (
          <div slot="fixed" className={classes['content']}>
            <IonImg className={classes['signin-img']} src={signinImage} />
            <form onSubmit={formSubmitHandler} className={classes['form']}>
              <div className={classes['input-container']}>
                <EmailInput
                  onChange={(event) => {
                    inputChangeHandler(event, 'email');
                  }}
                  errorMessage={emailError}
                />
                <PasswordInput
                  onChange={(event: any) => {
                    inputChangeHandler(event, 'password');
                  }}
                  errorMessage={passwordError}
                />
                <PasswordInput
                  onChange={(event: any) => {
                    inputChangeHandler(event, 'confirmPassword');
                  }}
                  iconSrc={false}
                  title="Confirm Password"
                  errorMessage={confrimPasswordError}
                />
              </div>
              <div className={classes['button-wrapper']}>
                <PrimaryButton
                  disabled={!isFormValid}
                  type="submit"
                  text="Create Account"
                />
              </div>
            </form>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SigninPage;
