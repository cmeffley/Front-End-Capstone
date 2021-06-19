import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  Label,
  Input,
  Button
} from 'reactstrap';
import { deleteWorkoutCoach } from '../helpers/data/workoutsData';
import WorkoutsForm from './WorkoutsForm';

function WorkoutCard({
  coach, athlete, setRaceWorkout, setWorkouts, ...workoutInfo
}) {
  const [editWorkout, setEditWorkout] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditWorkout((prevState) => !prevState);
        break;
      case 'delete':
        deleteWorkoutCoach(workoutInfo.firebaseKey, coach.coachUid).then((workoutArray) => setRaceWorkout(workoutArray));
        break;
      default:
        console.warn('Keep Being Awesome!');
    }
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardText>{workoutInfo.day}</CardText>
          <CardText>{workoutInfo.startDay}</CardText>
          <CardText>{workoutInfo.dueDay}</CardText>
          <CardText>{workoutInfo.workoutType}</CardText>
          <CardText>{workoutInfo.plannedWork}</CardText>
          <Label check>
            <Input type='checkbox' checked={workoutInfo.completed}/>Completed
          </Label>
          <CardText>{workoutInfo.actualWork}</CardText>
          <CardText>{workoutInfo.totalMiles}</CardText>
          <CardText>{workoutInfo.averagePace}</CardText>
          <Button>Quick Workout</Button>
          {coach
            ? <Button color='danger' onClick={() => handleClick('delete')}>
              Coach Delete</Button> : ''}
          <Button color='warning' onClick={() => handleClick('edit')}>
            { editWorkout ? 'Close Form' : 'Edit Workout'}
          </Button>
            {
              editWorkout && <WorkoutsForm
                formTitle='Edit Workout'
                {...workoutInfo}
                coach={coach}
                athlete={athlete}
                setWorkouts={setWorkouts}
                setEditWorkout={setEditWorkout}
              />}
        </CardBody>
      </Card>
    </div>
  );
}

WorkoutCard.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  workoutInfo: PropTypes.object,
  setWorkouts: PropTypes.func,
  setRaceWorkout: PropTypes.func
};

export default WorkoutCard;
