import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import About from '../views/About';
import Users from '../views/Users';
import LandingView from '../views/LandingView';

function Routes({ coach, athlete }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <LandingView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/about" component={() => <About coach={coach} />} />
        <Route exact path="/users" component={() => <Users coach={coach} />} />
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};
export default Routes;
