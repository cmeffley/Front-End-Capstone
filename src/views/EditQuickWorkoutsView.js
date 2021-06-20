import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getQuickWorkouts } from '../helpers/data/quickWorkoutsData';
import EditQuickWorkouts from '../components/EditQuickWorkouts';

function EditQuickWorkoutsView({ coach }) {
  const [addEditQuickWork, setAddEditQuickWork] = useState([]);

  useEffect(() => {
    getQuickWorkouts().then((response) => setAddEditQuickWork(response));
  }, []);

  return (
    <div>
      <EditQuickWorkouts
        formTitle='Add New Quick Workout'
        setAddEditQuickWork={setAddEditQuickWork}
      />
      {addEditQuickWork.map((addEditObject) => (
        <EditQuickWorkouts
        formTitle='Edit Quick Workouts'
        key={addEditObject.firebaseKey}
        {...addEditObject}
        setAddEditQuickWork={setAddEditQuickWork}
        coach={coach}
      />
      ))}
    </div>
  );
}

EditQuickWorkoutsView.propTypes = {
  coach: PropTypes.any
};

export default EditQuickWorkoutsView;
