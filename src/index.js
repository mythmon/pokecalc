import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { makeStore } from './store.js';
import Main from './components/Main.js';

// This is needed by Material UI, and will be removed as a dependency eventually.
injectTapEventPlugin();

const store = makeStore();

const target = document.querySelector('#main');
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  target,
);
