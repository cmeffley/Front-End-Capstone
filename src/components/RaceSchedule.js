import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';

function RaceSchedule({ athlete, ...raceInfo }) {
  return (
    <div>
      <Card>
        <CardTitle tag='h5'>{raceInfo.raceName}</CardTitle>
        <CardBody>
          <CardText>{raceInfo.raceDistance}</CardText>
          <CardText>{raceInfo.raceDate}</CardText>
          <CardText><a href={raceInfo.raceLink}>Race Website</a></CardText>
          <Button color='danger'>Future Delete</Button>
          <Button color='info'>Future Edit</Button>
        </CardBody>
      </Card>
    </div>
  );
}

RaceSchedule.propTypes = {
  raceInfo: PropTypes.array,
  athlete: PropTypes.any
};

export default RaceSchedule;
