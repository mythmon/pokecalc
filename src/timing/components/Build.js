import React, { Component, PropTypes as pt } from 'react';

import { buildColor } from '../utils.js';

export default class Build extends Component {
  static propTypes = {
    index: pt.number.isRequired,
    build: pt.object.isRequired,
    indexScale: pt.func.isRequired,
    buildTimeScale: pt.func.isRequired,
    onMouseEnter: pt.func,
  }

  render() {
    const {
      index,
      build,
      indexScale,
      buildTimeScale,
      onMouseEnter,
    } = this.props;

    return (
      <rect
        key={index}
        x={indexScale(index)}
        y={buildTimeScale.range()[1] - buildTimeScale(build.build_time_millis)}
        width={indexScale(1)}
        height={buildTimeScale(build.build_time_millis)}
        fill={buildColor(build.outcome)}
        onMouseEnter={onMouseEnter}
      />
    );
  }
}
