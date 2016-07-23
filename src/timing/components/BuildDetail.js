import React, { Component, PropTypes as pt } from 'react';

export default class BuildDetail extends Component {
  static propTypes = {
    build: pt.object.isRequired,
  }

  render() {
    const { build } = this.props;

    return (
      <div>
        {build.subject}
      </div>
    );
  }
}
