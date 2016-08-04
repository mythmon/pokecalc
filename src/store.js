import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';

import ivcalc from './ivcalc/';

export function makeStore() {
  const rootReducer = combineReducers({
    ivcalc,
  });

  const store = createStore(
    rootReducer,
    {},
    compose(
      autoRehydrate(),
      applyMiddleware(thunk),
    ),
  );
  persistStore(store);
  return store;
}
