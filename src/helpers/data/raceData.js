import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getRacesAthlete = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/races.json?orderBy="athleteUid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getRacesCoach = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/races.json?orderBy="coachUid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export { getRacesAthlete, getRacesCoach };
