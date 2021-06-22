import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import RaceScheduleView from '../views/RaceScheduleView';
import LandingView from '../views/LandingView';
import RacesFormView from '../views/RacesFormView';
// import WorkoutsView from '../views/WorkoutsView';
import WorkoutsFormView from '../views/WorkoutsFormView';
import RaceWorkoutsView from '../views/RaceWorkoutsView';
import EditQuickWorkoutsView from '../views/EditQuickWorkoutsView';
import AveragesView from '../views/AveragesView';
// import QuickWorkoutView from '../views/QuickWorkoutView';

function Routes({ coach, athlete }) {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={() => <LandingView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/raceSchedule" component={() => <RaceScheduleView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/raceSchedule/:raceId" component={() => <RaceWorkoutsView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/addrace" component={() => <RacesFormView
          coach={coach} athlete={athlete} />} />
        <Route exact path="/averages" component={() => <AveragesView
          coach={coach} athlete={athlete} />} />
        {/* <Route exact path="/workouts" component={() => <WorkoutsView
          coach={coach} athlete={athlete} />} /> */}
        {/* <Route exact path="/quickWorkout" component={() => <QuickWorkoutView
          coach={coach} athlete={athlete} />} /> */}
        <PrivateRoute exact path="/addworkouts"
          coach={coach}
          component={() => <WorkoutsFormView
          coach={coach} athlete={athlete} />}
        />
        <PrivateRoute exact path="/editquickworkouts"
          coach={coach}
          component={() => <EditQuickWorkoutsView
          coach={coach}/>}
        />
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};
export default Routes;
