import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

function WorkoutAverages({
  averages
}) {
  const getTotalMiles = averages.reduce((a, b) => a + b.totalMiles, 0);
  return (
    <div>
      <Card>
        <CardTitle>Total Miles this Week</CardTitle>
        <CardBody>
          <CardText>{getTotalMiles}</CardText>
        </CardBody>
      </Card>
      {/* <Card>
        <CardTitle>Average Pace this Week</CardTitle>
        <CardBody>
          <CardText>{averageInfo.totalMiles}</CardText>
        </CardBody>
      </Card> */}
    </div>
  );
}

WorkoutAverages.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  averages: PropTypes.array,
  setAverages: PropTypes.func,
};

export default WorkoutAverages;
