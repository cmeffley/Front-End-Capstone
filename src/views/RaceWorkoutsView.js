import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';
import WorkoutCard from '../components/WorkoutCard';

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
        const getSortedWorkouts = response.workout.sort((a, b) => Date.parse(a.startDay) - Date.parse(b.startDay));
        setRaceWorkout(getSortedWorkouts);
      }
      isMounted.current = true;
    });
  }, []);

  return (
    <div className='workoutContainer'>
      <header>
        <h1>{race.raceName}</h1>
      </header>
      <br />
      <h6>Workout Program starts: {race.startDate} and finishes on {race.endDate}</h6>
      <Button id='otherbuttoncolor' onClick={() => history.push(`/raceSchedule/${race.firebaseKey}/averages`)}>See Training Data</Button>
      <div>
        { raceWorkout.length <= 0 ? 'No Workouts Created. Your Coach will add some soon.' : raceWorkout.map((raceWorkoutObject) => <WorkoutCard
            key={raceWorkoutObject.firebaseKey}
            {...raceWorkoutObject}
            race={race}
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
