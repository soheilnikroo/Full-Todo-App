import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home, LoginPage, SigninPage, WelcomePage } from '../pages';

const routse = [
  {
    path: '/',
    component: Home,
    exact: true,
    private: true,
  },
  {
    path: '/',
    component: WelcomePage,
    exact: true,
    private: false,
  },
  {
    path: '/welcome',
    component: WelcomePage,
    exact: true,
    private: false,
  },
  {
    path: '/profile',
    component: Home,
    exact: true,
    private: true,
  },
  {
    path: '/auth/login',
    component: LoginPage,
    exact: true,
    private: false,
  },
  {
    path: '/auth/signin',
    component: SigninPage,
    exact: true,
    private: false,
  },
  {
    path: '/404',
    component: Home,
    exact: true,
    private: false,
  },
];

const Routes = () => {
  return (
    <Fragment>
      {routse.map((route) => {
        if (route.private) {
          //Todo: check if user is logged in
          return null;
        } else {
          return <Route key={route.path} {...route} />;
        }
      })}
    </Fragment>
  );
};

export default Routes;
