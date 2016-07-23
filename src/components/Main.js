import React, { Component } from 'react';
import { connect } from 'react-redux';

import Page from './Page.js';
import BuildTimesContainer from '../timing/components/BuildTimesContainer.js';
import ProjectSelecterContainer from '../timing/components/ProjectSelecterContainer.js';

@connect(() => ({}))
export default class Main extends Component {
  render() {
    return (
      <Page>
        <ProjectSelecterContainer />
        <BuildTimesContainer />
      </Page>
    );
  }
}
