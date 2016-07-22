import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { makeStore } from './store.js';
import Main from './components/Main.js';
import './polyfills.js';

const store = makeStore();

const target = document.querySelector('#main');
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  target,
);
