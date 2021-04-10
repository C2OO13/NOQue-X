import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Classes from '../pages/Classes/Classes';
import Login from '../pages/Login/Login';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import RestrictedRoute from './RestrictedRoute';
import Classroom from '../pages/Classroom/Classroom';

const MainRouter = () => (
  <BrowserRouter>
    <Switch>
      {/* Restricted Routes */}
      <RestrictedRoute path="/" exact component={Login} />

      {/* Private Routes */}
      <PrivateRoute path="/classes" component={Classes} />
      <PrivateRoute path="/classroom" component={Classroom} />

      {/* Private Routes */}
      <PublicRoute component={() => <div>404, page not found!</div>} />
    </Switch>
  </BrowserRouter>
);

export default MainRouter;
