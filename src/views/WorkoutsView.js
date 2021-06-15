import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WorkoutCard from '../components/WorkoutCard';
import { getWorkoutsCoach, getWorkoutsAthlete } from '../helpers/data/workoutsData';

function WorkoutsView({ coach, athlete }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (coach !== null && athlete === false) {
      getWorkoutsCoach(coach.coachUid).then((response) => setWorkouts(response));
    } else if (athlete !== null && coach === false) {
      getWorkoutsAthlete(athlete.athleteUid).then((response) => setWorkouts(response));
    }
  }, []);
  return (
    <div>
      {workouts.map((workoutInfo) => (
        <WorkoutCard
          key={workoutInfo.firebaseKey}
          {...workoutInfo}
          coach={coach}
          athlete={athlete}
        />
      ))}
    </div>
  );
}

WorkoutsView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default WorkoutsView;
