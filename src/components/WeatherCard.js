import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
} from 'reactstrap';

function WeatherCard({ data }) {
  return (
    <div>
      <Card id="weatherCard">
      {data
        ? <><CardImg id="weatherimage" top src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
        <CardText tag="h4">{data.name}</CardText>
        <CardText>{data.weather[0].main}</CardText>
        <CardText>{data.main.temp} Degrees | {data.weather[0].description}</CardText>
        <CardText>Wind Speed: {data.wind.speed}</CardText>
       </> : null}
      </Card>
    </div>
  );
}

WeatherCard.propTypes = {
  data: PropTypes.object
};

export default WeatherCard;
