import React from 'react';

const Filter = props => {
  const handleFilterChange = e => {
    props.setFilter(e.target.value);
    const result = props.persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()));
    props.setPersonsFiltered(result);
  };

  return <input value={props.filter} onChange={handleFilterChange}/>;
};

export default Filter;
