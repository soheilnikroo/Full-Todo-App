import { Fragment, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { Home, LoginPage, SigninPage, WelcomePage } from '../pages';

const routse = [
  {
    path: '/home',
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
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      {routse.map((route, index) => {
        if (route.private) {
          if (isAuthenticated) {
            return <Route key={route.path + index} {...route} />;
          } else {
            return <Redirect key={route.path + index} to="/welcome" />;
          }
        } else {
          if (isAuthenticated) {
            return <Redirect key={route.path + index} to="/home" />;
          }
          return <Route key={route.path + index} {...route} />;
        }
      })}
    </Fragment>
  );
};

export default Routes;
