import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import NumbersList from './components/NumbersList';
import { getPersons, addPerson, removePerson, updateNumber } from './services/person';

const Notification = ({ message }) => {
  const notificationStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'white',
    border: '3px solid green',
    borderRadius: '3px',
    padding: '10px',
    width: 'calc(100vw - 50px)',
  }
  
  if (message === null) {
    return null;
  }

  const { type, personName } = message;

  if (type === 'addSuccess') {
    return (
      <div style={notificationStyle}>
        Entry for {personName} has been added.
      </div>
    )
  }
  
  if (type === 'deleteSuccess') {
    return (
      <div style={notificationStyle}>
        Entry for {personName} has been removed.
      </div>
    )
  }

  if (type === 'updateSuccess') {
    return (
      <div style={notificationStyle}>
        Number for {personName} has been updated.
      </div>
    )
  }

  if (type === 'updateError') {
    return (
      <div style={{...notificationStyle, border: '3px solid red'}}>
        Could not find entry for {personName}.
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [personsFiltered, setPersonsFiltered] = useState([]);
  const [message, setMessage] = useState(null);

  React.useEffect(() => {
    getPersons()
      .then(response => setPersons(response.data));
  }, [])

  const personExists = () => {
    return persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
  };

  const addName = e => {
    e.preventDefault();
    
    if (personExists()) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        return;
      };

      const personToUpdate = personExists();

      updateNumber({
        ...personToUpdate,
        number: newNumber,
      })
        .then(() => getPersons())
        .then(response => setPersons(response.data))
        .then(() => setMessage({type: 'updateSuccess', personName: newName }))
        .then(() => setTimeout(() => { 
          setMessage(null) 
        }, 2000))
        .catch(err => {
          setMessage({ type: 'updateError', personName: newName })
        })
        .then(() => setTimeout(() => {
          setMessage(null)
        }, 2000));

      return;
    }
    
    addPerson({ name: newName, number: newNumber })
      .then(response => {
        setPersons([
          ...persons,
          response.data,
        ])
      })
      .then(() => setMessage({type: 'addSuccess', personName: newName }))
      .then(() => setTimeout(() => { 
        setMessage(null) 
      }, 2000));

    setNewName('');
    setNewNumber('');
  }

  const remove = person => {
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      return;
    }

    removePerson(person.id)
      .then(() => getPersons())
      .then(response => setPersons(response.data))
      .then(() => setMessage({type: 'deleteSuccess', personName: person.name }))
      .then(() => setTimeout(() => { 
        setMessage(null) 
      }, 2000));;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter</h3>
      <Filter 
        setPersonsFiltered={setPersonsFiltered}
        setFilter={setFilter}
        persons={persons}
        filter={filter}
      />
      <h3>Add new entry</h3>
      <Notification message={message} />
      <PersonForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addName={addName}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <NumbersList 
        filter={filter}
        personsFiltered={personsFiltered}
        persons={persons}
        removePerson={remove}
      />
    </div>
  )

}

export default App;
