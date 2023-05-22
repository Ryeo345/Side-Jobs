import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import tasks from './task';
import users from './users';
import reviews from './reviews';

const reducer = combineReducers({
  auth,
  tasks,
  users,
  reviews
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './task';
export * from './users';
export * from './reviews';
