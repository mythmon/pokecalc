import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';

import { loadProject } from '../timing/';

@connect(state => {
  const { selectedUsername, selectedProject, projects } = state.timing;

  const ret = {
    username: selectedUsername,
    project: selectedProject,
    builds: projects[`${selectedUsername}/${selectedProject}`] || [],
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
      buildsEl = (
        <ul>
          {builds.map(build => <li key={build.build_num}>{build.subject}</li>)}
        </ul>
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
