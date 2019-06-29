import React from 'react';

const Header = ({ course }) => (
  <h1>{course.name}</h1>
);

const Part = ({ part }) => (<p>{`${part.name} ${part.exercises}`}</p>)

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => <Part key={part.id} part={part}/>)}
    </>
  )
};

const Total = ({ course }) => (
  <p style={{fontWeight: 'bold'}}>
    Yhteensä&nbsp;
    {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} 
    &nbsp;tehtävää
  </p>
);

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
