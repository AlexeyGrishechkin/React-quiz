import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import { useSelector, useDispatch } from 'react-redux';
import Logout from './components/Logout/Logout';
import { autoLogin } from './store/actions/auth';

const App = () => {
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();
  dispatch(autoLogin());

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' exact component={QuizList} />
      <Redirect to={'/'} />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={QuizList} />
        <Redirect to={'/'} />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
};

export default withRouter(App);
