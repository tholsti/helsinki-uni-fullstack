import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const rate = rating => {    
    store.dispatch({
      type: rating.toUpperCase()
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  }

  return (
    <div>
      <button onClick={() => rate('good')}>hyvä</button> 
      <button onClick={() => rate('ok')}>neutraali</button> 
      <button onClick={() => rate('bad')}>huono</button>
      <button onClick={reset}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
