import React, { Component, PropTypes as pt } from 'react';

export default class Build extends Component {
  static propTypes = {
    build: pt.object.isRequired,
    index: pt.number.isRequired,
    maxBuildTime: pt.number.isRequired,
  }

  buildColor(outcome) {
    switch (outcome) {
      case 'success': return '#00ff00';
      case 'failed': return '#ff0000';
      case 'timedout': return '#aa0000';
      case 'no_tests': return '#aa8888';
      case 'infrastructure_fail': return '#aa8888';
      case 'canceled': return '#aa8888';

      default: {
        throw new Error(`Unexpected build outcome "${outcome}"`);
      }
    }
  }

  render() {
    const { build, index, maxBuildTime } = this.props;

    const maxHeight = 300;
    const width = 2;
    const margin = 0;
    const height = build.build_time_millis / maxBuildTime * maxHeight;
    const x = index * (width + margin);
    const y = maxHeight - height;
    const fill = this.buildColor(build.outcome);

    return (
      <rect x={x} y={y} width={width} height={height} fill={fill} />
    );
  }
}
