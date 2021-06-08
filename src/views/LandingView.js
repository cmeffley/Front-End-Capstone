import React from 'react';
import PropTypes from 'prop-types';
import LandingPage from '../components/LandingPage';

function LandingView({ coach, athlete }) {
  return (
    <>
      <LandingPage
        coach={coach}
        athlete={athlete}
      />
    </>
  );
}

LandingView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
};

export default LandingView;
