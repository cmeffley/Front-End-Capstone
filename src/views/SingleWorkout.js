import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  Button
} from 'reactstrap';
import { getSingleWorkout } from '../helpers/data/workoutsData';

function SingleWorkout() {
  const [oneWorkout, setOneWorkout] = useState({});
  const history = useHistory();
  const { workoutFirebaseKey, raceId } = useParams();
  useEffect(() => {
    getSingleWorkout(workoutFirebaseKey).then((response) => setOneWorkout(response.data));
  }, []);

  const motivation = [
    'Anything is Possible',
    'It\'s all about the journey, not the outcome.',
    'I never worry about the problem. I worry about the solution',
    'If you believe it, the mind can achieve it',
    'Success is where preparation and opportunity meet',
    'I am a winner before I start this race'
  ];

  const getMotivation = motivation[Math.floor(Math.random() * motivation.length)];

  return (
    <div className='singleworkoutContainer'>
      <Button onClick={() => history.push(`/raceSchedule/${raceId}`)}>Back</Button>
      <Card className='workoutCard'>
        <CardBody>
          <CardText>Complete Workout By:<br/>
            {oneWorkout.dueDay}</CardText>
          <CardText>Discipline:  {oneWorkout.workoutType}</CardText>
          <CardText>{oneWorkout.plannedWork}</CardText>
          <h4>{getMotivation}</h4>
        </CardBody>
      </Card>
    </div>
  );
}

export default SingleWorkout;
