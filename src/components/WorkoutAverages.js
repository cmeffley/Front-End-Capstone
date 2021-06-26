import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';

function WorkoutAverages({ workData }) {
  const history = useHistory();
  const { raceId } = useParams();
  const getTotalMiles = workData.reduce((a, b) => (+a) + (+b.totalMiles), 0);

  const findAveragePace = workData.reduce((a, b) => (+a) + (+b.averagePace), 0) / workData.length;

  return (
    <div>
      <div>
        <Card className='datacards'>
          <CardTitle>Total Miles this Week</CardTitle>
          <CardBody>
            <CardText>{getTotalMiles}</CardText>
          </CardBody>
        </Card>
      </div>
      <div>
      </div>
      <Card className='datacards'>
        <CardTitle>Average Pace this Week</CardTitle>
        <CardBody>
          <CardText>{findAveragePace}</CardText>
        </CardBody>
      </Card>
      <Button id='buttoncolor' attached='bottom' onClick={() => history.push(`/raceSchedule/${raceId}`)}>
        <Icon name='left arrow'/>Back</Button>
    </div>
  );
}

WorkoutAverages.propTypes = {
  workData: PropTypes.array,
};

export default WorkoutAverages;
