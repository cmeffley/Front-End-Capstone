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

const addRaceCoach = (race, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/races.json`, race)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/races/${response.data.name}.json`, body)
        .then(() => {
          getRacesCoach(uid).then((raceArray) => resolve(raceArray));
        });
    })
    .catch((error) => reject(error));
});

const addRaceAthlete = (race, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/races.json`, race)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/races/${response.data.name}.json`, body)
        .then(() => {
          getRacesAthlete(uid).then((raceArray) => resolve(raceArray));
        });
    })
    .catch((error) => reject(error));
});

const updateRaceCoach = (races, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/races/${races.firebaseKey}.json`, races)
    .then(() => getRacesCoach(uid)).then((racesArray) => resolve(racesArray))
    .catch((error) => reject(error));
});

const updateRaceAthlete = (races, uid) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/races/${races.firebaseKey}.json`, races)
    .then(() => getRacesAthlete(uid)).then((racesArray) => resolve(racesArray))
    .catch((error) => reject(error));
});

const deleteRaceCoach = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/races/${firebaseKey}.json`)
    .then(() => getRacesCoach(uid).then((racesArray) => resolve(racesArray)))
    .catch((error) => reject(error));
});

const deleteRaceAthlete = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/races/${firebaseKey}.json`)
    .then(() => getRacesAthlete(uid).then((racesArray) => resolve(racesArray)))
    .catch((error) => reject(error));
});

const getSingleRace = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/races/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getAllRaces = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/races.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getRacesAthlete,
  getRacesCoach,
  addRaceCoach,
  addRaceAthlete,
  updateRaceCoach,
  updateRaceAthlete,
  deleteRaceCoach,
  deleteRaceAthlete,
  getSingleRace,
  getAllRaces
};
