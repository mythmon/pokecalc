import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import timing from './timing/';

export function makeStore() {
  const rootReducer = combineReducers({
    timing,
  });

  const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
  return store;
}
