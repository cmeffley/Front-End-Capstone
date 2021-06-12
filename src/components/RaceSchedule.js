import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import RacesForm from './RacesForm';
import { deleteRaceAthlete, deleteRaceCoach } from '../helpers/data/raceData';

function RaceSchedule({
  coach, athlete, setAthleteRaces, ...raceInfo
}) {
  const [editRace, setEditRace] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditRace((prevState) => !prevState);
        break;
      case 'athleteDelete':
        deleteRaceAthlete(raceInfo.firebaseKey, athlete.uid).then((racesArray) => setAthleteRaces(racesArray));
        break;
      case 'coachDelete':
        deleteRaceCoach(raceInfo.firebaseKey, coach.uid).then((racesArray) => setAthleteRaces(racesArray));
        break;
      default:
        console.warn('Keep Being Awesome!');
    }
  };

  return (
    <div>
      <Card>
        <CardTitle tag='h5'>{raceInfo.raceName}</CardTitle>
        <CardBody>
          <CardText>{raceInfo.raceDistance}</CardText>
          <CardText>{raceInfo.raceDate}</CardText>
          <CardText><a href={raceInfo.raceLink}>Race Website</a></CardText>
          {coach ? <Button color='success' onClick={() => handleClick('coachDelete')}>Delete</Button>
            : <Button color='danger' onClick={() => handleClick('athleteDelete')}>Delete</Button>}
          <Button color='info' onClick={() => handleClick('edit')}>
            {editRace ? 'Close Form' : 'Edit Form'}
          </Button>
          {
            editRace && <RacesForm
              formTitle='Edit Race'
              {...raceInfo}
              setAthleteRaces={setAthleteRaces}
              />
          }
        </CardBody>
      </Card>
    </div>
  );
}

RaceSchedule.propTypes = {
  raceInfo: PropTypes.array,
  athlete: PropTypes.any,
  coach: PropTypes.any,
  setAthleteRaces: PropTypes.func
};

export default RaceSchedule;
