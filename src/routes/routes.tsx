import { Fragment, useContext } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import {
  ErrorPage,
  Home,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  SetImagePage,
  SigninPage,
  WelcomePage,
} from '../pages';

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Fragment>
      <Switch>
        {isAuthenticated ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Route exact path="/" component={WelcomePage} />
        )}
        {isAuthenticated ? (
          <Route exact path="/profile" component={ProfilePage} />
        ) : (
          <Route exact path="/profile">
            <Redirect to="/auth/login"></Redirect>
          </Route>
        )}
        {isAuthenticated ? (
          <Route exact path="/home" component={Home} />
        ) : (
          <Route exact path="/home">
            <Redirect to="/auth/login"></Redirect>
          </Route>
        )}
        <Route exact path="/welcome" component={WelcomePage} />
        <Route exact path="/auth/login" component={LoginPage} />
        <Route exact path="/auth/signin" component={SigninPage} />
        {isAuthenticated ? (
          <Route exact path="/setimage" component={SetImagePage} />
        ) : (
          <Route exact path="/setimage">
            <Redirect to="/auth/login"></Redirect>
          </Route>
        )}
        <Route exact path="/error" component={ErrorPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
