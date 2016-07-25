import React, { Component, PropTypes as pt } from 'react';
import { scaleLinear } from 'd3-scale';

import Build from './Build.js';

export default class BuildTimesGraph extends Component {
  static propTypes = {
    label: pt.string.isRequired,
    builds: pt.array.isRequired,
    toFocusBuild: pt.func,
  }

  constructor(props) {
    super(props);
    this.buildTimeScale = scaleLinear();
    this.indexScale = scaleLinear();
  }

  render() {
    const { builds, label, toFocusBuild = () => {} } = this.props;

    if (!builds || builds.length === 0) {
      return <span>No builds found</span>;
    }

    const graphWidth = document.body.clientWidth * 0.99;
    const graphHeight = graphWidth * 0.15;
    const maxBuildTime = builds.map(b => b.build_time_millis).reduce((a, b) => (a > b ? a : b));
    this.buildTimeScale
      .domain([0, maxBuildTime])
      .range([0, graphHeight]);
    this.indexScale
      .domain([0, builds.length])
      .range([0, graphWidth]);

    return (
      <div>
        <h2>{label}</h2>
        <svg width={graphWidth} height={graphHeight}>
          {builds.map((build, index) => (
            <Build
              key={index}
              index={index}
              build={build}
              indexScale={this.indexScale}
              buildTimeScale={this.buildTimeScale}
              onMouseEnter={() => toFocusBuild(build.build_num)}
            />
          ))}
        </svg>
      </div>
    );
  }
}
