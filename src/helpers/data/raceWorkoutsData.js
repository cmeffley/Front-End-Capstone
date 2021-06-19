import { getSingleRace } from './raceData';
import { getRaceWorkouts } from './workoutsData';

const seeWorkoutsForRace = (raceId) => new Promise((resolve, reject) => {
  const race = getSingleRace(raceId);
  const workout = getRaceWorkouts(raceId);

  Promise.all([race, workout])
    .then(([raceResponse, workoutResponse]) => resolve(
      { race: raceResponse, workout: workoutResponse }
    ))
    .catch((error) => reject(error));
});

export default seeWorkoutsForRace;
