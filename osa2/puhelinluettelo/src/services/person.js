import axios from 'axios';

const url = 'http://localhost:3001/persons';

const getPersons = () => axios.get(url);

const addPerson = person => axios.post(url, person);

const removePerson = personId => axios.delete(`${url}/${personId}`);

const updateNumber = person => console.log(person) || axios.put(`${url}/${person.id}`, person);

export {
  getPersons,
  addPerson,
  removePerson,
  updateNumber,
}
