import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaceScheduleView from '../views/RaceScheduleView';
import Users from '../views/Users';
import LandingView from '../views/LandingView';

function Routes({ coach, athlete }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <LandingView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/raceSchedule" component={() => <RaceScheduleView
          coach={coach} athlete={athlete} />} />
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
