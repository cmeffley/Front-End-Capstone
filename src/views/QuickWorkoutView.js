import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuickWorkout from '../components/QuickWorkout';
import { getQuickWorkouts } from '../helpers/data/quickWorkoutsData';

function QuickWorkoutView({ coach, athlete }) {
  const [quickWork, setQuickWork] = useState([]);
  useEffect(() => {
    getQuickWorkouts().then((response) => setQuickWork(response));
  }, []);

  return (
    <div>
      {quickWork.map((quickObject) => (
        <QuickWorkout
          key={quickObject.firebaseKey}
          {...quickObject}
          coach={coach}
          athlete={athlete}
        />
      ))}
    </div>
  );
}

QuickWorkoutView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default QuickWorkoutView;
