// make a get request to FB that indexes on the athlete UID at the /athlete.json endpoint
// if you don;t get anything back, you know that the athlete does not exist, so you need to post them to Firebase
// if you get something back, then you want to set your athlete with that data
import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getAthletes = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/athlete.json`)
    .then((response) => resolve((Object.values(response.data))))
    .catch((error) => reject(error));
});

const addAthlete = (athlete) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/athlete.json`, athlete)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/athlete/${response.data.name}.json`, body)
        .then(() => {
          getAthletes().then((athleteArray) => resolve(athleteArray));
        });
    })
    .catch((error) => reject(error));
});

const getSingleAthlete = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/athlete.json?orderBy="athleteUid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

export { getAthletes, getSingleAthlete, addAthlete };
