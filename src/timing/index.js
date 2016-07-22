export const ADD_BUILDS = 'timing/ADD_BUILDS';

const initialState = {
  selectedUsername: 'mozilla',
  selectedProject: 'normandy',
  projects: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BUILDS: {
      const key = `${action.username}/${action.project}`;
      const newBuilds = (state.projects[key] || []).concat(action.builds);
      newBuilds.sort((a, b) => a.build_num - b.build_num);
      return { ...state, projects: { ...state.projects, [key]: newBuilds } };
    }

    default: {
      return state;
    }
  }
}

export function loadProject(username, project) {
  return dispatch => {
    fetch(`https://circleci.com/api/v1/project/${username}/${project}`)
    .then(res => res.json())
    .then(builds => {
      dispatch({
        type: ADD_BUILDS,
        username,
        project,
        builds,
      });
    });
  };
}
