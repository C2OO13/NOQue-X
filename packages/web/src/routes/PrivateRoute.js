import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ ...props }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const checkingAuthStatus = useSelector(state => state.loading['auth/CHECK_AUTH']);
  // https://stackoverflow.com/a/56175010/11922517

  return checkingAuthStatus ? (
    <></>
  ) : isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  );
};

export default PrivateRoute;
