import React from 'react';
import axios from 'axios';
import Country from './Country';

function App() {
  const [countries, setCountries] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [filteredCountries, setFilteredCountries] = React.useState([]);

  const url = 'https://restcountries.eu/rest/v2/all';

  React.useEffect(() => {
    axios.get(url)
      .then(res => setCountries(res.data));
  }, []);

  const handleSearchInputChange = e => {
    setSearch(e.target.value);
    setFilteredCountries(countries.filter(country => 
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
  }
  
  const handleClick = country => {
    setSearch(country.name);
    setFilteredCountries([country]);
  }

  const showCountries = () => {
    if (filteredCountries.length === 0 && !!search) {
      return <div>No countries found</div>
    }

    if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]}/>
    }

    if (filteredCountries.length <= 10) {
      return (
        <>{filteredCountries.map(country => 
          <div key={country.name}>{country.name} 
            <button type={'button'} onClick={() => handleClick(country)}>Show</button>
          </div>)}
        </>
      );
    }

    return <div>Too many results</div>
  }

  return (
    <div>
      Maiden tiedot
      <input value={search} onChange={handleSearchInputChange} />
      {
        showCountries()
      }
    </div>
  );
}

export default App;
