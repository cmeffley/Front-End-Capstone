import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RacesForm from '../components/RacesForm';
import { getRacesCoach, getRacesAthlete } from '../helpers/data/raceData';

function RacesFormView({ coach, athlete }) {
  const [editRaces, setEditRaces] = useState([]);
  console.warn(editRaces);
  useEffect(() => {
    if (coach !== null && athlete === false) {
      getRacesCoach(coach.uid).then((response) => setEditRaces(response));
    } else if (coach === false) {
      getRacesAthlete(athlete.uid).then((response) => setEditRaces(response));
    }
  }, []);
  return (
    <div>
      <RacesForm
        coach={coach}
        athlete={athlete}
        editRaces={editRaces}
        setEditRaces={setEditRaces}
      />
    </div>
  );
}

RacesFormView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RacesFormView;
