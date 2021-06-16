import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, coach, ...rest }) => {
  const routeChecker = (taco) => (coach
    ? (<Component {...taco} coach={coach} />)
    : (<Redirect to={{ pathname: '/', state: { from: taco.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  coach: PropTypes.any
};

export default PrivateRoute;
