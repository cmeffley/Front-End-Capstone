import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';
import WorkoutCard from '../components/WorkoutCard';

function RaceWorkoutsView({ coach, athlete }) {
  const [race, setRace] = useState({});
  const [raceWorkout, setRaceWorkout] = useState([]);
  const [sorted, setSorted] = useState([]);
  const isMounted = useRef(false);
  const history = useHistory();
  console.warn('hello', race, raceWorkout);
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

  // raceWorkout.sort((a, b) => Date.parse(b.startDay) - Date.parse(a.startDay));
  // raceWorkout.sort((a, b) => Date.parse(b.startDay) > Date.parse(a.startDay));
  const sortWorkouts = () => {
    const getsortedWorkouts = raceWorkout.sort((a, b) => {
      // const aSplit = a.startDay.split('-');
      // const bSplit = b.startDay.split('-');
      const aDate = Date.parse(a.startDay);
      const bDate = Date.parse(b.startDay);
      console.warn(bDate - aDate);
      return bDate - aDate;
    });
    console.warn('stuff', getsortedWorkouts);
    setSorted(getsortedWorkouts);
    console.warn('sorted', sorted);
  };

  return (
    <div>
      <header>
        <h1>{race.raceName}</h1>
      </header>
      <br />
      <h6>Workout Program starts: {race.startDate} and finishes on {race.endDate}</h6>
      <Button onClick={sortWorkouts}>Order Workouts by Date</Button>
      <div>
        { raceWorkout.length <= 0 ? 'No Workout Created' : raceWorkout.map((raceWorkoutObject) => <WorkoutCard
            key={raceWorkoutObject.firebaseKey}
            {...raceWorkoutObject}
            race={race}
            raceId={raceId}
            coach={coach}
            athlete={athlete}
            // raceWorkout={raceWorkout}
            setRaceWorkout={setRaceWorkout}
            />)}
      </div>
      <Button onClick={() => history.push(`/raceSchedule/${race.firebaseKey}/averages`)}>See Workout Data</Button>
    </div>
  );
}

RaceWorkoutsView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RaceWorkoutsView;
