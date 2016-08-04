import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page from './Page.js';
import PokemonTableContainer from '../ivcalc/components/PokemonTableContainers.js';
import './style/Main.css';

@connect(() => ({}))
export default class Main extends Component {
  render() {
    return (
      <Page>
        <PokemonTableContainer />
      </Page>
    );
  }
}
