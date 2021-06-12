import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RaceSchedule from '../components/RaceSchedule';
import { getRacesAthlete, getRacesCoach } from '../helpers/data/raceData';

function RaceScheduleView({ coach, athlete }) {
  const [athleteRaces, setAthleteRaces] = useState([]);
  useEffect(() => {
    if (coach !== null && athlete === false) {
      getRacesCoach(coach.uid).then((response) => setAthleteRaces(response));
    } else if (coach === false) {
      getRacesAthlete(athlete.uid).then((response) => setAthleteRaces(response));
    }
  }, []);

  return (
    <div>
      {athleteRaces.map((raceInfo) => (
        <RaceSchedule
          key={raceInfo.firebaseKey}
          {...raceInfo}
          coach={coach}
          athlete={athlete}
          setAthleteRaces={setAthleteRaces}
        />
      ))}
    </div>
  );
}

RaceScheduleView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RaceScheduleView;
