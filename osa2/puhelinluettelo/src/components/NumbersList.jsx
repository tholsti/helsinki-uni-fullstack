import React from 'react';

const Person = ({ person, removePerson }) => (
  <li>
    {`${person.name} ${person.number}`}
    <button type={'button'} onClick={() => removePerson(person)}> Delete </button>
  </li>
);

const NumbersList = ({ filter, personsFiltered, persons, removePerson, setMessage }) => (
  <ul>
    {
      filter.length > 0 
        ? personsFiltered.map(person => <Person key={person.name} removePerson={removePerson} person={person} />)
        : persons.map(person => <Person key={person.name} removePerson={removePerson} person={person} />)
    }
  </ul>
);

export default NumbersList;
