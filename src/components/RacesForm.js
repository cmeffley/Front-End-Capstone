import React, { useState } from 'react';
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

function RacesForm({
  coach, athlete, createRaces, setCreateRaces, formTitle, ...raceInfo
}) {
  const [addRaces, setAddRaces] = useState({
    raceName: raceInfo?.raceName || '',
    raceDistance: raceInfo?.raceDistance || '',
    raceDate: raceInfo?.raceDate || '',
    raceLink: raceInfo?.raceLink || '',
    startDate: raceInfo?.startDate || '',
    endDate: raceInfo?.endDate || '',
    athleteUid: athlete.uid,
    coachUid: coach.uid,
    firebaseKey: raceInfo?.firebaseKey || null
  });

  const handleInputChange = (e) => {
    setAddRaces((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };


  const updateSubmit = (e) => {
    e.preventDefault();
    if (addRaces.firebaseKey && coach.uid) {
      updateRaceCoach(addRaces, coach.uid).then((racesArray) => setCreateRaces(racesArray));
    } else if (addRaces.firebaseKey && athlete.uid) {
      updateRaceAthlete(addRaces, athlete.uid).then((racesArray) => setCreateRaces(racesArray));
    }
  };

  const addSubmit = (e) => {
    e.preventDefault();
      (addRaceCoach(addRaces, coach.uid).then((racesArray) => setAddRaces(racesArray)) ||
      addRaceAthlete(addRaces, athlete.uid).then((racesArray) => setAddRaces(racesArray)))
      
    setAddRaces({
      raceName: '',
      raceDistance: '',
      raceDate: '',
      raceLink: '',
      startDate: '',
      endDate: '',
      firebaseKey: null
    });
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
  setCreateRaces: PropTypes.func,
  formTitle: PropTypes.string
};

export default RacesForm;
