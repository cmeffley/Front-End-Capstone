import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import seeWorkoutsForRace from '../helpers/data/raceWorkoutsData';
import WorkoutCard from '../components/WorkoutCard';

function RaceWorkoutsView({ coach, athlete }) {
  const [race, setRace] = useState({});
  const [raceWorkout, setRaceWorkout] = useState([]);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { raceId } = useParams();
  useEffect(() => {
    seeWorkoutsForRace(raceId).then((response) => {
      if (isMounted.current) {
        setRace(response.race);
        setRaceWorkout(response.workout);
      }
      isMounted.current = true;
    });
  }, []);
  return (
    <div>
      <header>
        <h1>{race.raceName}</h1>
      </header>
      <br />
      <h6>Workout Program starts: {race.startDate} and finishes on {race.endDate}</h6>
    <div>
      { raceWorkout.length <= 0 ? 'No Workout Created' : raceWorkout.map((raceWorkoutObject) => <WorkoutCard
          key={raceWorkoutObject.firebaseKey}
          {...raceWorkoutObject}
          raceId={raceId}
          coach={coach}
          athlete={athlete}
          setRaceWorkout={setRaceWorkout}
          />)}
    </div>
    </div>
  );
}

RaceWorkoutsView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RaceWorkoutsView;
