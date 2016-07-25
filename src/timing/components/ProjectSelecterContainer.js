import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import { TextField } from 'material-ui';

import { setPendingInput } from '../';

@connect(state => {
  const { pendingInput: { user, repo } } = state.timing;

  return {
    user,
    repo,
  };
})
export default class BuildTimesContainer extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    user: pt.string.isRequired,
    repo: pt.string.isRequired,
  };

  render() {
    const { dispatch, user, repo } = this.props;

    return (
      <div>
        <TextField
          hintText="Username"
          value={user}
          onChange={ev => dispatch(setPendingInput('user', ev.target.value))}
        />
        <big>{' / '}</big>
        <TextField
          hintText="Repository"
          value={repo}
          onChange={ev => dispatch(setPendingInput('repo', ev.target.value))}
        />
      </div>
    );
  }
}
