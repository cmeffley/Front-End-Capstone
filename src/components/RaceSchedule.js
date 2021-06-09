import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import RacesForm from '../components/RacesForm';

function RaceSchedule({ athlete, setCreateRaces, ...raceInfo }) {
  const [editRace, setEditRace] = useState(false);
  console.warn(setEditRace);
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
          {
            editRace && <RacesForm
              formTitle='Edit Race'
              {...raceInfo}
              setCreateRaces={setCreateRaces}
              />
          }
        </CardBody>
      </Card>
    </div>
  );
}

RaceSchedule.propTypes = {
  raceInfo: PropTypes.array,
  athlete: PropTypes.any,
  setCreateRaces: PropTypes.func
};

export default RaceSchedule;
