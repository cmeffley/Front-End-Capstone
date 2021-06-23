import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  updateWorkoutCoach,
} from '../helpers/data/workoutsData';
import { getAthletes } from '../helpers/data/athleteData';
import { getAllRaces } from '../helpers/data/raceData';
import { seeWorkoutsForRace } from '../helpers/data/raceWorkoutsData';

function WorkoutsForm({
  coach, athlete, formTitle, setRaceWorkout, setEditWorkout, ...workoutInfo
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
    raceId: workoutInfo?.raceId || '',
    firebaseKey: workoutInfo?.firebaseKey || null
  });
  const [selectAthlete, setSelectAthlete] = useState([]);
  const [selectRace, setSelectRace] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAthletes().then((response) => setSelectAthlete(response));
    getAllRaces().then((response) => setSelectRace(response));
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
      updateWorkoutCoach(addWorkouts, workoutInfo.coachUid).then(() => seeWorkoutsForRace(workoutInfo.raceId).then((workoutArray) => {
        setRaceWorkout(workoutArray.workout);
        setEditWorkout(false);
      }));
    } else if (addWorkouts.firebaseKey && workoutInfo.athleteUid && workoutInfo.coachUid) {
      updateWorkoutAthlete(addWorkouts, workoutInfo.athleteUid).then(() => seeWorkoutsForRace(workoutInfo.raceId).then((workoutArray) => {
        setRaceWorkout(workoutArray.workout);
        setEditWorkout(false);
      }));
    } else if (coach !== null) {
      addWorkoutCoach(addWorkouts, workoutInfo.coachUid).then((workoutArray) => {
        setAddWorkouts(workoutArray);
        history.push('/raceSchedule');
      });
    }
  };

  return (
    <div className='workoutinputContainer'>
      <Form
        className='workoutInputForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
      <h2>{formTitle}</h2>
      { coach
        ? <React.Fragment>
      <Label>Day of Week</Label>
      <Input
        name='day'
        type='text'
        value={addWorkouts.day}
        onChange={handleInputChange}
      />
      </React.Fragment>
        : ''
      }
      { coach
        ? <React.Fragment>
      <Label>Start of Workout</Label>
      <Input
        name='startDay'
        type='date'
        value={addWorkouts.startDay}
        onChange={handleInputChange}
      />
      </React.Fragment>
        : ''
      }
      { coach
        ? <React.Fragment>
      <Label>Complete Workout By</Label>
      <Input
        name='dueDay'
        type='date'
        value={addWorkouts.dueDay}
        onChange={handleInputChange}
      />
      </React.Fragment>
        : ''
      }
      { coach
        ? <React.Fragment>
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
      </React.Fragment>
        : ''
      }
      { coach
        ? <React.Fragment>
      <Label>Planned Workout</Label>
      <Input
        name='plannedWork'
        type='text'
        value={addWorkouts.plannedWork}
        onChange={handleInputChange}
      />
      </React.Fragment>
        : ''
      }
      <br/>
      { athlete
        ? <React.Fragment>
        <Label check>
          <Input
            name='completed'
            type='checkbox'
            value={true}
            checked={addWorkouts.completed}
            onChange={handleInputChange}
          />Completed
        </Label>
        </React.Fragment>
        : ''
      }
        <br/>
        { athlete
          ? <React.Fragment>
        <Label>Completed Workout Notes</Label>
        <Input
          name='actualWork'
          type='textarea'
          value={addWorkouts.actualWork}
          onChange={handleInputChange}
        />
        </React.Fragment>
          : ''
        }
        { athlete
          ? <React.Fragment>
        <Label>Total Miles</Label>
        <Input
          name='totalMiles'
          type='number'
          value={addWorkouts.totalMiles}
          onChange={handleInputChange}
        />
        </React.Fragment>
          : ''
        }
        { athlete
          ? <React.Fragment>
        <Label>Average Pace</Label>
        <Input
          name='averagePace'
          type='number'
          value={addWorkouts.averagePace}
          onChange={handleInputChange}
        />
          </React.Fragment>
          : ''
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
        { athlete
          ? '' : <Input
          type='select'
          name='raceId'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Race</option>
            {selectRace.length && selectRace.map((races) => <option
              key={races.firebaseKey}
              value={races.firebaseKey}
              >
                {races.raceName}
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
  formTitle: PropTypes.string,
  setEditWorkout: PropTypes.func,
  setRaceWorkout: PropTypes.func
};

export default WorkoutsForm;
