import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => (
  <h1>{course.name}</h1>
);

const Part = ({ part }) => (<p>{part.name}</p>)

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => <Part part={part}/>)}
    </>
  )
};

const Total = ({ course }) => (
  <p>Yhteensä&nbsp;
  {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} 
  &nbsp;tehtävää</p>
);

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
