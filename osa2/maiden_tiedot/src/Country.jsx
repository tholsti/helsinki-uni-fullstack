import React from 'react';
import axios from 'axios';
import Weather from './Weather';

const Country = ({ country }) => {
  const [weather, setWeather] = React.useState(null);

  const getWeather = city => {
    const locationQuery = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=';
    const weatherQuery = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';

    axios.get(`${locationQuery}${city}`)
      .then(res => axios.get(`${weatherQuery}${res.data[0].woeid}`))
      .then(res => setWeather(res.data));
  };

  React.useEffect(() => {
    getWeather(country.capital);
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt={'flag'} width={'100px'}/>
      <h2>Weather in {country.capital} today</h2>
      {weather ? <Weather weather={weather} /> : 'Fetching weather information...'}
    </div>
  );
};

export default Country;
