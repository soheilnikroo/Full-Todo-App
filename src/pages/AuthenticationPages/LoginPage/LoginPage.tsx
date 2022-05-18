import {
  InputChangeEventDetail,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
} from '@ionic/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BackButton,
  EmailInput,
  Loader,
  Logo,
  PasswordInput,
  PrimaryButton,
} from '../../../components';

import { loginImgae } from '../../../assets';

// import css
import classes from './style/LoginPage.module.css';

import { useForm } from '../../../hooks';
import { loginRequest } from '../../../api';
import { useCookies } from 'react-cookie';

import { validations } from '../../../util';
import { AuthContext } from '../../../context/auth-context';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);

  const [emailInput, setEmailInput, emailError, setEmailError] = useForm(
    validations.emailValidationOptions
  );

  const [passwordInput, setPasswordInput, passwordError, setPasswordError] =
    useForm(validations.passwordValidationOptions);

  const [isLoading, setIsLoading] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const [cookies, setCookie] = useCookies(['access_token']);

  const history = useHistory();

  const goToWelcomePage = (): void => {
    history.replace('/welcome');
  };

  const goToHomePage = (): void => {
    login();
    history.replace('/home');
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
  ]);

  const HandleServerError = (errorMessage: any) => {
    setEmailError(errorMessage);
    setPasswordError(errorMessage);
  };

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const response = await loginRequest.post('/', {
        email: emailInput,
        password: passwordInput,
      });
      if (response.status === 200) {
        setCookie('access_token', response.data.token);
        goToHomePage();
      }
    } catch (error: any) {
      if (error.response) {
        HandleServerError(error.response.data.error);
      }
    }
    setIsLoading(false);
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
      {!isLoading && (
        <IonHeader
          slot="fixed"
          className={`ion-no-border ${classes['header']}`}
        >
          <Logo />
          <BackButton onClick={goToWelcomePage} />
        </IonHeader>
      )}
      <IonContent fullscreen>
        {isLoading ? (
          <Loader
            spinner="crescent"
            keyboardClose
            animated
            isOpen={isLoading}
            message="Please wait... "
          />
        ) : (
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
                  onChange={(event: any) => {
                    inputChangeHandler(event, 'password');
                  }}
                />
              </div>
              <IonFooter className={`ion-no-border ${classes['footer']}`}>
                <div className={classes['button-wrapper']}>
                  <PrimaryButton
                    disabled={!isFormValid}
                    type="submit"
                    text="Log In"
                  />
                </div>
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
        )}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
