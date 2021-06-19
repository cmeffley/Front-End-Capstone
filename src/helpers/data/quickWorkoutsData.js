import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getQuickWorkouts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/quickWorkouts.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addQuickWorkout = (quickWorkout) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/quickWorkouts.json`, quickWorkout)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/quickWorkouts/${response.data.name}.json`, body)
        .then(() => {
          getQuickWorkouts().then((quickWorkArray) => resolve(quickWorkArray));
        });
    })
    .catch((error) => reject(error));
});

const editQuickWorkout = (quickWorkout) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/quickWorkouts/${quickWorkout.firebaseKey}.json`, quickWorkout)
    .then(() => getQuickWorkouts()).then((array) => resolve(array))
    .catch((error) => reject(error));
});

const deleteQuickWorkout = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/quickWorkouts/${firebaseKey}.json`)
    .then(() => getQuickWorkouts().then((array) => resolve(array)))
    .catch((error) => reject(error));
});

export {
  getQuickWorkouts,
  addQuickWorkout,
  editQuickWorkout,
  deleteQuickWorkout
};
