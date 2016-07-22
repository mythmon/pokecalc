import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';

import { loadProject } from '../';
import Build from './Build.js';

@connect(state => {
  const { selectedUsername, selectedProject, projects } = state.timing;
  const key = `${selectedUsername}/${selectedProject}`;
  const builds = Object.values(projects[key] || {}).sort((a, b) => a.build_num - b.build_num);

  const ret = {
    username: selectedUsername,
    project: selectedProject,
    builds,
  };
  return ret;
})
export default class TimingGraph extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    username: pt.string.isRequired,
    project: pt.string.isRequired,
    builds: pt.array.isRequired,
  };

  componentWillMount() {
    const { dispatch, username, project } = this.props;
    dispatch(loadProject(username, project));
  }

  render() {
    const { username, project, builds } = this.props;

    if (username === null || project === null) {
      return null;
    }

    let buildsEl;

    if (builds && builds.length > 0) {
      let maxBuildTime = -Infinity;

      for (const build of builds) {
        maxBuildTime = Math.max(build.build_time_millis, maxBuildTime);
      }

      buildsEl = (
        <svg width="1500px" height="300px">
          {builds.map((build, index) => (
            <Build key={build.build_num} build={build} index={index} maxBuildTime={maxBuildTime} />
          ))}
        </svg>
      );
    } else {
      buildsEl = <span>No builds found</span>;
    }

    return (
      <div>
        <h2>{username}/{project}</h2>
        {buildsEl}
      </div>
    );
  }
}
