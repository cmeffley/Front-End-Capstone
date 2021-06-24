import React from 'react';
import PropTypes from 'prop-types';
import RacesForm from '../components/RacesForm';

function RacesFormView({ coach, athlete }) {
  return (
    <div className='racesformContainer'>
      <RacesForm
        formTitle='Add Race'
        coach={coach}
        athlete={athlete}
      />
    </div>
  );
}

RacesFormView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RacesFormView;
