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
import { Line } from 'react-chartjs-2';

function WorkoutAverages({ workData }) {
  const history = useHistory();
  const { raceId } = useParams();
  const getTotalMiles = workData.reduce((a, b) => (+a) + (+b.totalMiles), 0);

  const findAveragePace = workData.reduce((a, b) => (+a) + (+b.averagePace), 0) / workData.length;

  const milesforChart = workData.map((miles) => miles.totalMiles);
  const paceforChart = workData.map((pace) => pace.averagePace);
  const daysforChart = workData.map((days) => days.day);

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
        <Line className='charts'
          data={{
            labels: daysforChart,
            datasets: [{
              label: 'Total Miles',
              data: milesforChart,
              backgroundColor: 'black',
              borderColor: 'black',
            }]
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }]
            }
          }}
        />
      </div>
      <br />
      <Card className='datacards'>
        <CardTitle>Average Pace this Week</CardTitle>
        <CardBody>
          <CardText>{findAveragePace}</CardText>
        </CardBody>
      </Card>
      <div>
        <Line className='charts'
          data={{
            labels: daysforChart,
            datasets: [{
              label: 'Average Pace',
              data: paceforChart,
              backgroundColor: 'black',
              borderColor: 'black',
            }]
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }]
            }
          }}
        />
      </div>
      <br/>
      <Button id='buttoncolor' attached='bottom' onClick={() => history.push(`/raceSchedule/${raceId}`)}>
        <Icon name='left arrow'/>Back</Button>
    </div>
  );
}

WorkoutAverages.propTypes = {
  workData: PropTypes.array,
};

export default WorkoutAverages;
