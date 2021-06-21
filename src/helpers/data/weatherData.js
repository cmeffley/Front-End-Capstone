import axios from 'axios';

const url = 'https://api.openweathermap.org/data/2.5/weather';
const api = process.env.REACT_APP_WEATHER_API;

const getWeather = (city) => new Promise((resolve, reject) => {
  axios.get(`${url}?q=${city}&appid=${api}&units=imperial`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getWeather;
