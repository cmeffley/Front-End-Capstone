import React from 'react';
import PropTypes from 'prop-types';
import LandingPage from '../components/LandingPage';

function LandingView({ coach, athlete }) {
  return (
    <div className='landingContainer'>
      <LandingPage
        coach={coach}
        athlete={athlete}
      />
    </div>
  );
}

LandingView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};

export default LandingView;
