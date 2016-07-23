import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { makeStore } from './store.js';
import Main from './components/Main.js';
import './polyfills.js';

const store = makeStore();

let target = document.querySelector('#main');
if (!target) {
  target = document.createElement('div');
  target.id = 'main';
  document.body.appendChild(target);
}
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  target,
);
