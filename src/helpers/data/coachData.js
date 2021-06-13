import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getCoaches = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/coach.json`)
    .then((response) => resolve((Object.values(response.data))))
    .catch((error) => reject(error));
});

const addCoach = (coach) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/coach.json`, coach)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/coach/${response.data.name}.json`, body)
        .then(() => {
          resolve({ ...coach, ...body });
        });
    })
    .catch((error) => reject(error));
});

const getSingleCoach = (uid, coachObject) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/coach.json?orderBy="coachUid"&equalTo="${uid}"`)
    .then((response) => {
      if (Object.keys(response.data).length) {
        resolve(Object.values(response.data));
      } else {
        addCoach(coachObject).then(resolve);
      }
    }).catch((error) => reject(error));
});

export { getCoaches, addCoach, getSingleCoach };
