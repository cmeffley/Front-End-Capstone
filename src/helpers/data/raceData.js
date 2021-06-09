import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getRacesAthlete = (athlete) => new Promise((reject) => {
  axios.get(`${dbUrl}/races.json?orderBy="athleteUid"&equalTo="${athlete.athleteUid}"`)
    .then((response) => console.warn(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getRacesCoach = (coach) => new Promise((reject) => {
  axios.get(`${dbUrl}/races.json?orderBy="coachUid"&equalTo="${coach.coachUid}"`)
    .then((response) => console.warn(Object.values(response.data)))
    .catch((error) => reject(error));
});

export { getRacesAthlete, getRacesCoach };
