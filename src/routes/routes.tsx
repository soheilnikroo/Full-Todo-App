import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../pages';

const routse = [
  {
    path: '/',
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
