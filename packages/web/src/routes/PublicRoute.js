import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ ...props }) => {
  return <Route {...props} />;
};

export default PrivateRoute;
