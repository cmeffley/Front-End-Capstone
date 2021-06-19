import { getSingleRace, deleteRaceCoach, deleteRaceAthlete } from './raceData';
import { getRaceWorkouts, deleteWorkoutCoach } from './workoutsData';

const seeWorkoutsForRace = (raceId) => new Promise((resolve, reject) => {
  const race = getSingleRace(raceId);
  const workout = getRaceWorkouts(raceId);

  Promise.all([race, workout])
    .then(([raceResponse, workoutResponse]) => resolve(
      { race: raceResponse, workout: workoutResponse }
    ))
    .catch((error) => reject(error));
});

const deleteRaceandWorkoutsCoach = (raceId, uid) => new Promise((resolve, reject) => {
  getRaceWorkouts(raceId).then((workoutArray) => {
    const deleteWorkouts = workoutArray.map((workouts) => deleteWorkoutCoach(workouts.firebaseKey));
    Promise.all(deleteWorkouts).then(() => resolve(deleteRaceCoach(raceId, uid)));
  }).catch((error) => reject(error));
});

const deleteRaceandWorkoutsAthlete = (raceId, uid) => new Promise((resolve, reject) => {
  getRaceWorkouts(raceId).then((workoutArray) => {
    const deleteWorkouts = workoutArray.map((workouts) => deleteWorkoutCoach(workouts.firebaseKey));
    Promise.all(deleteWorkouts).then(() => resolve(deleteRaceAthlete(raceId, uid)));
  }).catch((error) => reject(error));
});

export {
  seeWorkoutsForRace,
  deleteRaceandWorkoutsCoach,
  deleteRaceandWorkoutsAthlete
};
