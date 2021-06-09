import React from 'react';
import PropTypes from 'prop-types';
// import RaceSchedule from '../components/RaceSchedule';
// import { getRacesAthlete, getRacesCoach } from '../helpers/data/raceData';

function RaceScheduleView({ coach }) {
  // const [athleteRaces, setAthleteRaces] = useState([]);
  console.warn(coach);
  // useEffect((authed) => {
  //   if (coach === true && athlete === false) {
  //     getRacesCoach(authed.uid).then((response) => setAthleteRaces(response));
  //   } else if (coach === false) {
  //     getRacesAthlete(authed.uid).then((response) => setAthleteRaces(response));
  //   }
  // }, []);

  return (
    <div>
      {/* {athleteRaces.map((raceInfo) => (
        <RaceSchedule
          key={raceInfo.firebaseKey}
          {...raceInfo}
          coach={coach}
          athlete={athlete}
        />
      ))} */}
    </div>
  );
}

RaceScheduleView.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any
};

export default RaceScheduleView;
