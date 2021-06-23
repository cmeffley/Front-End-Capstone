import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RaceSchedule from '../components/RaceSchedule';
import { getRacesAthlete, getRacesCoach } from '../helpers/data/raceData';

function RaceScheduleView({ coach, athlete }) {
  const [races, setRaces] = useState([]);
  useEffect(() => {
    if (coach !== null && athlete === false) {
      getRacesCoach(coach.coachUid).then((response) => setRaces(response));
    } else if (athlete !== null && coach === false) {
      getRacesAthlete(athlete.athleteUid).then((response) => setRaces(response));
    }
  }, []);

  return (
    <div className='raceviewContainer'>
      {races.map((raceInfo) => (
          <RaceSchedule
            key={raceInfo.firebaseKey}
            {...raceInfo}
            coach={coach}
            athlete={athlete}
            setRaces={setRaces}
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
