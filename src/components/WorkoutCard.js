import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { deleteWorkoutCoach } from '../helpers/data/workoutsData';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';
import WorkoutsForm from './WorkoutsForm';
import QuickWorkout from './QuickWorkout';

function WorkoutCard({
  coach,
  athlete,
  setRaceWorkout,
  setWorkouts,
  ...workoutInfo
}) {
  const [editWorkout, setEditWorkout] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleClick = (type) => {
    switch (type) {
      case 'edit':
        setEditWorkout((prevState) => !prevState);
        break;
      case 'delete':
        deleteWorkoutCoach(workoutInfo.firebaseKey, coach.coachUid).then(() => seeWorkoutsForRace(workoutInfo.raceId).then((workoutArray) => setRaceWorkout(workoutArray.workout)));
        break;
      default:
        console.warn('Keep Being Awesome!');
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className='quickWorkModal'>
        <ModalHeader toggle={toggle}>If you do this workout, please write the Number of the Quick Workout in the Actual Work portion of the Workout Card</ModalHeader>
        <ModalBody>
          <QuickWorkout />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
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
          { coach
            ? ''
            : <Button onClick={toggle}>Short on Time</Button> }
          {coach
            ? <Button color='danger' onClick={() => handleClick('delete')}>
              Delete Workout </Button> : ''}
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
                setRaceWorkout={setRaceWorkout}
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
  setRaceWorkout: PropTypes.func,
};

export default WorkoutCard;
