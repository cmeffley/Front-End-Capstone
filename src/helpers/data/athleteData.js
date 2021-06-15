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
          resolve({ ...athlete, ...body });
        });
    })
    .catch((error) => reject(error));
});

const getSingleAthlete = (uid, athleteObject) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/athlete.json?orderBy="athleteUid"&equalTo="${uid}"`)
    .then((response) => {
      if (Object.keys(response.data).length) {
        resolve(Object.values(response.data)[0]);
      } else {
        addAthlete(athleteObject).then(resolve);
      }
    }).catch((error) => reject(error));
});

export { getAthletes, getSingleAthlete, addAthlete };
