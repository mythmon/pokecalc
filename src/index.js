import React, { Component, PropTypes as pt } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  names: ['Alice', 'Bob', 'Charlie'],
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

@connect(state => state)
class Main extends Component {
  static propTypes = {
    names: pt.array.isRequired,
  }

  componentWillMount() {
  }

  render() {
    const { names } = this.props;
    return (
      <div>
        {names.map(name => (
          <h1 key={name}>Hello {name}!</h1>
        ))}
      </div>
    );
  }
}


const target = document.querySelector('#main');
ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  target,
);
