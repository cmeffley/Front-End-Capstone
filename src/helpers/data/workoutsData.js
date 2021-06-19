import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getWorkoutsAthlete = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workouts.json?orderBy="athleteUid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getWorkoutsCoach = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workouts.json?orderBy="coachUid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addWorkoutCoach = (race, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/workouts.json`, race)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/workouts/${response.data.name}.json`, body)
        .then(() => {
          getWorkoutsCoach(uid).then((workoutArray) => resolve(workoutArray));
        });
    })
    .catch((error) => reject(error));
});

const updateWorkoutCoach = (races, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/workouts/${races.firebaseKey}.json`, races)
    .then(() => getWorkoutsCoach(uid)).then((workoutArray) => resolve(workoutArray))
    .catch((error) => reject(error));
});

const updateWorkoutAthlete = (races, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/workouts/${races.firebaseKey}.json`, races)
    .then(() => getWorkoutsAthlete(uid)).then((workoutArray) => resolve(workoutArray))
    .catch((error) => reject(error));
});

const deleteWorkoutCoach = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/workouts/${firebaseKey}.json`)
    .then(() => getWorkoutsCoach(uid).then((workoutArray) => resolve(workoutArray)))
    .catch((error) => reject(error));
});

const getRaceWorkouts = (raceId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/workouts.json?orderBy="raceId"&equalTo="${raceId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getWorkoutsAthlete,
  getWorkoutsCoach,
  addWorkoutCoach,
  updateWorkoutCoach,
  updateWorkoutAthlete,
  deleteWorkoutCoach,
  getRaceWorkouts
};
