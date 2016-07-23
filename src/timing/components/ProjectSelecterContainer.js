import React, { Component, PropTypes as pt } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { setPendingInput } from '../';

@connect(state => {
  const { currentProject, pendingInput: { user, repo } } = state.timing;

  const [currentUser, currentRepo] = currentProject.split('/');

  return {
    pendingUser: user,
    pendingRepo: repo,
    currentUser,
    currentRepo,
  };
})
export default class BuildTimesContainer extends Component {
  static propTypes = {
    dispatch: pt.func.isRequired,
    currentUser: pt.string.isRequired,
    currentRepo: pt.string.isRequired,
    pendingUser: pt.string.isRequired,
    pendingRepo: pt.string.isRequired,
  };

  render() {
    const { dispatch, currentUser, currentRepo, pendingUser, pendingRepo } = this.props;

    return (
      <div>
        <TextField
          hintText={currentUser}
          value={pendingUser}
          onChange={ev => dispatch(setPendingInput('user', ev.target.value))}
        />
        <big>{' / '}</big>
        <TextField
          hintText={currentRepo}
          value={pendingRepo}
          onChange={ev => dispatch(setPendingInput('repo', ev.target.value))}
        />
      </div>
    );
  }
}
