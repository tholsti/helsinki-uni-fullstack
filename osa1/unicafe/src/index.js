import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Button = ({ rating, handleClick }) => <button onClick={() => handleClick(rating)}>{rating.label}</button>

const Stats = ({ responses }) => {
  const totalClicks = responses.reduce((prev, acc) => (prev + acc.clicks), 0);
  const totalValue = responses.reduce((prev, acc) => (prev + acc.rating.value * acc.clicks), 0);
  const positiveRatings = responses.filter((response) => (response.rating.value > 0)) 

  if (totalClicks === 0) {
    return (
      <>
        <h2>
          Statistiikka
        </h2>
        <p>
          Ei palautteita annettu
        </p>
      </>
    )
  }

  return (
    <>
      <h2>
        Statistiikka
      </h2>
      <table>
        {responses.map(response => <tr><td>{response.rating.label}</td><td>{response.clicks}</td></tr>)}
        <tr>
          <td>Yhteensä: </td>
          <td>{totalClicks}</td>
        </tr>
        <tr>
          <td>Keskiarvo: </td>
          <td>{totalValue / totalClicks}</td>
        </tr>
        <tr>
          <td>Positiivisia: </td>
          <td>{positiveRatings.reduce((prev, acc) => prev + acc.clicks, 0) / totalClicks * 100} %</td>
        </tr>
      </table>
    </>
  )
};

const App = () => {
  const ratings = [
    {
      label: 'Hyvä',
      value: 1,
      key: 'hyva'
    },
    {
      label: 'Neutraali',
      value: 0,
      key: 'neutraali'
    },
    {
      label: 'Huono',
      value: -1,
      key: 'huono'
    }
  ];

  const [responses, setResponses] = React.useState(ratings.map(rating => ({ rating, clicks: 0 })));

  const handleClick = (button) => {
    const existingResponse = responses.find(el => el.rating.key === button.key)
    if (existingResponse) {
      const index = responses.indexOf(existingResponse);
      
      setResponses([
        ...responses.slice(0, index),
        {
          rating: button,
          clicks: existingResponse.clicks + 1,
        },
        ...responses.slice(index + 1, responses.length),
      ]);
    }
    else {
      setResponses([
        ...responses,
        {
          rating: button,
          clicks: 1
        },
    ])}
  };
  
  return (
    <div>
      <h1>
        UniCafe
      </h1>
      <h2>
        Miltä maistui?
      </h2>
      {ratings.map(rating => (
        <Button 
          key={rating.key}
          rating={rating}
          handleClick={handleClick}/>)
        )
      }
      <Stats ratings={ratings} responses={responses}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
