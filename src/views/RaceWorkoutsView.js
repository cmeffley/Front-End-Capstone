import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';
import WorkoutCard from '../components/WorkoutCard';
import AveragesView from './AveragesView';

function RaceWorkoutsView({ coach, athlete }) {
  const [race, setRace] = useState({});
  const [raceWorkout, setRaceWorkout] = useState([]);
  const isMounted = useRef(false);
  const history = useHistory();

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
      <AveragesView />
      <Button onClick={() => history.push('/averages')}>See Workout Data</Button>
    </div>
  );
}

RaceWorkoutsView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RaceWorkoutsView;
