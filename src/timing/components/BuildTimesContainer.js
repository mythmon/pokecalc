import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';

import { loadProject, focusBuild } from '../';
import BuildTimesGraph from './BuildTimesGraph.js';
import BuildDetail from './BuildDetail.js';

@connect(state => {
  const { currentProject, projects, focusedBuild } = state.timing;

  const builds = Object.values(projects[currentProject] || {})
    .sort((a, b) => a.build_num - b.build_num);

  return {
    focusedBuild: (projects[currentProject] || {})[focusedBuild] || null,
    currentProject,
    builds,
  };
})
export default class BuildTimesContainer extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    currentProject: pt.string.isRequired,
    builds: pt.array.isRequired,
    focusedBuild: pt.object,
  };

  componentWillMount() {
    const { dispatch, currentProject } = this.props;
    dispatch(loadProject(currentProject));
  }

  render() {
    const { dispatch, builds, focusedBuild } = this.props;

    return (
      <div>
        <BuildTimesGraph
          builds={builds}
          toFocusBuild={buildNum => dispatch(focusBuild(buildNum))}
        />
        {focusedBuild && <BuildDetail build={focusedBuild} />}
      </div>
    );
  }
}
