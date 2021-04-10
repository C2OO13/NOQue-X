import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import ApiMiddleware from './middlewares/apiMiddleware';
import rootReducer from './rootReducer';
import history from '../utils/history';

export { history }; // imported from here in App.js

// all middleware in a array
const middlewares = [thunkMiddleware, ApiMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const initialState = {};

// for using redux dev tools in chrome extension
const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares))
);

// store.subscribe(() => console.log(store.getState()));

export default store;
