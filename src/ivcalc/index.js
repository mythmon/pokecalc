export const CHANGE_PENDING = 'ivcalc/CHANGE_PENDING';
export const START_EDITING = 'ivcalc/START_EDITING';
export const COMMIT_PENDING = 'ivcalc/COMMIT_PENDING';

const initialState = {
  pokemonList: {
    1: {
      key: 1,
      name: 'Todd',
      species: 'Slowbro',
      cp: 1344,
      hp: 115,
      nextDust: 2500,
    },
  },
  editingPokemonKey: null,
  pendingPokemon: {
    next: {
      name: '',
      species: '',
      cp: '',
      hp: '',
      nextDust: '',
    },
  },
  nextKey: 2,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_PENDING: {
      if (!(action.key in state.pendingPokemon)) {
        throw new Error(
          'Changing pokemon that is not pending: ' +
          `${action.key}.${action.name} = ${action.value}`
        );
      } else {
        return {
          ...state,
          pendingPokemon: {
            ...state.pendingPokemon,
            [action.key]: {
              ...state.pendingPokemon[action.key],
              [action.name]: action.value,
            },
          },
        };
      }
    }

    case COMMIT_PENDING: {
      const nextPending = { ...state.pendingPokemon };
      if (action.key !== 'next') {
        nextPending[action.key] = undefined;
      } else {
        nextPending[action.key] = { ...initialState.pendingPokemon.next };
      }

      const pending = state.pendingPokemon[action.key];
      const newPokemon = {
        key: state.nextKey,
        name: pending.name,
        species: pending.species,
        cp: parseInt(pending.cp, 10),
        hp: parseInt(pending.hp, 10),
        nextDust: parseInt(pending.nextDust, 10),
      };

      return {
        ...state,
        pendingPokemon: nextPending,
        pokemonList: {
          ...state.pokemonList,
          [newPokemon.key]: newPokemon,
        },
        nextKey: state.nextKey + 1,
      };
    }

    default: {
      return state;
    }
  }
}

export function startEditing(key) {
  return {
    type: START_EDITING,
    key,
  };
}

export function changePending(key, name, value) {
  return {
    type: CHANGE_PENDING,
    key, name, value,
  };
}

export function commitPending(key) {
  return {
    type: COMMIT_PENDING,
    key,
  };
}
