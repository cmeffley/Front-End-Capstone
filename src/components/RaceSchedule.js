import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  coach, athlete, setRaces, ...raceInfo
}) {
  const [editRace, setEditRace] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditRace((prevState) => !prevState);
        break;
      case 'athleteDelete':
        deleteRaceAthlete(raceInfo.firebaseKey, athlete.athleteUid).then((racesArray) => setRaces(racesArray));
        break;
      case 'coachDelete':
        deleteRaceCoach(raceInfo.firebaseKey, coach.coachUid).then((racesArray) => setRaces(racesArray));
        break;
      default:
        console.warn('Keep Being Awesome!');
    }
  };
  const goToWorkouts = () => {
    history.push(`/raceschedule/${raceInfo.raceId}`);
  };

  return (
    <div>
      <Card>
        <CardTitle tag='h5'>{raceInfo.raceName}</CardTitle>
        <CardBody>
          <CardText>{raceInfo.raceDistance}</CardText>
          <CardText>{raceInfo.raceDate}</CardText>
          <CardText><a href={raceInfo.raceLink}>Race Website</a></CardText>
          <Button onClick={goToWorkouts}>See Race Workout Program</Button>
          {coach ? <Button color='success' onClick={() => handleClick('coachDelete')}>Delete</Button>
            : <Button color='danger' onClick={() => handleClick('athleteDelete')}>Delete</Button>}
          <Button color='info' onClick={() => handleClick('edit')}>
            {editRace ? 'Close Form' : 'Edit Race'}
          </Button>
          {
            editRace && <RacesForm
              formTitle='Edit Race'
              {...raceInfo}
              coach={coach}
              athlete={athlete}
              setRaces={setRaces}
              setEditRace={setEditRace}
              />
          }
        </CardBody>
      </Card>
    </div>
  );
}

RaceSchedule.propTypes = {
  raceInfo: PropTypes.object,
  athlete: PropTypes.any,
  coach: PropTypes.any,
  setRaces: PropTypes.func
};

export default RaceSchedule;
