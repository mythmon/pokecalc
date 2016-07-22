export const MERGE_BUILDS = 'timing/MERGE_BUILDS';
export const FOCUS_BUILD = 'timing/FOCUS_BUILD';

const initialState = {
  projects: {},
  currentProject: 'mozilla/normandy',
  focusedBuild: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case MERGE_BUILDS: {
      // shallow clone or new object
      const newBuilds = { ...state.projects[action.project] };
      for (const build of action.builds) {
        newBuilds[build.build_num] = build;
      }
      return { ...state, projects: { ...state.projects, [action.project]: newBuilds } };
    }

    case FOCUS_BUILD: {
      return { ...state, focusedBuild: action.buildNum };
    }

    default: {
      return state;
    }
  }
}

export function mergeBuilds(project, builds) {
  return {
    type: MERGE_BUILDS,
    project,
    builds,
  };
}

export function loadProject(project) {
  return (dispatch, getState) => {
    // load a page at a time until we get no builds we haven't seen already, or we hit the end.
    function loadPage(page, pageSize = 30) {
      fetch(`https://circleci.com/api/v1/project/${project}?limit=${pageSize}&offset=${pageSize * page}`)
      .then(res => res.json())
      .then(builds => {
        const oldBuilds = getState().timing.projects[project] || {};
        let anyNew = false;
        for (const build of builds) {
          if (!(build.build_num in oldBuilds)) {
            anyNew = true;
            break;
          }
        }

        dispatch(mergeBuilds(project, builds));

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

export function focusBuild(buildNum) {
  return {
    type: FOCUS_BUILD,
    buildNum,
  };
}
