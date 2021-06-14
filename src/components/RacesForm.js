import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import {
  updateRaceCoach,
  updateRaceAthlete,
  addRaceCoach,
  addRaceAthlete
} from '../helpers/data/raceData';
import { getAthletes } from '../helpers/data/athleteData';
import { getCoaches } from '../helpers/data/coachData';

function RacesForm({
  coach, athlete, createRaces, setAthleteRaces, formTitle, ...raceInfo
}) {
  const [addRaces, setAddRaces] = useState({
    raceName: raceInfo?.raceName || '',
    raceDistance: raceInfo?.raceDistance || '',
    raceDate: raceInfo?.raceDate || '',
    raceLink: raceInfo?.raceLink || '',
    startDate: raceInfo?.startDate || '',
    endDate: raceInfo?.endDate || '',
    athleteUid: athlete.athleteUid || '',
    coachUid: coach.coachUid || '',
    firebaseKey: raceInfo?.firebaseKey || null
  });
  const [selectAthlete, setSelectAthlete] = useState([]);
  const [selectCoach, setSelectCoach] = useState([]);

  useEffect(() => {
    getAthletes().then((response) => setSelectAthlete(response));
    getCoaches().then((response) => setSelectCoach(response));
  }, []);

  const handleInputChange = (e) => {
    setAddRaces((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    if (addRaces.firebaseKey && coach.coachUid) {
      updateRaceCoach(addRaces, coach.coachUid).then((racesArray) => setAthleteRaces(racesArray));
    } else if (addRaces.firebaseKey && athlete.athleteUid) {
      updateRaceAthlete(addRaces, athlete.athleteUid).then((racesArray) => setAthleteRaces(racesArray));
    }
  };

  const addSubmit = (e) => {
    e.preventDefault();
    if (coach !== null && athlete === false) {
      addRaceCoach(addRaces, coach.coachUid).then((racesArray) => setAddRaces(racesArray));
    } else if (coach === false) {
      addRaceAthlete(addRaces, athlete.athleteUid).then((racesArray) => setAddRaces(racesArray));

      setAddRaces({
        raceName: '',
        raceDistance: '',
        raceDate: '',
        raceLink: '',
        startDate: '',
        endDate: '',
        firebaseKey: null
      });
    }
  };

  return (
    <div>
      <Form
        className='raceInputForm'
        autoComplete='off'
      >
        <h2>{formTitle}</h2>
        <Label>Race Name</Label>
        <Input
          name='raceName'
          type='text'
          value={addRaces.raceName}
          onChange={handleInputChange}
        />
        <Label>Race Distance</Label>
        <Input
          name='raceDistance'
          type='text'
          value={addRaces.raceDistance}
          onChange={handleInputChange}
        />
        <Label>Date of Race</Label>
        <Input
          name='raceDate'
          type='text'
          value={addRaces.raceDate}
          onChange={handleInputChange}
        />
        <Label>Link to Race Website</Label>
        <Input
          name='raceLink'
          type='text'
          value={addRaces.raceLink}
          onChange={handleInputChange}
        />
        <Label>Workout Program Start Date:</Label>
        <Input
          name='startDate'
          type='text'
          value={addRaces.startDate}
          onChange={handleInputChange}
        />
        <Label>Workout Program End Date:</Label>
        <Input
          name='endDate'
          type='text'
          value={addRaces.endDate}
          onChange={handleInputChange}
        />
        <Input
          type='select'
          name='coachUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Coach</option>
            {selectCoach.length && selectCoach.map((coaches) => <option
              key={coaches.coachUid}
              value={coaches.coachUid}
              >
                {coach.fullName}
              </option>)}
        </Input>
        <Input
          type='select'
          name='athleteUid'
          onChange={handleInputChange}
          >
          <option hidden value=''>Select Athlete</option>
            {selectAthlete.length && selectAthlete.map((athletes) => <option
              key={athletes.athleteUid}
              value={athletes.athleteUid}
              >
                {athlete.fullName}
              </option>)}
        </Input>
        <Button color='primary' type='submit' onSubmit={updateSubmit}>Update</Button>
        <Button color='secondary' type='submit' onSubmit={addSubmit}>Add New Race</Button>
      </Form>
    </div>
  );
}

RacesForm.propTypes = {
  coach: PropTypes.any,
  athlete: PropTypes.any,
  createRaces: PropTypes.array,
  setAthleteRaces: PropTypes.func,
  formTitle: PropTypes.string
};

export default RacesForm;
