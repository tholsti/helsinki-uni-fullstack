import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { anecdoteReducer } from './reducers/anecdoteReducer';
import { notificationReducer } from './reducers/notificationReducer';
import { filterReducer } from './reducers/filterReducer';

const reducers = combineReducers({ 
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
