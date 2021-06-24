import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';
import RacesForm from './RacesForm';
import { deleteRaceandWorkoutsCoach, deleteRaceandWorkoutsAthlete } from '../helpers/data/raceWorkoutsData';

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
        deleteRaceandWorkoutsAthlete(raceInfo.firebaseKey, athlete.athleteUid).then((racesArray) => setRaces(racesArray));
        break;
      case 'coachDelete':
        deleteRaceandWorkoutsCoach(raceInfo.firebaseKey, coach.coachUid).then((racesArray) => setRaces(racesArray));
        break;
      default:
        console.warn('Keep Being Awesome!');
    }
  };
  const goToWorkouts = () => {
    history.push(`/raceSchedule/${raceInfo.firebaseKey}`);
  };

  return (
    <div>
      <Card className='raceCard'>
        <CardTitle tag='h3'>{raceInfo.raceName}</CardTitle>
        <CardBody>
          <CardText tag='h5'>{raceInfo.raceDistance}</CardText>
          <CardText>{raceInfo.raceDate}</CardText>
          <CardText><a href={raceInfo.raceLink}>Race Website</a></CardText>
          <Button id='gotoworkbutton' onClick={goToWorkouts}
            disabled={new Date() > new Date(raceInfo.raceDate)}
          >See Race Workout Program</Button>
          <br/><br/>
          {coach ? <Button id='buttoncolor' floated='left' icon='trash alternative' onClick={() => handleClick('coachDelete')}></Button>
            : <Button id='buttoncolor' floated='left' icon='trash alternate' onClick={() => handleClick('athleteDelete')}></Button>}
          <Button id='buttoncolor' floated='right' onClick={() => handleClick('edit')}>
            {editRace ? <Icon name='close'/> : <Icon name='edit'/>}
          </Button>
          <br/>
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
