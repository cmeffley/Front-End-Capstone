import React from 'react';
import PropTypes from 'prop-types';
import WorkoutsForm from '../components/WorkoutsForm';

function WorkoutsFormView({ coach, athlete }) {
  return (
    <div>
      <WorkoutsForm
        formTitle='Create Workout'
        coach={coach}
        athlete={athlete}
      />
    </div>
  );
}

WorkoutsFormView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default WorkoutsFormView;
