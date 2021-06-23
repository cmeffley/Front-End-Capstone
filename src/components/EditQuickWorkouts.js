import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
} from 'reactstrap';
import { addQuickWorkout, deleteQuickWorkout, editQuickWorkout } from '../helpers/data/quickWorkoutsData';

function EditQuickWorkouts({
  coach,
  formTitle,
  setAddEditQuickWork,
  ...addEditObject
}) {
  const [editQuickWork, setEditQuickWork] = useState({
    id: addEditObject?.id || '',
    description: addEditObject?.description || '',
    length: addEditObject?.length || '',
    firebaseKey: addEditObject?.firebaseKey || null,
  });

  const handleInputChange = (e) => {
    setEditQuickWork((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editQuickWork.firebaseKey) {
      editQuickWorkout(editQuickWork).then((response) => setAddEditQuickWork(response));
    } else {
      addQuickWorkout(editQuickWork).then((response) => setAddEditQuickWork(response));
      setEditQuickWork({
        id: '',
        description: '',
        length: '',
        firebaseKey: null
      });
    }
  };

  const goodbyeQuickWorkout = () => {
    deleteQuickWorkout(addEditObject.firebaseKey).then((array) => setAddEditQuickWork(array));
  };

  return (
    <div className='quickWorkEditFormContainer'>
      <Form
        className='editQuickWorkoutForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h3>{formTitle}</h3>
        <Label>ID Number</Label>
        <Input
          name='id'
          type='number'
          value={editQuickWork.id}
          onChange={handleInputChange}
        />
        <Label>Description</Label>
        <Input
          name='description'
          type='text'
          value={editQuickWork.description}
          onChange={handleInputChange}
        />
        <Label>Workout Length</Label>
        <Input
          name='length'
          type='text'
          value={editQuickWork.length}
          onChange={handleInputChange}
        />
        <Button color='info' type='submit'>Submit</Button>
        <Button color='warning' onClick={goodbyeQuickWorkout}>Delete</Button>
      </Form>
    </div>
  );
}

EditQuickWorkouts.propTypes = {
  coach: PropTypes.any,
  addEditObject: PropTypes.object,
  formTitle: PropTypes.string,
  setAddEditQuickWork: PropTypes.func
};

export default EditQuickWorkouts;
