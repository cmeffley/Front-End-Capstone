import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';

function QuickWorkout({
  coach, athlete, ...quickObject
}) {
  return (
    <div>
      <Card>
        <CardTitle>Quick Workout #{quickObject.id}</CardTitle>
        <CardBody>
          <CardText>{quickObject.description}</CardText>
          <CardText>{quickObject.length}</CardText>
          <Button>Button</Button>
          <CardText>If you do this workout, please write the Number of the Quick Workout in the Actual Work portion of the Workout Card</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

QuickWorkout.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  quickObject: PropTypes.object
};

export default QuickWorkout;
