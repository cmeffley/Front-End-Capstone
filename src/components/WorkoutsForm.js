import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import {
  addWorkoutCoach,
  updateWorkoutAthlete,
  updateWorkoutCoach
} from '../helpers/data/workoutsData';
import { getAthletes } from '../helpers/data/athleteData';
import { getCoaches } from '../helpers/data/coachData';

function WorkoutsForm({
  coach, athlete, setWorkouts, formTitle, ...workoutInfo
}) {
  const [addWorkouts, setAddWorkouts] = useState({
    day: workoutInfo?.day || '',
    startDay: workoutInfo?.startDay || '',
    dueDay: workoutInfo?.dueDay || '',
    workoutType: workoutInfo?.workoutType || '',
    plannedWork: workoutInfo?.plannedWork || '',
    completed: workoutInfo?.completed || false,
    actualWork: workoutInfo?.actualWork || '',
    totalMiles: workoutInfo?.totalMiles || '',
    averagePace: workoutInfo?.averagePace || '',
    athleteUid: workoutInfo?.athleteUid || athlete.athleteUid,
    coachUid: workoutInfo?.coachUid || coach.coachUid,
    firebaseKey: workoutInfo?.firebaseKey || null
  });
  const [selectAthlete, setSelectAthlete] = useState([]);
  const [selectCoach, setSelectCoach] = useState([]);

  useEffect(() => {
    getAthletes().then((response) => setSelectAthlete(response));
    getCoaches().then((response) => setSelectCoach(response));
  }, []);

  const handleInputChange = (e) => {
    setAddWorkouts((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addWorkouts.firebaseKey && workoutInfo.coachUid && workoutInfo.athleteUid) {
      updateWorkoutCoach(addWorkouts, workoutInfo.coachUid).then((workoutArray) => setWorkouts(workoutArray));
    } else if (addWorkouts.firebaseKey && workoutInfo.athleteUid && workoutInfo.coachUid) {
      updateWorkoutAthlete(addWorkouts, workoutInfo.athleteUid).then((workoutArray) => setWorkouts(workoutArray));
    } else if (coach !== null) {
      addWorkoutCoach(addWorkouts, workoutInfo.coachUid).then((workoutArray) => setAddWorkouts(workoutArray));
    }
  };

  return (
    <div>
      <Form
        className='workoutInputForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
      <h2>{formTitle}</h2>
      <Label>Day</Label>
      <Input
        name='day'
        type='text'
        value={addWorkouts.day}
        onChange={handleInputChange}
      />
      <Label>Day of Workout</Label>
      <Input
        name='startDay'
        type='text'
        value={addWorkouts.startDay}
        onChange={handleInputChange}
      />
      <Label>Complete Workout By</Label>
      <Input
        name='dueDay'
        type='text'
        value={addWorkouts.dueDay}
        onChange={handleInputChange}
      />
      <br />
      <Input
        name='workoutType'
        type='select'
        value={addWorkouts.workoutType}
        onChange={handleInputChange}
      >
        <option hidden value=''>Select Workout Type</option>
        <option>Swim</option>
        <option>Bike</option>
        <option>Run</option>
        <option>Cross Train</option>
        <option>Rest Day</option>
      </Input>
      <Label>Planned Workout</Label>
      <Input
        name='plannedWork'
        type='text'
        value={addWorkouts.plannedWork}
        onChange={handleInputChange}
      />
      <br/>
      <Label check>
        <Input
          name='completed'
          type='checkbox'
          value={true}
          checked={addWorkouts.completed}
          onChange={handleInputChange}
        />Completed
      </Label>
      <br/>
      <Label>Completed Workout Notes</Label>
      <Input
        name='actualWork'
        type='textarea'
        value={addWorkouts.actualWork}
        onChange={handleInputChange}
      />
      <Label>Total Miles</Label>
      <Input
        name='totalMiles'
        type='number'
        value={addWorkouts.totalMiles}
        onChange={handleInputChange}
      />
      <Label>Average Pace</Label>
      <Input
        name='averagePace'
        type='number'
        value={addWorkouts.averagePace}
        onChange={handleInputChange}
      />
      { coach
        ? '' : <Input
          type='select'
          name='coachUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Coach</option>
            {selectCoach.length && selectCoach.map((coaches) => <option
              key={coaches.coachUid}
              value={coaches.coachUid}
              >
                {coaches.fullName}
            </option>)}
        </Input>
        }
        { athlete
          ? '' : <Input
          type='select'
          name='athleteUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Athlete</option>
            {selectAthlete.length && selectAthlete.map((athletes) => <option
              key={athletes.athleteUid}
              value={athletes.athleteUid}
              >
                {athletes.fullName}
            </option>)}
        </Input>
        }
      <Button color='primary' type='submit'>Submit</Button>
      </Form>
    </div>
  );
}

WorkoutsForm.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  workoutInfo: PropTypes.object,
  setWorkouts: PropTypes.func,
  formTitle: PropTypes.string
};

export default WorkoutsForm;
