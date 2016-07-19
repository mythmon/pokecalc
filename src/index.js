import React, { Component, PropTypes as pt } from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
  static propTypes = {
    target: pt.string.isRequired,
  }

  componentWillMount() {
  }

  render() {
    const { target } = this.props;
    return <h1>Hello {target}!</h1>;
  }
}

const target = document.querySelector('#main');
ReactDOM.render(<Main target="World" />, target);
