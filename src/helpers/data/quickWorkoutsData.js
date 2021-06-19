import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getQuickWorkouts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/quickWorkouts.json`)
    .then((response) => console.warn(response.data))
    .catch((error) => reject(error));
});

export default getQuickWorkouts;
