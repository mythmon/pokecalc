export const MERGE_BUILDS = 'timing/MERGE_BUILDS';

const initialState = {
  selectedUsername: 'mozilla',
  selectedProject: 'normandy',
  projects: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MERGE_BUILDS: {
      const key = `${action.username}/${action.project}`;
      // shallow clone or new object
      const newBuilds = (key in state.projects) ? { ...state.projects[key] } : {};
      for (const build of action.builds) {
        newBuilds[build.build_num] = build;
      }
      return { ...state, projects: { ...state.projects, [key]: newBuilds } };
    }

    default: {
      return state;
    }
  }
}

export function mergeBuilds(username, project, builds) {
  return {
    type: MERGE_BUILDS,
    username,
    project,
    builds,
  };
}

export function loadProject(username, project) {
  return (dispatch, getState) => {
    const key = `${username}/${project}`;

    // load a page at a time until we get no builds we haven't seen already, or we hit the end.
    function loadPage(page, pageSize = 30) {
      fetch(`https://circleci.com/api/v1/project/${key}?limit=${pageSize}&offset=${pageSize * page}`)
      .then(res => res.json())
      .then(builds => {
        const oldBuilds = getState().timing.projects[key] || {};
        let anyNew = false;
        for (const build of builds) {
          if (!(build.build_num in oldBuilds)) {
            anyNew = true;
            break;
          }
        }

        dispatch(mergeBuilds(username, project, builds));

        if (anyNew && builds.length >= pageSize) {
          // next page
          return loadPage(page + 1, pageSize);
        } else {
          return Promise.resolve();
        }
      });
    }

    return loadPage(0);
  };
}
