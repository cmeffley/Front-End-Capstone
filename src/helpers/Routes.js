import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import RaceScheduleView from '../views/RaceScheduleView';
import LandingView from '../views/LandingView';
import RacesFormView from '../views/RacesFormView';
import WorkoutsView from '../views/WorkoutsView';

function Routes({ coach, athlete }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <LandingView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/raceSchedule" component={() => <RaceScheduleView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/addrace" component={() => <RacesFormView
          coach={coach} athlete={athlete}/>} />
        <Route exact path="/workouts" component={() => <WorkoutsView
          coach={coach} athlete={athlete}/>} />
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};
export default Routes;
