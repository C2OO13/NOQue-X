import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RestrictedRoute from './RestrictedRoute';
import Classroom from '../pages/Classroom/Classroom';
import Question from '../pages/Question/Question';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* Restricted Routes */}
      <RestrictedRoute path="/" exact component={Login} />

      {/* Private Routes */}
      <PrivateRoute path="/classes" exact component={Classes} />
      <PrivateRoute path="/classes/:classId" component={Classroom} />

      <PrivateRoute path="/questions/:questionId" component={Question} />

      {/* Private Routes */}
      <PublicRoute component={() => <div>404, page not found!</div>} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
