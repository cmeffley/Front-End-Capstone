import React, { useState, useEffect } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import { getQuickWorkouts } from '../helpers/data/quickWorkoutsData';

function QuickWorkout() {
  const [randomQuickWork, setRandomQuickWork] = useState({});
  useEffect(() => {
    getQuickWorkouts().then((response) => {
      setRandomQuickWork(response[Math.floor(Math.random() * response.length)]);
    });
  }, []);
  return (
    <div>
      <Card>
        <CardTitle>Quick Workout #{randomQuickWork.id}</CardTitle>
        <CardBody>
          <CardText>{randomQuickWork.description}</CardText>
          <CardText>{randomQuickWork.length}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default QuickWorkout;
