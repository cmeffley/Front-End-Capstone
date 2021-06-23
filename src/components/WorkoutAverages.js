import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

function WorkoutAverages({ workData }) {
  const getTotalMiles = workData.reduce((a, b) => (+a) + (+b.totalMiles), 0);

  const findAveragePace = workData.reduce((a, b) => (+a) + (+b.averagePace), 0) / workData.length;

  return (
    <div>
      <Card className='datacards'>
        <CardTitle>Total Miles this Week</CardTitle>
        <CardBody>
          <CardText>{getTotalMiles}</CardText>
        </CardBody>
      </Card>
      <Card className='datacards'>
        <CardTitle>Average Pace this Week</CardTitle>
        <CardBody>
          <CardText>{findAveragePace}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

WorkoutAverages.propTypes = {
  workData: PropTypes.array,
};

export default WorkoutAverages;
