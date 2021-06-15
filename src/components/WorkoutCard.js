import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  Label,
  Input,
  Button
} from 'reactstrap';

function WorkoutCard({ coach, athlete, ...workoutInfo }) {
  return (
    <div>
      <Card>
        <CardBody>
          <CardText>{workoutInfo.day}</CardText>
          <CardText>{workoutInfo.startDay}</CardText>
          <CardText>{workoutInfo.workoutType}</CardText>
          <CardText>{workoutInfo.plannedWork}</CardText>
          <Label check>
            <Input type='checkbox' />{workoutInfo.completed} Completed
          </Label>
          <CardText>{workoutInfo.actualWork}</CardText>
          <CardText>{workoutInfo.totalMiles}</CardText>
          <CardText>{workoutInfo.averagePace}</CardText>
          <Button>Quick Workout</Button>
          <Button color='warning'>Edit</Button>
          <Button color='danger'>Coach Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
}

WorkoutCard.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  workoutInfo: PropTypes.object
};

export default WorkoutCard;
