import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page from './Page.js';
import TimingGraph from './TimingGraph.js';

@connect(() => ({}))
export default class Main extends Component {
  render() {
    return (
      <Page>
        <TimingGraph />
      </Page>
    );
  }
}
