import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page from './Page.js';
import BuildTimesContainer from '../timing/components/BuildTimesContainer.js';

@connect(() => ({}))
export default class Main extends Component {
  render() {
    return (
      <Page>
        <BuildTimesContainer />
      </Page>
    );
  }
}
