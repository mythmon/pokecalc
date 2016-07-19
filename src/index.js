import React, { Component, PropTypes as pt } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initialState = {
  names: ['Alice', 'Bob', 'Charlie'],
  input: {
    name: '',
  },
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'NAMES_ADD_ONE': {
      return { ...state, names: state.names.concat([action.name]) };
    }
    case 'INPUT_SET': {
      return { ...state, input: { ...state.input, [action.name]: action.value } };
    }
    default: {
      return state;
    }
  }
}

function addName(name) {
  return {
    type: 'NAMES_ADD_ONE',
    name,
  };
}

function setInput(name, value) {
  return {
    type: 'INPUT_SET',
    name,
    value,
  };
}

const store = createStore(reducer);

@connect(state => state)
class Main extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    names: pt.array.isRequired,
    input: pt.object.isRequired,
  }

  handleInput({ target: { name, value } }) {
    const { dispatch } = this.props;
    dispatch(setInput(name, value));
  }

  handleAddName() {
    const { dispatch, input: { name } } = this.props;
    dispatch(addName(name));
    dispatch(setInput('name', ''));
  }

  render() {
    const { names, input: { name } } = this.props;
    return (
      <div>
        <ul>
          {names.map(n => (
            <li key={n}>Hello {n}!</li>
          ))}
        </ul>
        <input type="text" name="name" value={name} onChange={::this.handleInput} />
        <button onClick={::this.handleAddName}>Add</button>
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
