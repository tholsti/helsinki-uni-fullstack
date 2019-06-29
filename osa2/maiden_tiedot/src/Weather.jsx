import React from 'react';

const Weather = ({ weather }) => {
  return (
    <div>
      Maximum temperature today: {Number(weather.consolidated_weather[0].max_temp).toFixed(0)}
      <br />
      <img alt={'pic'} src={`https://www.metaweather.com/static/img/weather/png/64/${weather.consolidated_weather[0].weather_state_abbr}.png`} />
    </div>
  );
};

export default Weather;
