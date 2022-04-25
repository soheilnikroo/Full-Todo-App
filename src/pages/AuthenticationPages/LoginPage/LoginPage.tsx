import {
  InputChangeEventDetail,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
} from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BackButton,
  EmailInput,
  Logo,
  PasswordInput,
  PrimaryButton,
} from '../../../components';

import { loginImgae } from '../../../assets';

// import css
import classes from './style/LoginPage.module.css';

import { useForm } from '../../../hooks';
import {
  emailValidationOptions,
  passwordValidationOptions,
  timeCheck,
} from './util/validation';
import { loginRequest } from '../../../api';
import { useCookies } from 'react-cookie';

const LoginPage: React.FC = () => {
  const [emailInput, setEmailInput, emailError, setEmailError] = useForm(
    emailValidationOptions
  );

  const [passwordInput, setPasswordInput, passwordError, setPasswordError] =
    useForm(passwordValidationOptions);

  const [isFormValid, setIsFormValid] = useState(false);

  const [cookies, setCookie] = useCookies(['access_token']);

  const history = useHistory();

  const goToWelcomePage = (): void => {
    history.replace('/welcome');
  };

  const goToHomePage = (): void => {
    history.replace('/');
  };

  const checkFormValidation = useCallback(() => {
    if (
      emailError !== '' ||
      passwordError !== '' ||
      !emailInput ||
      !passwordInput
    ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError, emailInput, passwordInput]);

  const inputChangeHandler = (
    event: CustomEvent<InputChangeEventDetail>,
    type: string
  ): void => {
    if (type === 'password') {
      setPasswordInput(event.detail.value);
    } else {
      setEmailInput(event.detail.value);
    }
  };

  useEffect(() => {
    setIsFormValid(false);
    let validationTimer = setTimeout(() => {
      checkFormValidation();
    }, timeCheck);

    return () => {
      clearTimeout(validationTimer);
    };
  }, [
    emailInput,
    passwordInput,
    emailError,
    passwordError,
    checkFormValidation,
  ]);

  const HandleServerError = () => {
    setEmailError('Email or password is incorrect');
    setPasswordError('Email or password is incorrect');
  };

  const loginHandler = async () => {
    try {
      const response = await loginRequest.post('/', {
        email: emailInput,
        password: passwordInput,
      });

      if (response.status === 200) {
        setCookie('access_token', response.data.token);
        goToHomePage();
        console.log(cookies.access_token);
      } else {
        HandleServerError();
      }
    } catch (error) {
      HandleServerError();
    }
  };

  const formSubmitionHandler = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    loginHandler();
  };

  const gotoSigninPage = (): void => {
    history.push('/auth/signin');
  };

  return (
    <IonPage>
      <IonHeader slot="fixed" className={`ion-no-border ${classes.header}`}>
        <Logo />
        <BackButton onClick={goToWelcomePage} />
      </IonHeader>
      <IonContent fullscreen>
        <div slot="fixed" className={classes['login']}>
          <IonImg className={classes['login-img']} src={loginImgae} />
          <form
            onSubmit={formSubmitionHandler}
            className={classes['login-form']}
          >
            <div className={classes['login-inputs']}>
              <EmailInput
                errorMessage={emailError}
                onChange={(event) => {
                  inputChangeHandler(event, 'email');
                }}
              />
              <PasswordInput
                iconSrc
                errorMessage={passwordError}
                onChange={(event) => {
                  inputChangeHandler(event, 'password');
                }}
              />
            </div>
            <div className={classes['button-wrapper']}>
              <PrimaryButton
                disabled={!isFormValid}
                type="submit"
                text="Log In"
              />
            </div>
            <IonFooter className={`ion-no-border ${classes['footer']}`}>
              <IonText className={classes['footer-text']}>
                Forget your password?
                <span
                  role="button"
                  tabIndex={0}
                  onClick={gotoSigninPage}
                  className={classes['create-account']}
                >
                  Create Account
                </span>
              </IonText>
            </IonFooter>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
