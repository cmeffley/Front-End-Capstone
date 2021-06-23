import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleWorkout } from '../helpers/data/workoutsData';

function SingleWorkout() {
  const [oneWorkout, setOneWorkout] = useState({});

  const { workoutFirebaseKey } = useParams();
  useEffect(() => {
    getSingleWorkout(workoutFirebaseKey).then((response) => setOneWorkout(response.data));
  }, []);

  return (
    <div>
      <h1>{oneWorkout.plannedWork}</h1>
    </div>
  );
}

export default SingleWorkout;
